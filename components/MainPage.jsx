import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

function MainPage() {
  const router = useRouter();
  const users = [
    {
      name: "Kutay Sarı",
      image: "/images/kutay.jpeg",
      title: "Developer Team Lead",
    },
    {
      name: "Atahan Yıldırım",
      image: "/images/ata.jpg",
      title: "Backend Developer",
    },
    {
      name: "Eyüp Bay",
      image: "/images/eyup.jpeg",
      title: "Frontend Developer",
    },
    {
      name: "Ediz Züm",
      image: "/images/ediz.jpg",
      title: "Backend Developer",
    },
    {
      name: "Berk Ünsal",
      image: "/images/berk.jpeg",
      title: "Business Development",
    },
    {
      name: "İrem Koçi",
      image: "/images/irem.jpg",
      title: "Designer",
    },
  ];
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
      <div className="mt-10 flex flex-wrap gap-5 justify-between   ">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative w-24 h-24">
              <Image
                src={user.image}
                alt={user.name}
                className="rounded-full border hover:scale-150 cursor-pointer transition-all"
                fill
              />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-semibold ">{user.name}</h3>
              <h3 className="text-xs font-normal">{user.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
}

export default MainPage;
