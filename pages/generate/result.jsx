import React from "react";

import { AiOutlineCopy } from "react-icons/ai";

import RustCodePart from "@/components/RustCodePart";

import { res } from "@/contracts/cw20/result";

const dummyData = [
  {
    text: `use cosmwasm_std::{
        to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdError, StdResult,
    };`,
    description: `Import the necessary packages`,
  },
  {
    text: `const CONTRACT_NAME: &str = "simple_contract";`,
    description: `Define the contract name`,
  },
  {
    text: `pub fn handle(
        _deps: DepsMut,
        _env: Env,
        _info: MessageInfo,
    ) -> Result<Response<Binary>, StdError> {
        // Implement your contract logic here
        // This example does not perform any operations and simply returns an empty response
        Ok(Response::default())
    }`,
    description: `Define the handle function`,
  },
  {
    text: `pub fn init(_deps: DepsMut, _env: Env, _info: MessageInfo) -> StdResult<Response<Binary>> {
        // Perform any necessary initialization here
        // This example does not require any initialization and simply returns an empty response
        Ok(Response::default())
    }`,
    description: `Define the init function`,
  },
  {
    text: `pub fn query(_deps: Deps, _env: Env, _msg: QueryMsg) -> StdResult<Binary> {
        // Implement your query logic here
        // This example does not perform any operations and simply returns an empty response
        Ok(Binary::default())
    }`,
    description: `Define the query function`,
  },
  {
    text: `pub fn handle(
        _deps: DepsMut,
        _env: Env,
        _info: MessageInfo,
    ) -> Result<Response<Binary>, StdError> {
        // Implement your contract logic here
        // This example does not perform any operations and simply returns an empty response
        Ok(Response::default())
    }`,
    description: `Define the handle function`,
  },
  {
    text: `pub fn init(_deps: DepsMut, _env: Env, _info: MessageInfo) -> StdResult<Response<Binary>> {
        // Perform any necessary initialization here
        // This example does not require any initialization and simply returns an empty response
        Ok(Response::default())
    }`,
    description: `Define the init function`,
  },
  {
    text: `pub fn query(_deps: Deps, _env: Env, _msg: QueryMsg) -> StdResult<Binary> {
        // Implement your query logic here
        // This example does not perform any operations and simply returns an empty response
        Ok(Binary::default())
    }`,
    description: `Define the query function`,
  },
];

const Result = () => {
  const contract = res[0].items.map((data) => data.code).join("\n");
  const state = res[1].items.map((data) => data.code).join("\n");
  const msg = res[2].items.map((data) => data.code).join("\n");
  const [show, setShow] = React.useState(0);
  console.log(contract);
  const value = dummyData.map((data) => data.text).join("\n");
  const copyContract = () => {
    navigator.clipboard
      .writeText(contract)
      .then(() => {
        console.log("Değer kopyalandı:", contract);
      })
      .catch((error) => {
        console.error("Kopyalama işlemi başarısız oldu:", error);
      });
  };
  const copyMsg = () => {
    navigator.clipboard
      .writeText(msg)
      .then(() => {
        console.log("Değer kopyalandı:", msg);
      })
      .catch((error) => {
        console.error("Kopyalama işlemi başarısız oldu:", error);
      });
  };
  const copyState = () => {
    navigator.clipboard
      .writeText(state)
      .then(() => {
        console.log("Değer kopyalandı:", state);
      })
      .catch((error) => {
        console.error("Kopyalama işlemi başarısız oldu:", error);
      });
  };
  return (
    <div className="container mx-auto my-20 px-5 flex justify-center flex-col">
      <div className="flex gap-x-2 mb-10">
        <button
          onClick={() => setShow(0)}
          className="px-3 py-2 text-white bg-blue-700 rounded-full shadow-md"
        >
          Contract
        </button>
        <button
          onClick={() => setShow(1)}
          className="px-3 py-2 text-white bg-blue-700 rounded-full shadow-md"
        >
          State
        </button>
        <button
          onClick={() => setShow(2)}
          className="px-3 py-2 text-white bg-blue-700 rounded-full shadow-md"
        >
          Msg
        </button>
      </div>
      {show === 0 && (
        <div className="w-full border border-[#35A4FD] p-4">
          <h1>contract.rs</h1>
          <div className="flex flex-col gap-y-2">
            {res[0].items.map((data, index) => (
              <RustCodePart
                key={index}
                text={data.code}
                description={data.description}
              />
            ))}
          </div>
          <button
            onClick={copyContract}
            className="w-full flex items-center justify-end mt-2"
          >
            <span>Copy All Code</span>
            <AiOutlineCopy />
          </button>
        </div>
      )}
      {show === 1 && (
        <div className="w-full border border-[#35A4FD] p-4">
          <h1>state.rs</h1>
          <div className="flex flex-col gap-y-2">
            {res[1].items.map((data, index) => (
              <RustCodePart
                key={index}
                text={data.code}
                description={data.description}
              />
            ))}
          </div>
          <button
            onClick={copyState}
            className="w-full flex items-center justify-end mt-2"
          >
            <span>Copy All Code</span>
            <AiOutlineCopy />
          </button>
        </div>
      )}
      {show === 2 && (
        <div className="w-full border border-[#35A4FD] p-4">
          <h1>error.rs</h1>
          <div className="flex flex-col gap-y-2">
            {res[2].items.map((data, index) => (
              <RustCodePart
                key={index}
                text={data.code}
                description={data.description}
              />
            ))}
          </div>
          <button
            onClick={copyMsg}
            className="w-full flex items-center justify-end mt-2"
          >
            <span>Copy All Code</span>
            <AiOutlineCopy />
          </button>
        </div>
      )}
    </div>
  );
};

export default Result;
