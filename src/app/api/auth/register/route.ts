import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, firstName, lastName, confPassword, password } = await req.json();
  console.log({ email, firstName, lastName, confPassword, password });
  return NextResponse.json({ email, firstName, lastName });
}
