"use client";

import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation'; 
import { fetchReadsByCategory } from '@/redux/features/categorySlice';
import Image from 'next/image';
import Link from 'next/link';

const DynamicPageContent = ({ key, value, dispatch, reads }) => {
  useEffect(() => {
    if (key && value) {
      dispatch(fetchReadsByCategory({ key, value }));
    }
  }, [dispatch, key, value]);

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-200 mt-6 mb-4 border-b py-2">Reads for <span className="text-gray-400">{value}</span></h1>
      
      {reads && reads.length > 0 ? (
        <>
          <span className='text-gray-200 font-semibold'>Total results {reads.length}</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {reads.map((read) => (
              <div key={read.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                {read.cover_image && (
                  <Image 
                    src={read.cover_image} 
                    alt={read.title} 
                    width={400} 
                    height={250} 
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{read.title.slice(0, 40)}</h2>
                  <p className='text-gray-600' dangerouslySetInnerHTML={{ __html: read.content.slice(0, 100) + "..." }} />
                  <div className="mt-2 flex space-x-4">
                    <span className="text-sm text-gray-500">{read.author_full_name}</span>
                    <span className="text-sm text-gray-500">{read.created_at}</span>
                  </div>
                  <Link 
                    href={`/reads/${read.slug}`} 
                    className="mt-3 inline-block bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-600">No reads found for this {key}.</p>
      )}
    </>
  );
};

const DynamicPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const paramsObject = Object.fromEntries(searchParams.entries());
  const key = Object.keys(paramsObject)[0]; 
  const value = paramsObject[key];

  const { status, error, cachedCategories } = useSelector((state) => state.categories);
  const reads = cachedCategories[value]; 

  return (
    <Suspense fallback={<p className="text-gray-200">Loading...</p>}>
      <div className="max-w-4xl mx-auto p-4 min-h-[calc(100vh-68px)] mb-8">
        {status === 'loading' && <p className="text-gray-200">Loading...</p>}
        {status === 'failed' && <p className="text-red-600">Error: {error}</p>}

        {status === 'success' && (
          <DynamicPageContent key={key} value={value} dispatch={dispatch} reads={reads} />
        )}
      </div>
    </Suspense>
  );
};

export default DynamicPage;
