import { Prisma, Func } from ".prisma/client"
import prisma from "../prisma"

export async function createFunc(data: Prisma.FuncCreateInput): Promise<Func> {
  return prisma.func.create({ data })
}
