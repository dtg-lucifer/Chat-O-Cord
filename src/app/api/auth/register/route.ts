import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, firstName, lastName, confPassword, password } = await req.json();
  console.log({ email, firstName, lastName, confPassword, password });

  const { searchParams } = req.nextUrl;
  const redirect = searchParams.get("redirect") || "/";

  if (true == true) {
    return new Response("Successfully Reggistered", {
      status: 200,
      headers: {
        Location: redirect,
        "Content-Type": "application/json",
        "Set-Cookie": `token=${email}; path=${redirect}; HttpOnly; Secure; SameSite=Strict;`,
      },
      statusText: "Successful Register",
    });
  }
}
