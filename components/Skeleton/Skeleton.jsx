import React from "react";

const Skeleton_box = () => {
  return (
    <>
    {
      Array.from({length:7}).map((e,i) =>(
            <div key={i} role="status" className="skeleton1 mb-4 max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
            <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
            <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
            </div>
      ))
    }

</>
  );
};

export default Skeleton_box;
