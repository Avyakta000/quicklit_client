"use client";

import Layout from "@/components/Layout";
import { fetchReads, resetReadStatus } from "@/redux/features/readSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";

const ReadPage = () => {
  const dispatch = useDispatch();
  const { reads, status, error } = useSelector((state) => state.reads);

  useEffect(() => {
    if (status==="idle") {
      dispatch(fetchReads());
    }

    // return () => {
    //   // Cleanup function to reset status on unmount
    //   dispatch(resetReadStatus());
    //   // console.log("Resetting read status on unmount");
    // };
  }, [dispatch, status]);

  if (error) {
    return <div className="text-center text-red-500 py-6">{error}</div>;
  }

  return (
    <Layout>
      <div className="bg-gray-900 py-6 min-h-screen">
        {status === "loading" && 
          <div className="flex justify-center items-center h-screen">
            <PuffLoader color="#007bff" size={100} />
          </div>
        }
        <div className="mx-auto max-w-4xl px-6">
          <header className="text-center mb-10">
            <h1 className="text-5xl font-extrabold text-white">All Reads</h1>
            <p className="text-gray-400 mt-2">
              Dive into my thoughts and experiences.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-8">
            {reads.map((read) => (
              <ReadCard key={read.id} read={read} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// const ReadCard = ({ read }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleContent = () => {
//     setIsExpanded(!isExpanded);
//   };

//   const contentLimit = 200;
//   const hasMoreContent = read.content.length > contentLimit;

//   return (
//     <div className="bg-gray-800 text-white rounded-xl shadow-lg border border-transparent transition-all duration-300 hover:border-blue-400 hover:shadow-neon">
//       {read?.cover_image && (
//         <img
//           src={read.cover_image}
//           alt={read.title}
//           className="w-full h-64 object-cover rounded-t-xl"
//         />
//       )}
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-2">{read.title}</h2>
//         <p className="text-gray-400 text-sm mb-4">
//           {read.created_at} by {read.author_full_name}
//         </p>

//         <div className="prose prose-invert">
//           <div
//             dangerouslySetInnerHTML={{
//               __html: isExpanded
//                 ? read.content
//                 : `${read.content.slice(0, contentLimit)}...`,
//             }}
//           />
//         </div>

//         {hasMoreContent && (
//           <button
//             onClick={toggleContent}
//             className="mt-4 text-blue-400 hover:underline"
//           >
//             {isExpanded ? "Read Less" : "Read More"}
//           </button>
//         )}

//         <div className="flex justify-between items-center mt-6">
//           <Link
//             href={`/reads/${read.slug}`}
//             className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all"
//           >
//             Read More
//           </Link>
//           <div className="flex space-x-4">
//             <button className="text-gray-400 hover:text-blue-400">
//               👍 Like
//             </button>
//             <button className="text-gray-400 hover:text-blue-400">
//               💬 Comment
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const ReadCard = ({ read }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  const contentLimit = 200;
  const hasMoreContent = read.content.length > contentLimit;


  return (
    <>
    <div className="bg-gray-800 text-white rounded-xl shadow-lg border border-transparent transition-all duration-300 hover:border-blue-400 hover:shadow-neon">
      {read?.cover_image && (
        <img
          src={read.cover_image}
          alt={read.title}
          className="w-full h-64 object-cover rounded-t-xl"
          />
      )}
      <div className="p-6">
        <Link href={`/reads/${read.slug}`} className="text-2xl font-bold mb-2">{read.title}</Link>
        <p className="text-gray-400 text-sm mb-4">
          {read.created_at} by {read.author_full_name}
        </p>

        <div className="prose prose-invert">
          <div
            dangerouslySetInnerHTML={{
              __html: isExpanded
                ? read.content
                : `${read.content.slice(0, contentLimit)}...`,
            }}
          />
        </div>

        {hasMoreContent && (
          <button
          onClick={toggleContent}
          className="mt-4 text-blue-400 hover:underline"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}

        {/* <div className=" mt-6"> */}
         
        
        {/* </div> */}
      </div>
    </div>

            </>
  );
};



export default ReadPage;
