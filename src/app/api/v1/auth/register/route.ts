import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, firstName, lastName, confPassword, password } = await req.json();
  console.log({ email, firstName, lastName, confPassword, password });

  const { searchParams } = req.nextUrl;
  const redirect = searchParams.get("redirect") || "/";

  const respone = new NextResponse("Successs", {
    status: 302,
    headers: {
      Location: redirect,
      'Content-Type': 'application/json',
      'Set-Cookie': `token=${email}; path=${redirect}; HttpOnly; Secure; SameSite=Strict;`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    statusText: "Successful Register"
  });
  
  return respone
}
