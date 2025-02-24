import axios from 'axios';

const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const BASE_URL =
  process.env.EXTERNAL_API_BASE_URL;

export async function fetchCurrentRates(code: string): Promise<any> {
  try {
    const url = `${BASE_URL}/${API_KEY}/latest/${code}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error during get current rate from external api', error);
    throw error;
  }
}

export async function fetchHistoricalRates(
  code: string,
  year: number,
  month: number,
  day: number,
): Promise<any> {
  try {
    
    const url = `${BASE_URL}/${API_KEY}/history/${code}/${year}/${month}/${day}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error during get historical rate from external api', error);
    throw error;
  }
}
