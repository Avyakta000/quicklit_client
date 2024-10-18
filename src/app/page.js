// src/app/page.js
"use client";

import Link from "next/link";



export default function HomePage() {
  return (
    <div>
      <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to My QuickLit!</h1>
        <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
          Discover amazing content, learn new things, and join our community of enthusiasts.
        </p>
        <Link href='/signup' className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300">
          Get Started
        </Link>
      </main>
    </div>
  );
}
