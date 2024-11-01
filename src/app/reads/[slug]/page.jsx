// app/reads/[slug]/page.js
"use client";
import CommentSystem from "@/components/Comments";
import Layout from "@/components/Layout";
import { selectReadBySlug } from "@/redux/features/readSlice";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const ReadDetailPage = ({ params }) => {
  const { slug } = params;

  // Get the read details from the Redux state using the slug
  const read = useSelector((state) => selectReadBySlug(state, slug));

  // Check if the read is available
  if (!read) {
    return <div className="text-center text-gray-500">Read not found.</div>;
  }

  return (
    <Layout>
      <div className="bg-gray-100 py-6">
        <div className="mx-auto max-w-2xl">
          <header className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800">{read.title}</h1>
            <p className="text-gray-500 text-sm">
              {read.created_at} by {read.author_full_name}
            </p>
          </header>
          {read?.cover_image && (
            <div className="relative w-full h-64">
              <Image
                src={read.cover_image}
                alt={read.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
          )}

          <div className="prose mx-auto">
            <div dangerouslySetInnerHTML={{ __html: read.content }} />
          </div>
          <CommentSystem readId={read.id} />
        </div>
      </div>
    </Layout>
  );
};

export default ReadDetailPage;
