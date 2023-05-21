import React, { useEffect, useState } from "react";

import Error from "@/components/ContractTemplate/error";
import State from "@/components/ContractTemplate/state";
import ExecuteSelect from "@/components/ContractTemplate/executeSelect";
import QuerySelect from "@/components/ContractTemplate/querySelect";

import {
  CannotExceedCap,
  CannotSetOwnAccount,
  CannotSetZeroAddress,
  Expired,
  InvalidPngHeader,
  InvalidXmlPreamble,
  LogoTooBig,
  NoAllowance,
  Unauthorized,
} from "@/contracts/cw20/error";
import {
  ExecuteBurn,
  ExecuteBurnFrom,
  ExecuteDecreaseAllowance,
  ExecuteFunBurn,
  ExecuteFunBurnFrom,
  ExecuteFunDecreaseAllowance,
  ExecuteFunIncreaseAllowance,
  ExecuteFunMint,
  ExecuteFunSend,
  ExecuteFunSendFrom,
  ExecuteFunTransfer,
  ExecuteFunTransferFrom,
  ExecuteFunUpdateLogo,
  ExecuteFunUpdateMarketing,
  ExecuteIncreaseAllowance,
  ExecuteMint,
  ExecuteSend,
  ExecuteSendFrom,
  ExecuteTransfer,
  ExecuteTransferFrom,
  ExecuteUpdateLogo,
  ExecuteUpdateMarketing,
} from "@/contracts/cw20/contract";
import Contract from "@/components/ContractTemplate/contract";
import {
  QueryAllAccounts,
  QueryAllAllowance,
  QueryAllowance,
  QueryBalance,
  QueryFunAllAccounts,
  QueryFunAllAllowance,
  QueryFunAllowance,
  QueryFunBalance,
  QueryFunMarketingInfo,
  QueryFunTokenInfo,
  QueryMarketingInfo,
  QueryMinter,
  QueryTokenInfo,
} from "@/contracts/cw20/query";
import {
  QueryMsgAllAccounts,
  QueryMsgAllAllowances,
  QueryMsgAllowance,
  QueryMsgBalance,
  QueryMsgMarketingInfo,
  QueryMsgMinter,
  QueryMsgTokenInfo,
} from "@/contracts/cw20/msg";
import Msg from "@/components/ContractTemplate/msg";
const executeOptions = [
  {
    name: "Mint",
    error: [Unauthorized, CannotSetZeroAddress, CannotExceedCap],
    executeMsg: ExecuteMint,
    executeFun: ExecuteFunMint,
  },
  {
    name: "Burn",
    error: [CannotSetZeroAddress],
    executeMsg: ExecuteBurn,
    executeFun: ExecuteFunBurn,
  },
  {
    name: "Burn From",
    error: [Expired, NoAllowance],
    executeMsg: ExecuteBurnFrom,
    executeFun: ExecuteFunBurnFrom,
  },
  {
    name: "Increase Allowance",
    error: [CannotSetOwnAccount],
    executeMsg: ExecuteIncreaseAllowance,
    executeFun: ExecuteFunIncreaseAllowance,
  },
  {
    name: "Decrease Allowance",
    error: [CannotSetOwnAccount],
    executeMsg: ExecuteDecreaseAllowance,
    executeFun: ExecuteFunDecreaseAllowance,
  },
  {
    name: "Transfer",
    error: [CannotSetZeroAddress],
    executeMsg: ExecuteTransfer,
    executeFun: ExecuteFunTransfer,
  },
  {
    name: "Transfer From",
    error: [Expired, NoAllowance],
    executeMsg: ExecuteTransferFrom,
    executeFun: ExecuteFunTransferFrom,
  },
  {
    name: "Send",
    error: [CannotSetZeroAddress],
    executeMsg: ExecuteSend,
    executeFun: ExecuteFunSend,
  },
  {
    name: "Send From",
    error: [Expired, NoAllowance],
    executeMsg: ExecuteSendFrom,
    executeFun: ExecuteFunSendFrom,
  },
  {
    name: "Update Marketing",
    error: [Unauthorized],
    executeMsg: ExecuteUpdateMarketing,
    executeFun: ExecuteFunUpdateMarketing,
  },
  {
    name: "Update Logo",
    error: [Unauthorized, LogoTooBig, InvalidXmlPreamble, InvalidPngHeader],
    executeMsg: ExecuteUpdateLogo,
    executeFun: ExecuteFunUpdateLogo,
  },
];
const queryOptions = [
  {
    name: "Balance",
    queryMsg: QueryBalance,
    queryFun: QueryFunBalance,
    MsgQuery: QueryMsgBalance,
  },
  {
    name: "Allowance",
    query: QueryAllowance,
    queryFun: QueryFunAllowance,
    MsgQuery: QueryMsgAllowance,
  },
  {
    name: "All Allowance",
    query: QueryAllAllowance,
    queryFun: QueryFunAllAllowance,
    MsgQuery: QueryMsgAllAllowances,
  },
  {
    name: "All Accounts",
    query: QueryAllAccounts,
    queryFun: QueryFunAllAccounts,
    MsgQuery: QueryMsgAllAccounts,
  },
  {
    name: "Token Info",
    query: QueryTokenInfo,
    queryFun: QueryFunTokenInfo,
    MsgQuery: QueryMsgTokenInfo,
  },
  {
    name: "Minter",
    query: QueryMinter,
    queryFun: QueryMinter,
    MsgQuery: QueryMsgMinter,
  },
  {
    name: "Marketing",
    query: QueryMarketingInfo,
    queryFun: QueryFunMarketingInfo,
    MsgQuery: QueryMsgMarketingInfo,
  },
];

