import React from "react";

import { Prism } from "@mantine/prism";

import { state } from "@/contracts/cw20/state";

const State = () => {
  return (
    <div className="w-full">
      <h1>state.rs</h1>
      <Prism scrollAreaComponent={"true"} language="rust" colorScheme="dark">
        {state.code}
      </Prism>
    </div>
  );
};

export default State;
