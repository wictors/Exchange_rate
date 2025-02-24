import { fetchAvailableCodes } from '../externalApi/externalApiService';
import { findAvailableCodes, createAvailableCodes } from '../db/dbHandler';

export async function getAvailableCodes() {
  try {
    const { codes, hash } = await fetchAvailableCodes();
    const actualCodes = await findAvailableCodes();

    if (actualCodes && actualCodes.hash === hash) {
      return {
        codes: actualCodes,
        message: 'No changes. Codes are up to date',
      };
    } else {
      const newCodes = await createAvailableCodes(codes, hash);
      return { codes: newCodes, message: 'Codes updated' };
    }
  } catch (error) {
    console.error('Error in updateCode service: ', error);
    throw error;
  }
}
