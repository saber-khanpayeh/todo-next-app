import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req){
    const token=await getToken({req,secret:process.env.NEXTAUTH_SECRET});
    // console.log(token);
    if (!token) {
        return NextResponse.redirect(new URL("/signin", req.url));
      }
    return NextResponse.next();
}

export const config = {
    matcher: ['/','/add-todo/:path*', '/profile/:path*'], 
  };