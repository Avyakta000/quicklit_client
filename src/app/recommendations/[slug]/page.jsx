// app/recommendations/[slug]/page.js
"use client";
import Layout from "@/components/Layout";
import { selectRecommendationBySlug } from "@/redux/features/recommendationsSlice";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const RecommendationsDetailPage = ({ params }) => {
  const { slug } = params;

  // Get the recommendation details from the Redux state using the slug
  const recommendation = useSelector((state) =>
    selectRecommendationBySlug(state, slug)
  );

  // Check if the recommendation is available
  if (!recommendation) {
    return <div className="text-center text-gray-500">Read not found.</div>;
  }

  return (
    <Layout>
      <div className="bg-gray-100 py-6">
        <div className="mx-auto max-w-2xl">
          <header className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800">
              {recommendation?.title}
            </h1>
            <p className="text-gray-500 text-sm">
              {recommendation?.created_at} by {recommendation?.author_full_name}
            </p>
          </header>
        {recommendation?.cover_image &&
          <div className="relative w-full h-64">
            <Image
              src={recommendation?.cover_image}
              alt={recommendation?.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
              />
          </div>
            }

          <div className="prose mx-auto">
            <div dangerouslySetInnerHTML={{ __html: recommendation?.content }} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecommendationsDetailPage;
