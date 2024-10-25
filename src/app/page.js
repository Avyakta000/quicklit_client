"use client";

import Recommendations from "@/components/Recommendations";
import { selectIsAuthenticated } from "@/redux/features/userAuth";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendations } from "@/redux/features/recommendationsSlice";
import { fetchPreferences } from "@/redux/features/preferenceSlice";
import Layout from "@/components/Layout";
import { PuffLoader } from "react-spinners";

export default function HomePage() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { status: statusRecommendations, recommendations } = useSelector(
    (state) => state.recommendations
  );
  const { status: statusPreferences } = useSelector(
    (state) => state.preferences
  );

  useEffect(() => {
    if (isAuthenticated && statusRecommendations === "idle") {
      dispatch(fetchRecommendations());
      dispatch(fetchPreferences());
    }
  }, [isAuthenticated, statusRecommendations, dispatch]);

  // Add a loading state to handle the delay in data fetching
  if (
    isAuthenticated &&
    (statusRecommendations === "loading" || statusPreferences === "loading")
  ) {
    return (
      <Layout>
        <div className="flex items-center bg-gray-800 rounded-md justify-center h-screen">
          <PuffLoader color="#007bff" size={100} />
        </div>
      </Layout>
    );
  }

  // Handle different cases
  // 1. User is authenticated and has recommendations
  if (isAuthenticated && recommendations?.length > 0) {
    return (
      <Layout>
        <Recommendations />
      </Layout>
    );
  }

  // 2. User is authenticated but has no recommendations (empty or undefined)
  if (isAuthenticated && (!recommendations || recommendations.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome Back to QuickLit!
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
          It seems you haven't set any preferences yet. Let's get started with
          that.
        </p>
        <Link
          href="/interests"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300"
        >
          Set Preferences
        </Link>
      </div>
    );
  }

  // 3. User is not authenticated (guest)
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to QuickLit!
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
        Discover amazing content, learn new things, and join our community of
        enthusiasts.
      </p>
      <Link
        href="/login"
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300"
      >
        Get Started
      </Link>
    </div>
  );
}

// this works fine but latency in data
// "use client";

// import Recommendations from "@/components/Recommendations";
// import { selectIsAuthenticated } from "@/redux/features/userAuth";
// import Link from "next/link";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchRecommendations } from "@/redux/features/recommendationsSlice";
// import { fetchPreferences } from "@/redux/features/preferenceSlice";
// import Layout from "@/components/Layout";

// export default function HomePage() {
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector(selectIsAuthenticated);
//   const { status: statusRecommendations, recommendations } = useSelector(
//     (state) => state.recommendations
//   );

//   // Fetch recommendations if the user is authenticated and hasn't fetched them yet
//   useEffect(() => {
//     if (isAuthenticated && statusRecommendations === "idle") {
//       dispatch(fetchRecommendations());
//       dispatch(fetchPreferences());
//     }
//   }, [isAuthenticated, statusRecommendations, dispatch]);

//   // Handle different cases:
//   // 1. User is authenticated and has recommendations
//   if (isAuthenticated && recommendations?.length > 0) {
//     return (
//       <Layout>
//         <Recommendations />
//       </Layout>
//     );
//   }

//   // 2. User is authenticated but has no recommendations (empty or undefined)
//   if (isAuthenticated && (!recommendations || recommendations.length === 0)) {
//     return (

//         <div className="flex flex-col items-center justify-center h-screen">
//           <h1 className="text-4xl font-bold text-blue-600 mb-4">
//             Welcome Back to QuickLit!
//           </h1>
//           <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
//             It seems you haven't set any preferences yet. Let's get started with that.
//           </p>
//           <Link
//             href="/interests"
//             className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300"
//           >
//             Set Preferences
//           </Link>
//         </div>
//     );
//   }

//   // 3. User is not authenticated (guest)
//   return (

//       <div className="flex flex-col items-center justify-center h-screen">
//         <h1 className="text-4xl font-bold text-blue-600 mb-4">
//           Welcome to QuickLit!
//         </h1>
//         <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
//           Discover amazing content, learn new things, and join our community of enthusiasts.
//         </p>
//         <Link
//           href="/login"
//           className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300"
//         >
//           Get Started
//         </Link>
//       </div>

//   );
// }

// "use client";

// import Recommendations from "@/components/Recommendations";
// import { selectIsAuthenticated } from "@/redux/features/userAuth";
// import Link from "next/link";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Profile from "@/components/Profile";
// import { fetchRecommendations } from "@/redux/features/recommendationsSlice";
// import { fetchPreferences } from "@/redux/features/preferenceSlice";

