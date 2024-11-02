import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const RegistrationProcess = () => {
  return (
    <div className="max-w-screen mx-auto p-6 bg-gray-50 shadow-md">
        <div className="max-w-4xl mx-auto">

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Join Us in 2 Simple Steps!
      </h2>

      <div className="flex items-start mb-6">
        <div className="text-4xl text-green-500 mr-4">
          <FaCheckCircle />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-green-600">Step 1: Get Yourself Registered</h3>
          <p className="text-gray-700">
            Create an account with us to start your journey towards personalized recommendations.
          </p>
        </div>
      </div>

      <div className="flex items-start mb-6">
        <div className="text-4xl text-green-500 mr-4">
          <FaCheckCircle />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-green-600">Step 2: Select Your Topic of Interest</h3>
          <p className="text-gray-700">
            Choose your preferred topics to receive tailored recommendations that suit your taste.
          </p>
        </div>
      </div>

      <div className="text-center mt-8">
        <h3 className="text-lg font-semibold">For Business Inquiries or Contact</h3>
        <a
          href="mailto:im.kusharsh@gmail.com"
          className="text-green-500 font-bold hover:underline"
        >
          im.kusharsh@gmail.com
        </a>
      </div>
      </div>

    </div>
  );
};

export default RegistrationProcess;
