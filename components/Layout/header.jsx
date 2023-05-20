import Image from "next/image";
import React, { useEffect, useRef } from "react";

import { useWallet } from "@/context/wallet";
import { useKeplr } from "@/services/keplr";
import Link from "next/link";

const dropdowns = [
  {
    title: "Cw1",
    to: "/generate/cw1",
  },
  {
    title: "Cw20",
    to: "/generate/cw20",
  },
  {
    title: "Cw721",
    to: "/generate/cw721",
  },
  {
    title: "Custom",
    to: "/generate/custom",
  },
];

const Header = () => {
  const keplr = useKeplr();
  const wallet = useWallet();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [dropdown, setDropdown] = React.useState(dropdowns[0]);
  const dropdownRef = useRef(null);

  const ConnectWallet = () => {
    if (wallet.initialized) {
      keplr.disconnect();
    } else {
      keplr.connect();
    }
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <div className="pt-6 px-4 container mx-auto bg-transparent">
      <header className="flex md:gap-x-[134px] gap-x-[72px] items-center">
        <Link href="/">
          <Image alt="logo" src="/images/logo.svg" width={38} height={38} />
        </Link>
        <div className="flex w-full sm:justify-between justify-end items-center">
          <div className="hidden sm:block">
            <div className="relative flex items-center p-[10px] text-white text-lg font-bold">
              <div ref={dropdownRef} className="relative w-[238px]">
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="z-50 w-full bg-main-gradient px-5 py-2.5 flex items-center justify-between shadow-md"
                >
                  <span>{dropdown.title}</span>
                  <Image
                    alt="logo"
                    src="/images/dropdown.svg"
                    width={8}
                    height={8}
                  />
                </button>
                {showDropdown && (
                  <div className="absolute w-full bg-blue-500 top-[50px] left-0 z-40">
                    <ul>
                      {dropdowns.map((item, index) => (
                        <li
                          key={index}
                          className="relative p-2 text-sm font-medium w-full border "
                        >
                          <Link className="cursor-pointer z-40" href={item.to}>
                            {item.title}
                          </Link>
                          <div className="bg-[#35A4FD] -z-10 opacity-10 absolute top-0 w-full h-full "></div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="text-center px-5">Generate</div>
              <div className="-z-10 absolute top-0 w-full h-full opacity-10 bg-[#35A4FD]"></div>
            </div>
          </div>
          <button
            onClick={ConnectWallet}
            className="bg-[#35A4FD] hover:bg-[#299cfa] text-white text-sm font-semibold py-[14px] gap-x-1 px-6 rounded flex items-center justify-center overflow-hidden whitespace-nowrap overflow-ellipsis"
          >
            <Image alt="logo" src="/images/keplr.svg" width={22} height={22} />
            <span>
              {wallet.address ? wallet.address.slice(0, 6) + "..." : "Connect"}
            </span>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
