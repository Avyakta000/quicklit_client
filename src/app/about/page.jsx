'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-12 space-y-8">
      
      {/* Header Section */}
      <header className="text-center max-w-4xl">
        <h1 className="text-5xl font-extrabold mb-4">
          About QuickLit
        </h1>
        <p className="text-lg text-gray-300">
          Welcome to QuickLit – your go-to platform for quick and in-depth information across a variety of categories. From technology and healthcare to education, finance, and more, QuickLit connects you with insightful and engaging content tailored to your interests.
        </p>
      </header>

      {/* Mission Section */}
      <section className="max-w-4xl text-center space-y-4">
        <h2 className="text-3xl font-bold text-blue-500">Our Vision</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          At QuickLit, we believe in the power of accessible information. Our mission is to make high-quality, educational content available to everyone, helping our readers stay informed and curious. We aim to build a community where knowledge flows freely and people from all backgrounds can share and discover valuable insights.
        </p>
      </section>

      {/* What We Offer Section */}
      <section className="flex flex-col items-center space-y-6 mt-8 max-w-4xl">
        <h2 className="text-3xl font-bold text-blue-500 text-center">What We Offer</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Technology */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Technology</h3>
            <p className="text-gray-300">
              Explore the latest in technology, from cutting-edge AI developments to the world of programming, cybersecurity, and beyond.
            </p>
          </div>
          {/* Healthcare */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Healthcare</h3>
            <p className="text-gray-300">
              Stay informed about healthcare trends, wellness tips, and medical advancements that can improve your quality of life.
            </p>
          </div>
          {/* Education */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Education</h3>
            <p className="text-gray-300">
              Discover insights into modern education, learning techniques, and resources that help learners of all ages thrive.
            </p>
          </div>
          {/* Finance */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Finance</h3>
            <p className="text-gray-300">
              Get expert advice and insights into personal finance, investments, and the global economy to empower your financial journey.
            </p>
          </div>
        </div>
      </section>

      {/* Community and Contribution Section */}
      <section className="max-w-4xl text-center space-y-4 mt-12">
        <h2 className="text-3xl font-bold text-blue-500">Join Our Community</h2>
        <p className="text-gray-300 text-lg py-6">
          QuickLit isn’t just a platform for consuming content; it’s a community. We encourage users to share their knowledge by posting articles, insights, and experiences in their fields. Whether you’re a professional, a student, or just someone passionate about learning, you’re welcome here.
        </p>
        <Link href="/signup" className="bg-blue-600 text-gray-200 font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 hover:bg-blue-700 shadow-lg">
            Join Us
        </Link>
      </section>

      {/* Disclaimer Section */}
      <section className="max-w-4xl text-center space-y-4 border-t mt-12 py-8">
        <h2 className="text-3xl font-bold text-red-600">Disclaimer</h2>
        <p className="text-gray-400 text-lg">
          The content and resources shared on QuickLit are sourced from third-party providers and are intended solely for educational and informational purposes. QuickLit does not claim ownership of the content and encourages readers to verify information from original sources.
        </p>
      </section>

    </div>
  );
}
