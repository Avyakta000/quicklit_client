"use client";

import { useState } from "react";
import { FaTimes, FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";

export function CustomAlert({ type, message, onDismiss }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (!isVisible) return null;

  // Define alert color styles based on the type
  const alertColors = {
    success: "bg-green-50 border-green-400 text-green-800",
    error: "bg-red-50 border-red-400 text-red-800",
    info: "bg-blue-50 border-blue-400 text-blue-800",
    warning: "bg-yellow-50 border-yellow-400 text-yellow-800",
  };

  // Define icons based on the alert type
  const alertIcons = {
    success: <FaCheckCircle className="text-green-500" />,
    error: <FaExclamationCircle className="text-red-500" />,
    info: <FaInfoCircle className="text-blue-500" />,
    warning: <FaExclamationTriangle className="text-yellow-500" />,
  };

  // Set the appropriate styles based on the alert type
  const alertStyle = alertColors[type] || alertColors.success; // Fallback to success if the type is unknown
  const alertIcon = alertIcons[type] || alertIcons.success;

  return (
    <div
      className={`fixed top-20 z-40 right-5 flex items-center p-4 mb-4 border-l-4 rounded-lg shadow-lg ${alertStyle}`}
    >
      <div className="flex items-center">
        <div className="mr-3 text-2xl">
          {alertIcon}
        </div>
        <div className="flex-grow">
          <span className="font-semibold text-lg">
            {type.charAt(0).toUpperCase() + type.slice(1)} Alert!
          </span>
          <p className="text-sm mt-1">{message}</p>
        </div>
        <button
          onClick={handleDismiss}
          className="ml-4 text-xl font-bold text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
}

// Example Usage
export function Component() {
  return (
    <div className="p-6 space-y-4">
      <CustomAlert
        type="success"
        message="Your operation was successful!"
        onDismiss={() => alert('Success alert dismissed!')}
      />
      <CustomAlert
        type="error"
        message="There was an error processing your request."
        onDismiss={() => alert('Error alert dismissed!')}
      />
      <CustomAlert
        type="info"
        message="Please note that your password will expire soon."
        onDismiss={() => alert('Info alert dismissed!')}
      />
      <CustomAlert
        type="warning"
        message="This is a warning message."
        onDismiss={() => alert('Warning alert dismissed!')}
      />
    </div>
  );
}
