import React, { useEffect } from "react";

import { Prism } from "@mantine/prism";

import { MsgStart } from "@/contracts/cw20/msg";

const Msg = ({ selectedOptions }) => {
  const [msgCode, setMsgCode] = React.useState([]);
  useEffect(() => {
    setMsgCode(selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="w-full">
      <h1>error.rs</h1>
      <Prism scrollAreaComponent={"true"} language="rust" colorScheme="dark">
        {MsgStart + msgCode.join(" ") + "\n" + "}"}
      </Prism>
    </div>
  );
};

export default Msg;
