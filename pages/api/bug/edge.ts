import cors from '@/utils/cors'

export const runtime = 'edge'

export default async function POST(req: Request): Promise<Response> {
  const isFnCall = req.method === 'OPTIONS'
  console.log('req method', req.method)
  if (!isFnCall && req.method != 'POST') {
    console.log('Not allowed ze method.')
    return cors(
      req,
      new Response('Method not allowed', {
        status: 400,
        headers: {
          Allow: 'POST',
        },
      }),
    )
  }

  const domain = process.env.NEXT_PUBLIC_BASE_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL 

  console.log('calling serverless route')
  const response = await fetch(`${domain}/api/bug/serverless`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ why_do: 'you hate me' }),
  })

  if (!response.ok) {
    console.log('response was not okay, call help')
    return cors(
      req,
      new Response('Oh noz', {
        status: 500,
        statusText: 'Oh noz',
      }),
    )
  }

  const data = await response.json()
  console.log('data is', data)

  return cors(
    req,
    new Response(data, {
      status: 200,
    }),
  )
}
