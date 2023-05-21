import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";

function InputComponent() {
  const [step, setStep] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [query, setQuery] = useState([]);
  useEffect(() => {
    if (query.length === 3) {
      router.push({
        pathname: "/generate/summary",
        query: { query: query },
      });
    }
  }, [query]);
  const router = useRouter();
  if (step == 1) {
    return (
      <div className="container mx-auto mt-20">
        <div className="grid w-2/3 mx-auto bg-transparent grid-cols-1 text-white font-poppins">
          <div className="text-center mb-4 font-semibold tracking-wider text-lg">
            Step - {step}
          </div>
          <div className=" space-y-[17px] mb-[30px]">
            <p>
              Describe your contract in general. State your purpose in as much
              detail as possible. More detailed input, healthier result...
            </p>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              type="text"
              className=" w-full h-[100px] resize-none border border-white border-1 text-white bg-transparent p-2"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                setStep(step + 1);
                setQuery([...query, prompt]);
                setPrompt("");
              }}
              className="w-[240px] h-[60px] bg-gradient-to-r from-[#4A1C85] to-[#35A4FD] bg-opacity-10 hover:scale-105 hover:shadow-lg duration-200 active:scale-95 active:shadow-none disabled:opacity-25 disabled:cursor-not-allowed"
              disabled={prompt === ""}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  } else if (step == 2) {
    return (
      <div className="container mx-auto mt-20">
        <div className="grid w-2/3 mx-auto bg-transparent grid-cols-1 text-white font-poppins">
          <div className="text-center mb-4 font-semibold tracking-wider text-lg">
            Step - {step}
          </div>
          <div className=" space-y-[17px] mb-[30px]">
            <p>Enter the functions you will need in the contract</p>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              type="text"
              className="w-full h-[100px] resize-none border border-white border-1 text-white bg-transparent p-2"
              required
            />
          </div>
          <div className="flex justify-between gap-x-8">
            <button
              onClick={() => {
                setStep(1);
                setPrompt("");
                setQuery([]);
              }}
              className="w-[240px] h-[60px] bg-gradient-to-r from-[#4A1C85] to-[#35A4FD] bg-opacity-10 hover:scale-105 hover:shadow-lg duration-200 active:scale-95 active:shadow-none"
            >
              Retry
            </button>
            <button
              onClick={() => {
                setStep(step + 1);
                setQuery([...query, prompt]);
                setPrompt("");
              }}
              className="w-[550px] h-[60px] bg-gradient-to-r from-[#4A1C85] to-[#35A4FD] bg-opacity-10 hover:scale-105 hover:shadow-lg duration-200 active:scale-95 active:shadow-none disabled:opacity-25 disabled:cursor-not-allowed"
              disabled={prompt === ""}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  } else if (step == 3) {
    return (
      <div className="container mx-auto mt-20">
        <div className="grid w-2/3 mx-auto bg-transparent grid-cols-1 text-white font-poppins">
          <div className="text-center mb-4 font-semibold tracking-wider text-lg">
            Step - {step}
          </div>
          <div className=" space-y-[17px] mb-[30px]">
            <p>What data will you store on the blockchain?</p>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              type="text"
              className=" w-full h-[100px] resize-none border border-white border-1 text-white bg-transparent p-2"
              required
            />
          </div>
          <div className=" flex justify-between gap-x-8">
            <button
              onClick={() => {
                setStep(1);
                setPrompt("");
                setQuery([]);
              }}
              className="w-[240px] h-[60px] bg-gradient-to-r from-[#4A1C85] to-[#35A4FD] bg-opacity-10 hover:scale-105 hover:shadow-lg duration-200 active:scale-95 active:shadow-none"
            >
              Retry
            </button>
            <button
              onClick={() => {
                setStep(step + 1);
                console.log(prompt);
                setQuery([...query, prompt]);
                setPrompt("");
              }}
              className="w-[550px] h-[60px] bg-gradient-to-r from-[#4A1C85] to-[#35A4FD] bg-opacity-10 hover:scale-105 hover:shadow-lg duration-200 active:scale-95 active:shadow-none disabled:opacity-25 disabled:cursor-not-allowed"
              disabled={prompt === ""}
            >
              Summarize
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default InputComponent;
