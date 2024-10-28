'use client';

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
     
        <div className="flex items-center rounded-md justify-center h-screen">
          <PuffLoader color="#007bff" size={100} />
        </div>
    
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

