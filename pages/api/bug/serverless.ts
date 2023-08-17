import { NextApiRequest, NextApiResponse } from 'next'

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log('Serverless function called.')
  const { why_do } = req.body
  console.log('why_do', why_do)
  res.status(200).json({ message: 'Success' })
}

