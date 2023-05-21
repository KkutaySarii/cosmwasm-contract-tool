export const QueryStart = `
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {`;

export const QueryBalance = `
        QueryMsg::Balance { address } => to_binary(&query_balance(deps, address)?),`;

export const QueryTokenInfo = `
        QueryMsg::TokenInfo {} => to_binary(&query_token_info(deps)?),`;

export const QueryMinter = `
        QueryMsg::Minter {} => to_binary(&query_minter(deps)?),`;

export const QueryAllowance = `
        QueryMsg::Allowance { owner, spender } => {
            to_binary(&query_allowance(deps, owner, spender)?)
        }`;
export const QueryAllAllowance = `
        QueryMsg::AllAllowances {
            owner,
            start_after,
            limit,
        } => to_binary(&query_all_allowances(deps, owner, start_after, limit)?),`;

export const QueryAllAccounts = `
        QueryMsg::AllAccounts { start_after, limit } => {
            to_binary(&query_all_accounts(deps, start_after, limit)?)
        };`;

export const QueryMarketingInfo = `
        QueryMsg::MarketingInfo {} => to_binary(&query_marketing_info(deps)?),`;

export const QueryDownloadLogo = `
        QueryMsg::DownloadLogo {} => to_binary(&query_download_logo(deps)?),`;

export const QueryFunBalance = `
pub fn query_balance(deps: Deps, address: String) -> StdResult<BalanceResponse> {
    let address = deps.api.addr_validate(&address)?;
    let balance = BALANCES
        .may_load(deps.storage, &address)?
        .unwrap_or_default();
    Ok(BalanceResponse { balance })
}`;

export const QueryFunTokenInfo = `
pub fn query_token_info(deps: Deps) -> StdResult<TokenInfoResponse> {
    let info = TOKEN_INFO.load(deps.storage)?;
    let res = TokenInfoResponse {
        name: info.name,
        symbol: info.symbol,
        decimals: info.decimals,
        total_supply: info.total_supply,
    };
    Ok(res)
}`;

export const QueryFunMinter = `
pub fn query_minter(deps: Deps) -> StdResult<Option<MinterResponse>> {
    let meta = TOKEN_INFO.load(deps.storage)?;
    let minter = match meta.mint {
        Some(m) => Some(MinterResponse {
            minter: m.minter.into(),
            cap: m.cap,
        }),
        None => None,
    };
    Ok(minter)
}`;

export const QueryFunMarketingInfo = `
pub fn query_marketing_info(deps: Deps) -> StdResult<MarketingInfoResponse> {
    Ok(MARKETING_INFO.may_load(deps.storage)?.unwrap_or_default())
}`;

export const QueryFunDownloadLogo = `
pub fn query_download_logo(deps: Deps) -> StdResult<DownloadLogoResponse> {
    let logo = LOGO.load(deps.storage)?;
    match logo {
        Logo::Embedded(EmbeddedLogo::Svg(logo)) => Ok(DownloadLogoResponse {
            mime_type: "image/svg+xml".to_owned(),
            data: logo,
        }),
        Logo::Embedded(EmbeddedLogo::Png(logo)) => Ok(DownloadLogoResponse {
            mime_type: "image/png".to_owned(),
            data: logo,
        }),
        Logo::Url(_) => Err(StdError::not_found("logo")),
    }
}`;
