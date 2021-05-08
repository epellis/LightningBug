import { Prisma, Func } from ".prisma/client"
import prisma from "../prisma"

export async function createFunc(data: Prisma.FuncCreateInput): Promise<Func> {
  return prisma.func.create({ data })
}

export async function getAllFuncs(params: Partial<Prisma.FuncFindManyArgs>): Promise<Func[]> {
  const { skip, take, cursor, where, orderBy } = params;
  return prisma.func.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
  });
}
