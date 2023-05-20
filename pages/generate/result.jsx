import React from "react";

import { AiOutlineCopy } from "react-icons/ai";

import RustCodePart from "@/components/RustCodePart";

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
  const value = dummyData.map((data) => data.text).join("\n");
  const copyValue = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        console.log("Değer kopyalandı:", value);
      })
      .catch((error) => {
        console.error("Kopyalama işlemi başarısız oldu:", error);
      });
  };
  return (
    <div className="container mx-auto my-20 px-5 flex justify-center">
      <div className="w-2/3 border border-[#35A4FD] p-4">
        <div className="flex flex-col gap-y-2">
          {dummyData.map((data, index) => (
            <RustCodePart
              key={index}
              text={data.text}
              description={data.description}
            />
          ))}
        </div>
        <button
          onClick={copyValue}
          className="w-full flex items-center justify-end mt-2"
        >
          <span>Copy All Code</span>
          <AiOutlineCopy />
        </button>
      </div>
    </div>
  );
};

export default Result;
