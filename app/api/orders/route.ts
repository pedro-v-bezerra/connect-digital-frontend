import { NextResponse } from 'next/server'

const NEST_API_URL = process.env.NEST_API_URL!

export async function POST(request: Request) {
  const body = await request.json()

  const res = await fetch(`${NEST_API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  return NextResponse.json(data, {
    status: res.status,
  })
}
