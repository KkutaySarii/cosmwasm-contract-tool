import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function MainPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto w-2/3 text-poppins min-h-screen text-white my-20 ">
      <h1 className="text-[55px] font-extrabold text-center mb-20">
        AI-Based Smart Contract Generator
      </h1>
      <div className="flex grid-cols-2 mb-20 gap-x-16 flex-end">
        <div className="grid grid-cols-1">
          <p className="text-lg whitespace-normal opacity-70 my-auto">
            Not sure where to start? Use the interactive{" "}
            <a
              href="/generate/cw20"
              className="underline hover:text-blue-800 duration-150"
            >
              CW20
            </a>{" "}
            generator to bootstrap your contract and learn about the components
            or start creating a{" "}
            <a
              href="/generate/custom"
              className=" underline hover:text-blue-800 duration-150"
            >
              custom
            </a>{" "}
            CosmWasm smart contract.
          </p>
        </div>

        <Image
          src={"/images/3.png"}
          alt={"/"}
          width={300}
          height={300}
          className="flex-end"
        />
      </div>
      <div></div>
      {/* <div className="text-xl">
        <div className="grid grid-cols-2 gap-x-16 mb-20">
          <Image />
          <p className="text-lg whitespace-normal opacity-70 my-auto">
            Choose if you need CW20 contract generator or custom contract
            generator.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-16">
          <p>Fill the needed infos</p>
          <Image />
        </div>
        <div className="grid grid-cols-2 gap-x-16">
          <Image />
          <p></p>
        </div>
      </div> */}
      <div className="flex items-center justify-center">
        <button
          onClick={() => router.push("/generate/custom")}
          className=" border border-1 rounded-2xl shadow-xl p-4"
        >
          Get Started
        </button>
      </div>

      <div></div>
    </div>
  );
}

export default MainPage;