// export default function HomePage() {
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector(selectIsAuthenticated);
//   const { status: statusRecommendations, recommendations } = useSelector(
//     (state) => state.recommendations
//   );

//   // Fetch recommendations if the user is authenticated and hasn't fetched them yet
//   useEffect(() => {
//     if (isAuthenticated && statusRecommendations === "idle") {
//       dispatch(fetchRecommendations());
//       dispatch(fetchPreferences())
//     }
//   }, [isAuthenticated, statusRecommendations, dispatch]);

//   // Handle different cases:
//   // 1. User is authenticated and has recommendations
//   if (isAuthenticated && recommendations?.length > 0) {
//     return (
//       <main className="h-screen bg-gray-200 flex justify-center">
//         <div className="w-1/6 mt-2 p-2 mb-2 rounded-md border-r border-gray-300">
//           <Profile />
//         </div>
//         <div className={`p-2 overflow-y-scroll scrollbar h-screen`}>
//           <Recommendations />
//         </div>
//       </main>
//     );
//   }

//   // 2. User is authenticated but has no recommendations (empty or undefined)
//   if (isAuthenticated && (!recommendations || recommendations.length === 0)) {
//     return (
//       <div>
//         <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
//           <h1 className="text-4xl font-bold text-blue-600 mb-4">
//             Welcome Back to QuickLit!
//           </h1>
//           <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
//             It seems you haven't set any preferences yet. Let's get started with that.
//           </p>
//           <Link
//             href="/interests"
//             className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300"
//           >
//             Set Preferences
//           </Link>
//         </main>
//       </div>
//     );
//   }

//   // 3. User is not authenticated (guest)
//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <main className="flex flex-col items-center justify-center">
//         <h1 className="text-4xl font-bold text-blue-600 mb-4">
//           Welcome to QuickLit!
//         </h1>
//         <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
//           Discover amazing content, learn new things, and join our community of enthusiasts.
//         </p>
//         <Link
//           href="/login"
//           className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300"
//         >
//           Get Started
//         </Link>
//       </main>
//     </div>
//   );
// }

// import Recommendations from "@/components/Recommendations";
// import { selectIsAuthenticated } from "@/redux/features/userAuth";
// import Link from "next/link";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Profile from "@/components/Profile";
// import { fetchRecommendations } from "@/redux/features/recommendationsSlice";

// export default function HomePage() {
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector(selectIsAuthenticated);
//   const { status:statusReccomendations, recommendations } = useSelector(
//     (state) => state.recommendations
//   );

//   useEffect(() => {
//     // Only fetch preferences if the user is authenticated
//     if (isAuthenticated && statusReccomendations === "idle") {
//       // dispatch(fetchPreferences());
//       dispatch(fetchRecommendations());

//     }
//   }, [isAuthenticated, statusReccomendations]);

//   if (isAuthenticated && recommendations && recommendations.length > 0) {
//     // If authenticated and preferences are available, show recommendations
//     return (
//       <>

//         <main className="h-screen bg-gray-100 flex justify-center">
//           <div className="w-1/4 bg-white p-2 border-r border-gray-300">
//             <Profile />
//           </div>
//           <div className={`p-2 overflow-y-scroll scrollbar`}>
//             <Recommendations />
//           </div>
//         </main>
//       </>
//     );
//   }

//   // If the user is authenticated but has no preferences, prompt them to set preferences
//   if (isAuthenticated && !recommendations && !recommendations.length > 0){
//     return (
//       <div>
//         <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
//           <h1 className="text-4xl font-bold text-blue-600 mb-4">
//             Welcome Back to QuickLit!
//           </h1>
//           <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
//             It seems you haven't set any preferences yet. Let's get started with
//             that.
//           </p>
//           <Link
//             href="/interests"
//             className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300"
//           >
//             Set Preferences
//           </Link>
//         </main>
//       </div>
//     );
//   }

//   // If the user is not authenticated, show the login button
//   return (
//     <>

//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <main className="flex flex-col items-center justify-center">
//           <h1 className="text-4xl font-bold text-blue-600 mb-4">
//             Welcome to QuickLit!
//           </h1>
//           <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
//             Discover amazing content, learn new things, and join our community
//             of enthusiasts.
//           </p>
//           <Link
//             href="/login"
//             className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300"
//           >
//             Get Started
//           </Link>
//         </main>
//       </div>
//     </>
//   );
// }
