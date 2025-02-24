import { Router, Request, Response, NextFunction } from 'express';
import { getAvailableCodes } from '../services/availableCodes';
import { getCurrentRate } from '../services/currentRates';
import { getRatesByDate } from '../services/ratesByDate';

interface ExchangeRateResponse {
  base_code: string;
  year: number;
  month: number;
  day: number;
  conversion_rates: Record<string, number>;
}

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
        const data = await getCurrentRate(code);
        const response = {
          base_code: data.base_code,
          conversion_rate: data.conversion_rates,
        };
        res.json(response);
        return;
      } catch (error: any) {
        console.error('Error in GET /current:', error.response.data);
        res.status(500).json(error.response.data);
        return;
      }
    }),
  );

  router.get(
    '/historical',
    asyncHandler(async (req: Request, res: Response) => {
      const code = req.query.code as string;
      const date = req.query.date as string;

      if (!code || !date) {
        res
          .status(400)
          .json({ error: 'Parameters code and date are required' });
        return;
      }

      const [year, month, day] = date.split('-').map(Number);

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
      } catch (error: any) {
        console.error('Error in GET /historical:', error.response.data);
        res.status(500).json(error.response.data);
        return;
      }
    }),
  );

  router.get('/update-codes', async (req: Request, res: Response) => {
    try {
      const response = await getAvailableCodes();
      res.json({ message: response.message, codes: response.data.codes });
      return;
    } catch (error: any) {
      console.error('Error in GET /update-codes:', error.response.data);
      res.status(500).json(error.response.data);
      return;
    }
  });

  router.get('/extremes', async (req: Request, res: Response) => {
    const base_code = req.query.base_code as string;
    const target_code = req.query.target_code as string;
    const from = req.query.from as string;
    const to = req.query.to as string;
    if (!base_code || !target_code || !from || !to) {
      res.status(400).json({
        error: 'Parameters base_code, target_code, from and to are required',
      });
      return;
    }

    try {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      const allRates: ExchangeRateResponse[] = [];

      while (fromDate <= toDate) {
        const rateByDate: ExchangeRateResponse = (await getRatesByDate(
          base_code,
          fromDate.getFullYear(),
          fromDate.getMonth() + 1, // zero-based
          fromDate.getDate(),
        )) as ExchangeRateResponse;
        allRates.push(rateByDate);
        fromDate.setDate(fromDate.getDate() + 1);
      }

      const extremes = allRates.reduce(
        (acc, rate) => {
          if (rate.conversion_rates[target_code] < acc.min) {
            acc.min = rate.conversion_rates[target_code];
          }
          if (rate.conversion_rates[target_code] > acc.max) {
            acc.max = rate.conversion_rates[target_code];
          }
          return acc;
        },
        { min: Infinity, max: -Infinity },
      );

      res.json(extremes);
      return;
    } catch (error: any) {
      console.error('Error in GET /update-codes:', error.response.data);
      res.status(500).json(error.response.data);
      return;
    }
  });

  return router;
};
