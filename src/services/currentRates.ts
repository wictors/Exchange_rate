import { fetchCurrentRates } from '../externalApi/externalApiService';

export async function getCurrentRate(code: string) {
  try {
    const current = await fetchCurrentRates(code);
    return current;
  } catch (error) {
    console.error('Error in currentRate service: ', error);
    throw error;
  }
}
