"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation'; 
import { fetchReadsByCategory } from '@/redux/features/categorySlice';
import Image from 'next/image';
import Link from 'next/link';
import { fetchReads } from '@/redux/features/readSlice';

const DynamicPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  
  // Convert searchParams to an object
  const paramsObject = Object.fromEntries(searchParams.entries());

  // Get the first key from the paramsObject
  const key = Object.keys(paramsObject)[0]; 
  const value = paramsObject[key]; 

  // Redux state
  const { status, error, cachedCategories } = useSelector((state) => state.categories);

  useEffect(() => {
    
    console.log(key, value, 'key value');

    if (key && value) {
      dispatch(fetchReadsByCategory({ key, value }));
    }
  }, [dispatch, key, value]);

  // Check if the reads are already cached
  const reads = cachedCategories[value]; 

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-[calc(100vh-68px)] mb-8">
      <h1 className="text-2xl font-bold text-gray-200 mt-6 mb-4 border-b py-2">Reads for <span className="text-gray-400">{value}</span></h1>
      
      {status === 'loading' && <p className="text-gray-200">Loading...</p>}
      {status === 'failed' && <p className="text-red-600">Error: {error}</p>}
      
      {reads && reads.length > 0 ? (
        <>
        <span className='text-gray-200 font-semibold '>Total results {reads.length}</span>
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
                <h2 className="text-lg font-semibold">{read.title.slice(0,40)}</h2>
                <p className='text-gray-600' dangerouslySetInnerHTML={{ __html: read.content.slice(0,100)+"..." }} />
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
    </div>
  );
};

export default DynamicPage;
