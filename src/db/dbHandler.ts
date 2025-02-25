import { getPrismaInstance } from '../utils/prismaClient';

const prisma = getPrismaInstance();

export async function findRateByDate(code: string, date: Date) {
  try {
    const rateFromDB = await prisma.rates.findFirst({
      where: { base_code: code, date: date },
    });
    return rateFromDB;
  } catch (error) {
    console.error('Error during getting rates by date from DB', error);
    throw error;
  }
}

export async function createRateByDate(
  code: string,
  date: Date,
  conversion_rates: Record<string, number>,
) {
  try {
    const createRate = await prisma.rates.create({
      data: {
        base_code: code,
        date: date,
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
    const savedData = await prisma.codes.findFirst({
      //Hardcoded, prepisuje sa iba 1 zaznam zatial. Buduce pouzitie moze ukladat historicke zmeny a vyberat podla last updated timestamp
      where: { id: 1 },
    });
    return savedData;
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
