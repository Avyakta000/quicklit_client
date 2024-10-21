"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

export default function CustomModal({ message, openModal, setOpenModal }) {
  return (
    <>
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[3px] flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 relative animate-fadeIn">
            {/* Close Button */}
            <button
              className="absolute  top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setOpenModal(false)}
              >
              <FaTimes/>
            </button>

            {/* Modal Icon */}
            <div className="flex flex-col justify-center items-center">
              <div className="w-16 h-16 border-4 border-gray-300 rounded-full flex justify-center items-center">
                <TiTick className="h-10 w-10 text-green-400" />
              </div>
              {/* Modal Message */}
              <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-4">
                {message}
              </h3>

              {/* Modal Buttons */}
              <button
                onClick={() => setOpenModal(false)}
                className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
