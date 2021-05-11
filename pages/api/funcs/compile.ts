import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes"
import { compileFunc, CompileFuncRequest, CompileFuncResponse } from "../../../src/services/func";
import LRU from "lru-cache"

const cache = new LRU<string, CompileFuncResponse>()

export default async function handler(req: NextApiRequest, res: NextApiResponse<CompileFuncResponse>) {
  if (req.method == "POST") {
    const body = req.body as CompileFuncRequest
    const cachedResult = cache.get(body.contents);
    if (cachedResult) {
      res.status(StatusCodes.OK).json(cachedResult)
    } else {
      const result = await compileFunc(req.body)
      cache.set(body.contents, result)
      res.status(StatusCodes.OK).json(result)
    }
  }
  res.status(StatusCodes.NOT_FOUND).send(null)
}
