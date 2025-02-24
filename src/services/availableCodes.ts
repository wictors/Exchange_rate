import { fetchAvailableCodes } from '../externalApi/externalApiService';
import { findAvailableCodes, createAvailableCodes } from '../db/dbHandler';

export async function getAvailableCodes() {
  try {
    const { supportedCodes, hash } = await fetchAvailableCodes();
    const savedData = await findAvailableCodes();

    if (savedData && savedData.hash === hash) {
      return {
        data: savedData,
        message: 'No changes. Codes are up to date',
      };
    } else {
      const newData = await createAvailableCodes(supportedCodes, hash);
      return { data: newData, message: 'Codes updated' };
    }
  } catch (error) {
    console.error('Error in updateCode service: ', error);
    throw error;
  }
}
