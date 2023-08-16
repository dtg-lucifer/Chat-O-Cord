import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, firstName, lastName, confPassword, password } = await req.json();
  console.log({ email, firstName, lastName, confPassword, password });

  const { searchParams } = req.nextUrl;
  const redirect = searchParams.get("redirect") || "/";

  const token = req.headers.get("Token");

  if ((token === "secret-token")) {
    return new Response("Successfully Reggistered", {
      status: 200,
      headers: {
        Location: redirect,
        "Content-Type": "application/json",
        "Set-Cookie": `token=${email}; path=/; HttpOnly; Secure; SameSite=Strict;`,
      },
    });
  } else {
    return new Response("Error", {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
