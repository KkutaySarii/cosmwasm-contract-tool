import React, { useEffect } from "react";

import { Prism } from "@mantine/prism";
import {
  contractStart,
  executeStart,
  instantiate,
} from "@/contracts/cw20/contract";

import { QueryStart } from "@/contracts/cw20/query";

const Contract = ({
  selectedExecutes,
  selectedExecuteFuns,
  selectedQuery,
  selectedQueryFuns,
}) => {
  const [execute, setExecute] = React.useState([]);
  const [executeFun, setExecuteFun] = React.useState([]);
  const [query, setQuery] = React.useState([]);
  const [queryFun, setQueryFun] = React.useState([]);
  useEffect(() => {
    setExecute(selectedExecutes);
  }, [selectedExecutes]);

  useEffect(() => {
    setQueryFun(selectedQueryFuns);
  }, [selectedQueryFuns]);

  useEffect(() => {
    setQuery(selectedQuery);
  }, [selectedQuery]);

  useEffect(() => {
    setExecuteFun(selectedExecuteFuns);
  }, [selectedExecuteFuns]);

  return (
    <div className="w-full">
      <h1>contract.rs</h1>
      <Prism scrollAreaComponent={"true"} language="rust" colorScheme="dark">
        {contractStart +
          instantiate +
          executeStart +
          execute.join(" ") +
          `
    }
}` +
          executeFun.join(" ") +
          QueryStart +
          query.join(" ") +
          `
    }
}` +
          queryFun.join(" ")}
      </Prism>
    </div>
  );
};

export default Contract;
