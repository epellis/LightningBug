import { Prisma, Func } from ".prisma/client"
import prisma from "../prisma"
import { CompileResult, compileSource } from "../runtime/compiler";

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

export type CompileFuncRequest = {
  contents: string
}

export type CompileFuncResponse = Omit<CompileResult, "binary">

export async function compileFunc(params: CompileFuncRequest): Promise<CompileFuncResponse> {
  const { binary, ...response } = compileSource(params.contents);
  return response;
}
