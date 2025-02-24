import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

export function getPrismaInstance() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}
