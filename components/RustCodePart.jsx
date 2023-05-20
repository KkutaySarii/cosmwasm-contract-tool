import React, { useEffect } from "react";

import { Prism } from "@mantine/prism";
import { AiFillQuestionCircle } from "react-icons/ai";

const RustCodePart = ({ text, description }) => {
  const [showDescription, setShowDescription] = React.useState(false);
  const dropdownRef = React.useRef(null);
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDescription(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <div className="relative border border-[#35A4FD]">
      <Prism scrollAreaComponent={"true"} language="rust" colorScheme="dark">
        {text}
      </Prism>
      <div ref={dropdownRef} className="absolute top-0 left-0">
        <button onClick={() => setShowDescription(!showDescription)}>
          <AiFillQuestionCircle className="text-white" />
        </button>
      </div>
      {showDescription && (
        <div className="absolute top-0 right-[100%] bg-[#35A4FD] text-white p-4">
          {description}
        </div>
      )}
    </div>
  );
};

export default RustCodePart;
