import { NextResponse } from 'next/server'

const NEST_API_URL = process.env.NEST_API_URL!

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params

  const res = await fetch(`${NEST_API_URL}/orders/${id}/status`)
  const data = await res.json()

  return NextResponse.json(data, { status: res.status })
}
