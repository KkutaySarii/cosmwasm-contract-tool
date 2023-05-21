export const errorStart = `use cosmwasm_std::StdError;
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum ContractError {`;

export const errorEnd = `}`;

export const Unauthorized = `
    #[error("Unauthorized")]
    Unauthorized {},`;

export const CannotSetOwnAccount = `
    #[error("Cannot set to own account")]
    CannotSetOwnAccount {},`;

export const CannotSetZeroAddress = `
    #[error("Invalid zero amount")]
    InvalidZeroAmount {},`;

export const Expired = `
    #[error("Allowance is expired")]
    Expired {},`;

export const NoAllowance = ` 
    #[error("No allowance for this account")]
    NoAllowance {},`;

export const CannotExceedCap = `
    #[error("Minting cannot exceed the cap")]
    CannotExceedCap {},`;

export const LogoTooBig = `
    #[error("Logo binary data exceeds 5KB limit")]
    LogoTooBig {},
`;

export const InvalidXmlPreamble = `
    #[error("Invalid xml preamble for SVG")]
    InvalidXmlPreamble {},`;

export const InvalidPngHeader = `
    #[error("Invalid png header")]
    InvalidPngHeader {},`;
