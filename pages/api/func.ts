// import type { NextApiRequest, NextApiResponse } from 'next'

import { NextApiRequest } from "next";

// type Data = {
//   name: string
// }

// export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
//   res.status(200).json({ name: 'John Doe' })
// }

export default function handler(req: NextApiRequest, res) {
  res.status(200).json({ name: 'John Doe' })
}
