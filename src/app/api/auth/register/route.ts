import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, firstName, lastName, confPassword, password } = await req.json();
  console.log({ email, firstName, lastName, confPassword, password });

  const { searchParams } = req.nextUrl;
  const redirect = searchParams.get("redirect") || "/";

  const token = req.headers.get("Token");
  const { AUTH_SECRET } = process.env

  if ((token === AUTH_SECRET)) {
    return new Response("Successfully Reggistered", {
      status: 200,
      headers: {
        Location: redirect,
        "Content-Type": "application/json",
        "Set-Cookie": `token=${email}; path=/; HttpOnly; Secure; SameSite=Strict;`,
      },
      statusText: "Successful Register"
    });
  } else {
    return new Response("Error", {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
      statusText: "Cookie doesnt match!! Try Again."
    });
  }
}