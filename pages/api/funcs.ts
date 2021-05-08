import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes"
import { Func } from "@prisma/client";
import { createFunc, getAllFuncs } from "../../src/services/func";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Func | Func[] | null>) {
  if (req.method == "POST") {
    const func = await createFunc(req.body)
    res.status(StatusCodes.OK).json(func)
  } else if (req.method == "GET") {
    const funcs = await getAllFuncs(req.body)
    res.status(StatusCodes.OK).json(funcs)
  }
  res.status(StatusCodes.NOT_FOUND).send(null)
}
