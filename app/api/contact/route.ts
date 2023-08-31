import { NextResponse } from 'next/server';

// Notice the function definition:
export async function POST(req: Request) {
  // ...
  const requestBody = await new Response(req.body).json();

  console.log(requestBody);
  return NextResponse.json({ message: 'Hello World' });
}
