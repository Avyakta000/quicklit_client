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
import Image from "next/image";
import Head from "next/head";
import Catalog from "@/components/Catalog";
import { fetchReads } from "@/redux/features/readSlice";
import RegistrationProcess from "@/components/RegistrationProcess";

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

  useEffect(()=>{
    dispatch(fetchReads())
  },[])
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
      <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center relative bg-gray-700">
        <div className="absolute inset-0 bg-black opacity-20"></div>{" "}
        {/* Dark overlay */}
        <div className="relative bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto text-center">
          <span className="text-gray-600 text-3xl font-semibold">
            Welcome Back to
          </span>
          <h1 className="text-4xl font-extrabold text-blue-600 mb-4 neon-text">
            Quick<span className="text-red-500">Lit</span>
          </h1>
          <p className="text-lg text-gray-800 mb-6">
            It seems you haven’t set any preferences yet. Let’s get started with
            that.
          </p>
          <Link
            href="/interests"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition duration-300 transform hover:scale-105 neon-button"
          >
            Set Preferences
          </Link>
        </div>
      </div>
    );
  }

  // 3. User is not authenticated (guest)
  return (
    <>
    <div
      className="relative h-[calc(100vh-68px)] bg-gray-50"
      style={{
        backgroundImage:
          "url('https://altaseamedia.s3.us-west-1.amazonaws.com/wp-content/uploads/2021/07/31133059/How-oceans-benefit.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Head>
        <title>Get Started - QuickLit</title>
        <meta name="description" content="Join QuickLit" />
      </Head>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 opacity-80"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6 animate-fadeIn">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-300 mb-4">
          Welcome to <span className="text-white">Quick</span>
          <span className="text-red-500">Lit</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mb-8">
          Dive into a world of insightful articles, captivating stories, and a vibrant community eager to explore and learn together.
        </p>
        
        <Link href="/login" className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-800 text-lg font-semibold py-3 px-10 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
         
            Get Started
        
        </Link>
      </div>
    </div>

    <main className="min-h-screen mx-auto bg-gray-900">
    <Catalog />
    <RegistrationProcess/>
  </main>
  </>
  );
}
