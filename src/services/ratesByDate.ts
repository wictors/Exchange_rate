import { fetchHistoricalRates } from '../externalApi/externalApiService';
import { findRateByDate, createRateByDate } from '../db/dbHandler';

export async function getRatesByDate(
  code: string,
  year: number,
  month: number,
  day: number,
) {
  try {
    const rateFromDB = await findRateByDate(code, year, month, day);
    if (rateFromDB) {
      return rateFromDB;
    }

    const externalRate = await fetchHistoricalRates(code, year, month, day);

    if (!externalRate) {
      throw new Error(
        'External API returned no data when fetching rates by date',
      );
    }

    const createdRate = await createRateByDate(
      code,
      year,
      month,
      day,
      externalRate.conversion_rates,
    );

    return createdRate;
  } catch (error) {
    console.error('Error in ratesByDate service: ', error);
    throw error;
  }
}
