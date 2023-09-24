import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, firstName, lastName, confPassword, password } = await req.json();
  console.log({ email, firstName, lastName, confPassword, password });

  const { searchParams } = req.nextUrl;
  const redirect = searchParams.get("redirect") || "/";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append(
    "Set-Cookie",
    `token=${email}; path=${redirect}; HttpOnly; Secure; SameSite=Strict;`
  );

  return new Response("Successfully Reggistered", {
    status: 200,
    headers,
    statusText: "Successful Register",
  });
}
