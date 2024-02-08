'use client'

import React, { useState } from "react";

const AppDescription: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <div
      style={{
        backgroundColor: "#B2CCFF", // Light blue background color
        width: "100%",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
        className="border p-4 rounded-md shadow-sm hover:shadow-md transition cursor-pointer sm:mt-32 lg:mt-32 md:mt-32 mt-24"
    >
      <span>
        With Chat Signal, you can let your friends and colleagues know that you&apos;re free for a phone call. Connect with friends that you haven&apos;t connected with in a while!
      </span>
      <button
        style={{
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
        // onClick={handleDismiss}
      >
        {/* X */}
      </button>
    </div>
  ) : null;
};

export default AppDescription;
