// src/app/middleware.js
import { NextResponse } from "next/server";

// Define the protected routes
const protectedRoutes = ["/post-a-read", '/interests'];

export default function middleware(req) {
  // Get the authentication cookie
  const isAuthenticated = req.cookies.get('refresh'); // Replace with your actual auth cookie name
  console.log(isAuthenticated, 'check on server')
  // If the user is not authenticated and is trying to access a protected route
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    console.log("Redirecting to login");

    // Redirect to the login page
    const loginUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  // If the user is authenticated or accessing a public route, continue
  return NextResponse.next();
}
