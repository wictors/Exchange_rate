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

  return router;
};
