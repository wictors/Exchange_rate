import { Router, Request, Response, NextFunction } from 'express';
import { getAvailableCodes } from '../services/availableCodes';
import { getCurrentRate } from '../services/currentRates';
import { getRatesByDate } from '../services/ratesByDate';

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
        const response = await getCurrentRate(code);
        res.json(response);
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
        const rateByDate = await getRatesByDate(code, year, month, day);
        res.json(rateByDate);
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
      const response = await getAvailableCodes();
      res.json(response);
      return;
    } catch (error) {
      console.error('Error in GET /update-codes:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
  });

  return router;
};
