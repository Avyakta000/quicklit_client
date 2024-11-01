import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export default async function middleware(req) {
  const refreshTokenCookie = req.cookies.get('refresh');
  const refreshToken = refreshTokenCookie ? refreshTokenCookie.value : null;

  const { pathname } = req.nextUrl;


  // Redirect unauthenticated users to login if they try to access protected routes
  if (!refreshToken && !['/login', '/signup'].includes(pathname)) {
    const loginUrl = new URL('/login', req.nextUrl.origin);
    loginUrl.searchParams.set('redirected', 'unauthenticated'); // Add query parameter
    return NextResponse.redirect(loginUrl);
  }

  // Prevent authenticated users from accessing login or signup
  if (refreshToken && ['/login', '/signup'].includes(pathname)) {
    const home = new URL('/', req.nextUrl.origin); // Change to your preferred page
    return NextResponse.redirect(home);
  }

  if (pathname === '/interests' && refreshToken) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(refreshToken, secret);
      if (payload.hasPreferences) {
        // console.log('User with preferences, redirecting from /interests');
        // const home = new URL('/', req.nextUrl.origin);
        return NextResponse.next();

        // return NextResponse.redirect(home);
      }
    } catch (error) {
      const loginUrl = new URL('/login', req.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }
  }
  // console.log('last block in action')
  return NextResponse.next();
}

export const config = {
  matcher: ['/post-a-read', '/interests', '/login', '/signup'],
};


// import { clearAuth } from './redux/features/userAuth';

// const protectedRoutes = ['/post-a-read', '/interests', '/reads'];

// export default function middleware(req) {
//   const refreshToken = req.cookies.get('refresh');

//   console.log({ name: 'refresh', value: refreshToken }, 'check on server');

//   if (!refreshToken && protectedRoutes.includes(req.nextUrl.pathname)) {
//     console.log('Redirecting to login');
//     store.dispatch(clearAuth());

//     const loginUrl = new URL('/login', req.nextUrl.origin);
//     const response = NextResponse.redirect(loginUrl);
//     response.headers.set('x-auth-status', 'unauthenticated');
//     console.log(response, 'response');

//     return response;
//   }

//   return NextResponse.next();
// }

// export const config = { matcher: ['/post-a-read', '/interests', '/reads'] };

// import { NextResponse } from "next/server";

// const protectedRoutes = ["/post-a-read", "/interests", "/reads"];

// export default function middleware(req) {
//   const isAuthenticated = req.cookies.get("refresh");

//   if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
//     // Redirect to the login page
//     const loginUrl = new URL("/login", req.nextUrl.origin);
//     const response = NextResponse.redirect(loginUrl);
//     response.headers.set("Cache-Control", "no-store"); // Prevent caching to ensure fresh checks on each request
//     response.headers.set("x-auth-status", "unauthenticated");
//     return response;
//   }

//   // Set headers to prevent caching for authenticated routes as well
//   const response = NextResponse.next();
//   if (protectedRoutes.includes(req.nextUrl.pathname)) {
//     response.headers.set("Cache-Control", "no-store");
//   }
//   return response;
// }

// export const config = {
//   matcher: ["/post-a-read", "/interests", "/reads"],
// };



// this works but brings race condition
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