const Cw20 = () => {
  const [executeSelectedOptions, setExecuteSelectedOptions] = useState([]);
  const [querySelectedOptions, setQuerySelectedOptions] = useState([]);
  const [errorSelectedOptions, setErrorSelectedOptions] = useState([]);
  const [executeMsg, setExecuteMsg] = useState([]);
  const [executeFuns, setExecuteFuns] = useState([]);
  const [queryMsg, setQueryMsg] = useState([]);
  const [queryFuns, setQueryFuns] = useState([]);
  const [queryMsgs, setQueryMsgs] = useState([]);
  const [show, setShow] = useState(0);
  useEffect(() => {
    const errorSet = new Set();
    const errorArray = executeSelectedOptions.flatMap((name) => {
      const executeOption = executeOptions.find(
        (option) => option.name === name
      );
      if (executeOption) {
        const newErrors = executeOption.error.filter(
          (error) => !errorSet.has(error)
        );
        newErrors.forEach((error) => errorSet.add(error));
        return newErrors;
      }
      return [];
    });
    setErrorSelectedOptions(errorArray);
  }, [executeSelectedOptions]);
  useEffect(() => {
    const queryArray = querySelectedOptions.flatMap((name) => {
      const queryOption = queryOptions.find((option) => option.name === name);
      return queryOption ? queryOption.queryMsg : [];
    });
    setQueryMsg(queryArray);
  }, [querySelectedOptions]);
  useEffect(() => {
    const queryMsgs = querySelectedOptions.flatMap((name) => {
      const queryOption = queryOptions.find((option) => option.name === name);
      return queryOption ? queryOption.MsgQuery : [];
    });
    setQueryMsgs(queryMsgs);
  }, [querySelectedOptions]);
  useEffect(() => {
    const queryFuns = querySelectedOptions.flatMap((name) => {
      const queryOption = queryOptions.find((option) => option.name === name);
      return queryOption ? queryOption.queryFun : [];
    });
    setQueryFuns(queryFuns);
  }, [querySelectedOptions]);
  useEffect(() => {
    const executeArray = executeSelectedOptions.flatMap((name) => {
      const executeOption = executeOptions.find(
        (option) => option.name === name
      );
      return executeOption ? executeOption.executeMsg : [];
    });
    setExecuteMsg(executeArray);
  }, [executeSelectedOptions]);
  useEffect(() => {
    const executeArray = executeSelectedOptions.flatMap((name) => {
      const executeOption = executeOptions.find(
        (option) => option.name === name
      );
      return executeOption ? executeOption.executeFun : [];
    });
    setExecuteFuns(executeArray);
  }, [executeSelectedOptions]);

  return (
    <div className="container mx-auto my-20 px-5">
      <div className="w-full p-4 flex gap-10">
        <div className="w-1/2">
          <div className="w-2/3">
            <h1 className="text-xl font-semibold mr-4">Execute</h1>
            <div className="flex flex-col">
              <ExecuteSelect
                selectedOptions={executeSelectedOptions}
                setSelectedOptions={setExecuteSelectedOptions}
                optionList={executeOptions}
              />
            </div>
          </div>
          <div className="w-2/3 mt-5">
            <h1 className="text-xl font-semibold mr-4">Query</h1>
            <div className="flex flex-col">
              <QuerySelect
                selectedOptions={querySelectedOptions}
                setSelectedOptions={setQuerySelectedOptions}
                optionList={queryOptions}
              />
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex gap-x-2">
            <button
              onClick={() => setShow(0)}
              className="px-3 py-2 text-white bg-blue-700 rounded-full shadow-md"
            >
              State
            </button>
            <button
              onClick={() => setShow(3)}
              className="px-3 py-2 text-white bg-blue-700 rounded-full shadow-md"
            >
              Msg
            </button>
            <button
              onClick={() => setShow(1)}
              className="px-3 py-2 text-white bg-blue-700 rounded-full shadow-md"
            >
              Contract
            </button>
            <button
              onClick={() => setShow(2)}
              className="px-3 py-2 text-white bg-blue-700 rounded-full shadow-md"
            >
              Error
            </button>
          </div>
          {show === 0 && <State />}
          {show === 1 && (
            <Contract
              selectedExecutes={executeMsg}
              selectedExecuteFuns={executeFuns}
              selectedQuery={queryMsg}
              selectedQueryFuns={queryFuns}
            />
          )}
          {show === 2 && <Error selectedOptions={errorSelectedOptions} />}
          {show === 3 && <Msg selectedOptions={queryMsgs} />}
        </div>
      </div>
    </div>
  );
};

export default Cw20;
