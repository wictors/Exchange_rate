import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../prismaClient';
import {
  fetchCurrentRates,
  fetchHistoricalRates,
  fetchAvailableCodes,
} from '../external/externalApiService';

const router = Router();

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default () => {
  router.get(
    '/current',
    asyncHandler(async (req: Request, res: Response) => {
      const code = req.query.code as string;
      if (!code) {
        res.status(400).json({ error: 'Parameter "code" is required.' });
        return;
      }

      try {
        const data = await fetchCurrentRates(code);

        res.json(data);
        return;
      } catch (error) {
        console.error('Error in GET /current:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
    }),
  );

  router.get(
    '/historical',
    asyncHandler(async (req: Request, res: Response) => {
      const code = req.query.code as string;
      const year = req.query.year ? Number(req.query.year) : null;
      const month = req.query.month ? Number(req.query.month) : null;
      const day = req.query.day ? Number(req.query.day) : null;

      if (!code || !year || !month || !day) {
        res
          .status(400)
          .json({ error: 'Parameters code, year, month and day are required' });
        return;
      }

      if (isNaN(year) || isNaN(month) || isNaN(day)) {
        res
          .status(400)
          .json({ error: 'Parameters year, month and day must be numbers' });
        return;
      }

      try {
        const record = await prisma.history_Rates.findFirst({
          where: { base_code: code, year: year, month: month, day: day },
        });

        if (record) {
          res.json(record);
          return;
        }

        const externalRecord = await fetchHistoricalRates(
          code,
          year,
          month,
          day,
        );

        if (!externalRecord) {
          res
            .status(404)
            .json({ error: 'Something went wrong in external API' });
          return;
        }

        const finalRecord = await prisma.history_Rates.create({
          data: {
            base_code: code,
            year: Number(externalRecord.year),
            month: Number(externalRecord.month),
            day: Number(externalRecord.day),
            conversion_rates: externalRecord.conversion_rates,
          },
        });

        res.json(finalRecord);
        return;
      } catch (error) {
        console.error('Error in GET /historical:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
    }),
  );

  router.get('/update-codes', async (req: Request, res: Response) => {
    try {
      const { codes, hash } = await fetchAvailableCodes();

      const actualCodes = await prisma.codes.findFirst({
        where: { id: 1 },
      });

      if (actualCodes && actualCodes.hash === hash) {
        res.json({
          codes: actualCodes,
          message: 'No changes. Codes are up to date',
        });
        return;
      } else {
        const newCodes = await prisma.codes.upsert({
          where: { id: 1 },
          update: { codes, hash },
          create: { codes, hash },
        });

        res.json({ codes: newCodes, message: 'Codes updated' });
        return;
      }
    } catch (error) {
      console.error('Error in GET /update-codes:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
  });

  return router;
};
