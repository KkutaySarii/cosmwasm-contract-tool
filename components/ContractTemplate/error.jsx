import React, { useEffect } from "react";

import { Prism } from "@mantine/prism";

import { errorEnd, errorStart } from "@/contracts/cw20/error";

const Error = ({ selectedOptions }) => {
  const [errorCode, setErrorCode] = React.useState([]);
  useEffect(() => {
    setErrorCode(selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="w-full">
      <h1>error.rs</h1>
      <Prism scrollAreaComponent={"true"} language="rust" colorScheme="dark">
        {errorStart + errorCode.join(" ") + "\n" + errorEnd}
      </Prism>
    </div>
  );
};

export default Error;
