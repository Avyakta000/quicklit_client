"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export function CustomAlert({ type = "success", message, onDismiss }) {
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
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    info: "bg-blue-100 border-blue-400 text-blue-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
  };

  // Set the appropriate styles based on the alert type
  const alertStyle = alertColors[type] || alertColors.success; // Fallback to success if the type is unknown

  return (
    <div
    className={`fixed top-10 z-40 left-1/2 transform -translate-x-1/2 flex items-center p-4 mb-4 border-l-4 rounded-lg shadow-md ${alertStyle}`}
  >
    <div className="flex-grow">
      <span className="font-medium">
        {type.charAt(0).toUpperCase() + type.slice(1)} Alert!
      </span>
      <p>{message}</p>
    </div>
    <button
      onClick={handleDismiss}
      className="ml-4 text-xl font-bold text-gray-500 hover:text-gray-700 focus:outline-none"
    >
      <FaTimes/>
    </button>
  </div>
  );
}

// Example Usage
export function Component() {
  return (
    <div className="p-6">
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
