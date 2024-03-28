import React from "react";
import { RotatingSquare } from "react-loader-spinner";

const Spinner = ({ text }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      <RotatingSquare color="#0260FF" height={80} width={200} className="m-5" />
      <p className="text-lg text-slate-500 text-center dark:text-slate-50 px-2">
        {text}
      </p>
    </div>
  );
};

export default Spinner;
