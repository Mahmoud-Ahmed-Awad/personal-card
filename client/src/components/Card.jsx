import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    // <div className="flex justify-center items-center min-h-dvh h-full bg-gradient-to-tr from-slate-950 to-slate-700 text-white p-10 flex-col">
    <div
      className={`flex flex-col items-center border rounded-lg shadow-sm md:flex-row border-gray-700 bg-gray-800 ${className}`}
    >
      {children}
    </div>
    // </div>
  );
};

const FirstPart = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full md:w-lg rounded-t-lg h-full md:rounded-none md:rounded-s-lg object-cover ${className}`}
    >
      {children}
    </div>
  );
};

const SecondPart = ({ children, className = "" }) => {
  return (
    <div
      className={`flex flex-col justify-between p-4 leading-normal ${className}`}
    >
      {children}
    </div>
  );
};

export default Object.assign(Card, { FirstPart, SecondPart });
