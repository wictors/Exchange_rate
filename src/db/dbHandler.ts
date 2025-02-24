import { getPrismaInstance } from '../utils/prismaClient';

const prisma = getPrismaInstance();

export async function findRateByDate(
  code: string,
  year: number,
  month: number,
  day: number,
) {
  try {
    const rateFromDB = await prisma.history_Rates.findFirst({
      where: { base_code: code, year: year, month: month, day: day },
    });
    return rateFromDB;
  } catch (error) {
    console.error('Error during getting rates by date from DB', error);
    throw error;
  }
}

export async function createRateByDate(
  code: string,
  year: number,
  month: number,
  day: number,
  conversion_rates: Record<string, number>,
) {
  try {
    const createRate = await prisma.history_Rates.create({
      data: {
        base_code: code,
        year: year,
        month: month,
        day: day,
        conversion_rates: conversion_rates,
      },
    });
    return createRate;
  } catch (error) {
    console.error('Error during saving rates by date to DB', error);
    throw error;
  }
}

export async function findAvailableCodes() {
  try {
    const actualCodes = await prisma.codes.findFirst({
      //Hardcoded, prepisuje sa iba 1 zaznam zatial. Buduce pouzitie moze ukladat historicke zmeny a vyberat podla last updated timestamp
      where: { id: 1 },
    });
    return actualCodes;
  } catch (error) {
    console.error('Error during getting available codes from DB', error);
    throw error;
  }
}

export async function createAvailableCodes(codes: string[], hash: string) {
  try {
    const newCodes = await prisma.codes.upsert({
      where: { id: 1 },
      update: { codes, hash },
      create: { codes, hash },
    });
    return newCodes;
  } catch (error) {
    console.error('Error during saving new codes to DB', error);
    throw error;
  }
}
