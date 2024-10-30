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
import Image from "next/image";

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
        It seems you haven&rsquo;t set any preferences yet. Let&rsquo;s get started with that.

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
    <div className="relative h-screen bg-gray-50 h-[calc(100vh-68px)]" style={{ backgroundImage: "url('https://altaseamedia.s3.us-west-1.amazonaws.com/wp-content/uploads/2021/07/31133059/How-oceans-benefit.jpg')" }}>

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-blue-700 opacity-75"></div>

    {/* Content */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
        Welcome to <span className="text-blue-800">Quick</span><span className="text-yellow-300">Lit</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
        Dive into the world of insightful articles, engaging stories, and a vibrant community ready to explore and learn together.
      </p>
      <Link href="/login" className="bg-yellow-400 text-gray-800 text-lg font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-300 transition duration-300">
          Get Started
      </Link>
    </div>
  </div> 
  );
}

