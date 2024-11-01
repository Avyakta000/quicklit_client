"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  clearError,
  loginWithGoogle,
  selectIsAuthenticated,
  clearAuth,
} from "@/redux/features/userAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { handleLogout } from "@/utils/helper";
import { clearRecommendations } from "@/redux/features/recommendationsSlice";
import { clearPreferences } from "@/redux/features/preferenceSlice";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { status, error, user } = useSelector((state) => state.auth);
  const searchParams = useSearchParams();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Ref to track if Google login has already been dispatched
  const hasDispatchedGoogleLogin = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");
    const redirected = searchParams.get("redirected");

    if (redirected === "unauthenticated" && !isAuthenticated) {
      console.log('stat x-auth-status', redirected);
      dispatch(clearAuth());
      dispatch(clearPreferences());
      dispatch(clearRecommendations());
      localStorage.removeItem("q_exp");
      // handleLogout(dispatch, router)
    }

    if (status === "success" && isAuthenticated) {
      console.log(isAuthenticated, user, 'yes authenticated');
      router.push("/");
    }

    // Only dispatch login if code is present and we haven't already dispatched it
    if (code && !isAuthenticated && !hasDispatchedGoogleLogin.current) {
      console.log(code, "code is present");
      hasDispatchedGoogleLogin.current = true;
      dispatch(loginWithGoogle(code));

      // Replace URL to remove code param from the URL bar
      const newUrl = window.location.origin + window.location.pathname;
      router.replace(newUrl);
    }
  }, [searchParams, dispatch, isAuthenticated, router, user, status]);

  const handleGoogleLogin = () => {
    const clientID =
      "802970042014-bbq707u390sn2nmcr7ujqn1src1b2po3.apps.googleusercontent.com";
    const callBackURI = "https://quicklit.in/login"; // Replace with your callback URI
    const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callBackURI}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=offline`;

    window.location.href = googleAuthURL;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div 
    className="flex items-center justify-center h-[calc(100vh-64px)] bg-gray-100 relative"
    style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/050/503/588/small_2x/a-close-up-of-a-wave-in-the-ocean-photo.jpeg')", backgroundRepeat: "no-repeat",
      backgroundSize: "cover", }}>
      <div className="absolute inset-0 bg-gradient-to-b from-red-200 to-blue-600 opacity-75"></div>

      <div className="relative w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600">Log In</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 text-gray-900 border-b border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 text-gray-900 border-b border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Logging in..." : "Log In"}
          </button>
        </form>
        <div className="flex items-center justify-center mt-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button
          className="flex items-center justify-center w-full py-2 mt-0 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500"
          onClick={handleGoogleLogin}
        >
          <FaGoogle /> <span className="mx-2">Log in with Google</span>
        </button>
        <p className="text-sm text-center text-gray-500 mt-6">
          New here?
          <Link href={"/signup"} className="text-blue-600 mx-1 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

// Wrap the LoginPage component with Suspense
const WrappedLoginPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LoginPage />
  </Suspense>
);

export default WrappedLoginPage;



// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   loginUser,
//   clearError,
//   loginWithGoogle,
//   selectIsAuthenticated,
//   clearAuth,
// } from "@/redux/features/userAuth";
// import { useRouter, useSearchParams } from "next/navigation";
// import { FaGoogle } from "react-icons/fa";
// import Link from "next/link";
// import { handleLogout } from "@/utils/helper";
// import { clearRecommendations } from "@/redux/features/recommendationsSlice";
// import { clearPreferences } from "@/redux/features/preferenceSlice";

// const LoginPage = () => {

//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { status, error, user } = useSelector((state) => state.auth);
//   const searchParams = useSearchParams();
//   const isAuthenticated = useSelector(selectIsAuthenticated);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Ref to track if Google login has already been dispatched
//   const hasDispatchedGoogleLogin = useRef(false);

//   useEffect(() => {
//     const code = searchParams.get("code");
//     const redirected = searchParams.get("redirected");

//     if (redirected==="unauthenticated" && !isAuthenticated) {
//       console.log('stat x-auth-status', redirected)
//       dispatch(clearAuth())
//       dispatch(clearPreferences());
//       dispatch(clearRecommendations());
//       localStorage.removeItem("q_exp");
//       // handleLogout(dispatch, router)
//     }
//     if(status==="success" && isAuthenticated){
//       // im having to do this because the state still exists after being redirected by middleware since i dont want to go to 
      
//       console.log(isAuthenticated, user, 'yes authenticated')
//       router.push("/")
//     }
//     // Only dispatch login if code is present and we haven't already dispatched it
//     if (code && !isAuthenticated && !hasDispatchedGoogleLogin.current) {
//       console.log(code, "code is present");

//       // Mark the ref to prevent multiple dispatches
//       hasDispatchedGoogleLogin.current = true;

//       // Dispatch Google login
//       dispatch(loginWithGoogle(code));

//       // Replace URL to remove code param from the URL bar
//       const newUrl = window.location.origin + window.location.pathname;
//       router.replace(newUrl);
//     }

//     // Clear errors on page load
//     // dispatch(clearError());
//   }, [searchParams, dispatch, isAuthenticated, router, user, status]);

//   const handleGoogleLogin = () => {
//     const clientID =
//       "802970042014-bbq707u390sn2nmcr7ujqn1src1b2po3.apps.googleusercontent.com";
//     const callBackURI = "http://localhost:3000/login"; // Replace with your callback URI
//     const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callBackURI}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=offline`;

//     window.location.href = googleAuthURL;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser({ email, password }));
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-blue-600">Log In</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="block w-full px-3 py-2 mt-1 text-gray-900 border-b border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
//               placeholder="you@example.com"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="block w-full px-3 py-2 mt-1 text-gray-900 border-b border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
//               placeholder="********"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 mt-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
//             disabled={status==="loading"}
//           >
//             {status==="loading" ? "Logging in..." : "Log In"}
//           </button>
//         </form>
//         <div className="flex items-center justify-center mt-4">
//           <hr className="flex-grow border-gray-300" />
//           <span className="mx-2 text-gray-500">or</span>
//           <hr className="flex-grow border-gray-300" />
//         </div>
//         <button
//           className="flex items-center justify-center w-full py-2 mt-0 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500"
//           onClick={handleGoogleLogin}
//         >
//           <FaGoogle /> <span className="mx-2">Log in with Google</span>
//         </button>
//         <p className="text-sm text-center text-gray-500 mt-6">
//           New here ?
//           <Link href={"/signup"} className="text-blue-600 mx-1 underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
