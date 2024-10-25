// // src/app/middleware.js

import { NextResponse } from "next/server";

const protectedRoutes = ["/post-a-read", "/interests", "/reads"];

export default function middleware(req) {
  const isAuthenticated = req.cookies.get("refresh");

  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    // Redirect to the login page
    const loginUrl = new URL("/login", req.nextUrl.origin);
    const response = NextResponse.redirect(loginUrl);
    response.headers.set("Cache-Control", "no-store"); // Prevent caching to ensure fresh checks on each request
    response.headers.set("x-auth-status", "unauthenticated");
    return response;
  }

  // Set headers to prevent caching for authenticated routes as well
  const response = NextResponse.next();
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    response.headers.set("Cache-Control", "no-store");
  }
  return response;
}

export const config = {
  matcher: ["/post-a-read", "/interests", "/reads"],
};

// import { NextResponse } from "next/server";

// // Define the protected routes
// const protectedRoutes = ["/post-a-read", '/interests', '/reads'];

// export default function middleware(req) {

//   const isAuthenticated = req.cookies.get('refresh'); 
//   console.log(isAuthenticated, 'check on server')

//   if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
//     console.log("Redirecting to login");

//     // Redirect to the login page
//     const loginUrl = new URL("/login", req.nextUrl.origin);
//     const response = NextResponse.redirect(loginUrl);
//     response.headers.set("x-auth-status", "unauthenticated");
//     console.log(response, 'response')
//     return response
//   }

//   // If the user is authenticated or accessing a public route, continue
//   return NextResponse.next();
// }


// // Specify the paths for which the middleware should apply
// export const config = {
//   matcher: ['/post-a-read', '/interest', '/reads'],
// };