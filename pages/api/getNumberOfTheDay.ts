import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  numberOfTheDay?: number
  message?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const dateString = req.query.ds

  try {
    if (!dateString) {
      throw new Error('Bad input')
    }

    const base = dateString.toString()
    // If you really want to cheat you can just solve this equation to get the answer
    const todaysNumber = Math.round(Math.pow((Number(base) * 9) / 5, 1.1) * 3)

    res.status(200).json({ numberOfTheDay: todaysNumber })
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        message: err.toString()
      })
    } else {
      res.status(500).json({
        message: 'Unknown server error'
      })
    }
  }
}
