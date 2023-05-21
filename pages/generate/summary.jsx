import LoadingComponent from "@/components/LoadingComponent";
import { useRouter } from "next/router";
import React from "react";

function summary() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { query } = router.query;
  const handleFinish = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    router.push("/generate/result");
  };
  return (
    <div className="container mx-auto flex justify-center  min-h-screen mb-10">
      {loading ? (
        <div className="">
          <LoadingComponent />
        </div>
      ) : (
        <div className="mt-20 w-2/3">
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
            <button
              onClick={() => router.push("/")}
              className="w-[350px] h-[60px] bg-gradient-to-r from-[#4A1C85] to-[#35A4FD] bg-opacity-10 hover:scale-105 hover:shadow-lg duration-200 active:scale-95 active:shadow-none"
            >
              Back
            </button>
            <button
              onClick={() => handleFinish()}
              className="w-[350px] h-[60px] bg-gradient-to-r from-[#4A1C85] to-[#35A4FD] bg-opacity-10 hover:scale-105 hover:shadow-lg duration-200 active:scale-95 active:shadow-none"
            >
              Finish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default summary;
