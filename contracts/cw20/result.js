export const res = [
  {
    id: "contract",
    items: [
      {
        code: `
                use cosmwasm_std::{
                    to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdError, StdResult,
                };
                use cw_storage_plus::{Item, Map};
                use serde::{Deserialize, Serialize};
                
                use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};`,
        description: "Necessary libraries for coding",
      },
      {
        code: `#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
                pub struct State {
                    pub hirer: String,
                    pub freelancer: String,
                    pub milestone_count: u32,
                    pub milestone_value: u128,
                    pub balance: u128,
                    pub completion_rate: Option<f64>,
                    pub milestones_completed: u32,
                }
                
                pub const STATE: Item<State> = Item::new("state");
                pub const MILESTONE_COMPLETIONS: Map<&[u8], bool> = Map::new("milestone_completions");`,
        description:
          "The State struct holds the state of the contract. It includes fields for the hirer address, freelancer address, milestone count, milestone value, contract balance, completion rate, and number of milestones completed.",
      },
      {
        code: `pub fn instantiate(
                    mut deps: DepsMut,
                    env: Env,
                    info: MessageInfo,
                    msg: InstantiateMsg,
                ) -> StdResult<Response> {
                    let state = State {
                        hirer: msg.hirer,
                        freelancer: msg.freelancer,
                        milestone_count: msg.milestone_count,
                        milestone_value: msg.milestone_value,
                        balance: info.sent_funds[0].amount,
                        completion_rate: None,
                        milestones_completed: 0,
                    };
                    STATE.save(deps.storage, &state)?;
                    Ok(Response::new().add_attribute("method", "instantiate"))
                }`,
        description:
          "The `instantiate` function initializes the contract by loading the parameters from the `msg` input and storing it in the contract `State`. Returns an empty response if successful.",
      },
      {
        code: `pub fn execute(
                    mut deps: DepsMut,
                    env: Env,
                    info: MessageInfo,
                    msg: ExecuteMsg,
                ) -> Result<Response, StdError> {
                    match msg {
                        ExecuteMsg::CompleteMilestone { milestone_number } => {
                            complete_milestone(deps, env, info, milestone_number)
                        }
                        ExecuteMsg::CompleteContract { completion_rate } => {
                            complete_contract(deps, env, info, completion_rate)
                        }
                        ExecuteMsg::CancelContract {} => cancel_contract(deps, env, info),
                    }
                }`,
        description:
          "The `execute` function is responsible for handling the different types of operations by calling the appropriate function. The `match` statement is used to branch on the input `ExecuteMsg`.",
      },
      {
        code: `fn complete_milestone(
                    mut deps: DepsMut,
                    env: Env,
                    info: MessageInfo,
                    milestone_number: u32,
                ) -> Result<Response, StdError> {
                    let mut state = STATE.load(deps.storage)?;
                
                    if info.sender != state.hirer {
                        return Err(StdError::unauthorized());
                    }
                
                    let key = milestone_number.to_be_bytes();
                    if MILESTONE_COMPLETIONS.may_load(deps.storage, &key)?.unwrap_or(false) {
                        return Err(StdError::generic_err("Milestone already completed"));
                    }
                
                    if milestone_number > state.milestone_count {
                        return Err(StdError::generic_err(
                            "Milestone number exceeds the total number of milestones",
                        ));
                    }
                
                    let mut amount = state.milestone_value;
                    if milestone_number == state.milestone_count && state.completion_rate.is_none() {
                        amount = state.balance;
                    }
                
                    deps.querier.transfer(
                        &env.contract.address,
                        &state.freelancer,
                        amount.into(),
                        "transferred",
                    )?;
                
                    MILESTONE_COMPLETIONS.save(deps.storage, &key, &true)?;
                    state.milestones_completed += 1;
                
                    STATE.save(deps.storage, &state)?;
                
                    Ok(Response::new().add_attribute("method", "complete_milestone"))
                }`,
        description:
          "The `complete_milestone` function is called when a milestone is completed. It takes the milestone number as input and checks for authorization from the hirer address. If the milestone is already completed, an error is returned. If the milestone number is greater than the total number of milestones, an error is returned. The function then transfers the milestone payment amount to the freelancer address, marks the milestone as completed, increments the number of completed milestones, and saves the updated contract state. Returns an empty response if successful.",
      },
      {
        code: `fn complete_contract(
                    mut deps: DepsMut,
                    env: Env,
                    info: MessageInfo,
                    completion_rate: f64,
                ) -> Result<Response, StdError> {
                    let mut state = STATE.load(deps.storage)?;
                
                    if info.sender != state.hirer {
                        return Err(StdError::unauthorized());
                    }
                
                    if state.completion_rate.is_some() {
                        return Err(StdError::generic_err("Contract already completed"));
                    }
                
                    if state.milestones_completed != state.milestone_count {
                        return Err(StdError::generic_err(
                            "All milestones must be completed before the contract can be completed",
                        ));
                    }
                
                    state.completion_rate = Some(completion_rate);
                
                    let amount = (state.balance as f64 * completion_rate).round() as u128;
                    deps.querier.transfer(
                        &env.contract.address,
                        &state.freelancer,
                        amount.into(),
                        "transferred",
                    )?;
                
                    STATE.save(deps.storage, &state)?;
                
                    Ok(Response::new().add_attribute("method", "complete_contract"))
                }`,
        description:
          "The `complete_contract` function is called when all milestones are completed and the contract is ready to be completed. It takes the completion rate as input and checks for authorization from the hirer address. If the completion rate is already set, an error is returned. If all milestones are not completed, an error is returned. The function then calculates the final payment amount based on the completion rate, transfers the final payment amount to the freelancer address, sets the completion rate, and saves the updated contract state. Returns an empty response if successful.",
      },
      {
        code: `fn cancel_contract(
                    mut deps: DepsMut,
                    env: Env,
                    info: MessageInfo,
                ) -> Result<Response, StdError> {
                    let state = STATE.load(deps.storage)?;
                
                    if info.sender != state.hirer {
                        return Err(StdError::unauthorized());
                    }
                
                    let amount = state.balance;
                
                    deps.querier.transfer(
                        &env.contract.address,
                        &state.hirer,
                        amount.into(),
                        "transferred",
                    )?;
                
                    Ok(Response::new().add_attribute("method", "cancel_contract"))
                }`,
        description:
          "The `cancel_contract` function is called to cancel the contract and refund the hirer. It checks for authorization from the hirer address, transfers the full contract balance to the hirer address, and returns an empty response if successful.",
      },
      {
        code: `pub fn query(deps: Deps, env: Env, msg: QueryMsg) -> StdResult<u128> {
                    let key = msg.milestone_number.to_be_bytes();
                    let completed = MILESTONE_COMPLETIONS.may_load(deps.storage, &key)?.unwrap_or(false);
                    if !completed {
                        return Err(StdError::generic_err("Milestone not completed"));
                    }
                
                    let state = STATE.load(deps.storage)?;
                    if msg.milestone_number == state.milestone_count && state.completion_rate.is_none() {
                        Ok(state.balance)
                    } else {
                        Ok(state.milestone_value)
                    }
                }`,
        description:
          "The `query` function takes a milestone number as input and returns the milestone value. If the milestone has not been completed, an error is returned. If the milestone is the final milestone and the completion rate is not set, the full contract balance is returned.",
      },
    ],
  },
  {
    id: "state",
    items: [
      {
        code: `use cosmwasm_std::{ReadonlyStorage, StdError, StdResult, Storage};
                use serde::{Deserialize, Serialize};`,
        description: "Necessary libraries for coding",
      },
      {
        code: `#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
                pub struct State {
                    pub hirer: String,
                    pub freelancer: String,
                    pub milestone_count: u32,
                    pub milestone_value: u128,
                    pub balance: u128,
                    pub completion_rate: Option<f64>,
                    pub milestones_completed: u32,
                }
                
                const STATE_KEY: &[u8] = b"state";`,
        description:
          "The `State` struct is identical to the one defined in `contract.rs`.",
      },
      {
        code: `impl State {
                    pub fn new(
                        hirer: String,
                        freelancer: String,
                        milestone_count: u32,
                        milestone_value: u128,
                        balance: u128,
                    ) -> Self {
                        Self {
                            hirer,
                            freelancer,
                            milestone_count,
                            milestone_value,
                            balance,
                            completion_rate: None,
                            milestones_completed: 0,
                        }
                    }
                
                    pub fn save<S: Storage>(&self, storage: &mut S) -> StdResult<()> {
                        storage.set(STATE_KEY, &serde_json::to_vec(self)?);
                        Ok(())
                    }
                
                    pub fn load<S: ReadonlyStorage>(storage: &S) -> StdResult<Self> {
                        let state = storage.get(STATE_KEY).ok_or_else(|| StdError::generic_err("No state found"))?;
                        serde_json::from_slice(&state).map_err(|e| e.into())
                    }
                }`,
        description:
          "The `new` function creates and returns an instance of `State` from the input parameters. The `save` function takes a storage reference, serializes the `State` instance using JSON, and saves it to storage. It returns an error if the serialization fails. The `load` function takes a storage reference, loads the `State` instance from storage, deserializes it from JSON, and returns it. It returns an error if no `State` instance is found in storage or if deserialization fails.",
      },
    ],
  },
  {
    id: "msg",
    items: [
      {
        code: `use schemars::JsonSchema;
                use serde::{Deserialize, Serialize};`,
        description: "Necessary libraries for coding",
      },
      {
        code: `#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, JsonSchema)]
                pub struct InstantiateMsg {
                    pub hirer: String,
                    pub freelancer: String,
                    pub milestone_count: u32,
                    pub milestone_value: u128,
                }`,
        description:
          "InstantiateMsg holds the parameters coming from the user to initialize the contract, such as the hirer address, freelancer address, milestone count, and milestone value.",
      },
      {
        code: `#[derive(Clone, Debug, PartialEq, Serialize, Deserialize, JsonSchema)]
                #[serde(rename_all = "snake_case")]
                pub enum ExecuteMsg {
                    CompleteMilestone {
                        milestone_number: u32,
                    },
                    CompleteContract {
                        completion_rate: f64,
                    },
                    CancelContract {},
                }`,
        description:
          "ExecuteMsg is an enum that defines the different types of operations that can be performed on the contract. The CompleteMilestone variant requires a milestone number to be passed as input. The CompleteContract variant requires a completion rate to be passed as input. The CancelContract variant takes no inputs.",
      },
      {
        code: `#[derive(Clone, Debug, PartialEq, Serialize, Deserialize, JsonSchema)]
                pub struct QueryMsg {
                    pub milestone_number: u32,
                }`,
        description:
          "QueryMsg is a struct that holds a milestone number to be used in a query.",
      },
    ],
  },
];
