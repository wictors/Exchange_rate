import axios from 'axios';
import crypto from 'crypto';

const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const BASE_URL = process.env.EXTERNAL_API_BASE_URL;

export async function fetchCurrentRates(code: string): Promise<any> {
  try {
    const url = `${BASE_URL}/${API_KEY}/latest/${code}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error during get current rate from external api',
      error.response.data,
    );
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

export async function fetchAvailableCodes() {
  try {
    const url = `${BASE_URL}/${API_KEY}/codes`;
    const response = await axios.get(url);

    if (response) {
      const supportedCodes = response.data.supported_codes;
      const hash = crypto
        .createHash('md5')
        .update(JSON.stringify(supportedCodes))
        .digest('hex');
      return { supportedCodes, hash };
    } else {
      throw new Error('No response from external API');
    }
  } catch (error) {
    console.error('Error during get available codes from external api', error);
    throw error;
  }
}
