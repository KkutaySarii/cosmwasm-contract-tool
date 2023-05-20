import { useRouter } from "next/router";
import React from "react";

function summary() {
  const router = useRouter();
  const { query } = router.query;
  return (
    <div className="container mx-auto mt-20 w-2/3 min-h-screen mb-10">
      <div className="text-white text-poppins m-4 space-y-11 my-20">
        <h1 className="text-center text-3xl font-semibold tracking-wider mb-4">
          Summary
        </h1>
        <ul className="max-h-48 w-56 overflow-y-auto space-y-2 pl-5">
          {query &&
            query.map((data, index) => (
              <li className="w-full" key={index}>
                <div className="whitespace-pre-line">
                  {index + 1}. {data}
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="grid items-center mx-auto space-x-5 text-white text-poppins text-xl font-bold grid-cols-2">
        <button className="w-[350px] h-[60px] bg-gradient-to-r from-[#4A1C85] to-[#35A4FD] bg-opacity-10 hover:scale-105 hover:shadow-lg duration-200 active:scale-95 active:shadow-none">
          Back
        </button>
        <button className="w-[600px] h-[60px] bg-gradient-to-r from-[#4A1C85] to-[#35A4FD] bg-opacity-10 hover:scale-105 hover:shadow-lg duration-200 active:scale-95 active:shadow-none">
          Finish
        </button>
      </div>
    </div>
  );
}

export default summary;
