import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  //console.log('=== middleware > path',  request.nextUrl.pathname)
  const { pathname, search, origin, basePath } = request.nextUrl
  const publicPaths = ["/_next", "/favicon.ico"]

  if (request.nextUrl.pathname === '/api/init-bot' || request.nextUrl.pathname === '/' || publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }
  const sessionID = cookies().get('tg_session')
  //console.log('=== middleware > tg_session',  )
  
  if (!sessionID) {
    return NextResponse.redirect(new URL(`${basePath}`, origin))
  }
  return NextResponse.next()
}