import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  // log: ['query'] //mostrar as query dentro dos logs
})
