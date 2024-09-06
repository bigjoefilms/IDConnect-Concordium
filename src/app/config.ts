// import { CcdAmount } from '@concordium/web-sdk';

// export const WALLET_CONNECT_PROJECT_ID = '76324905a70fe5c388bab46d3e0564dc';
// export const WALLET_CONNECT_SESSION_NAMESPACE = 'ccd';
// export const DEFAULT_CONTRACT_INDEX = BigInt(81);
// export const MAX_CONTRACT_EXECUTION_ENERGY = BigInt(30000);
// export const CHAIN_ID = 'ccd:testnet';
// export const ZERO_AMOUNT = BigInt(0);
// // export const ZERO_AMOUNT = new CcdAmount(BigInt(0));
// export const CCDSCAN_URL = 'testnet.ccdscan.io';
// export const PING_INTERVAL_MS = 5000;


import { CcdAmount } from '@concordium/web-sdk';

export const WALLET_CONNECT_PROJECT_ID = '76324905a70fe5c388bab46d3e0564dc';
export const WALLET_CONNECT_SESSION_NAMESPACE = 'ccd';
export const DEFAULT_CONTRACT_INDEX = BigInt(81);
export const MAX_CONTRACT_EXECUTION_ENERGY = BigInt(30000);
export const CHAIN_ID = 'ccd:testnet';

// Use the appropriate method to create an instance of CcdAmount
// export const ZERO_AMOUNT = CcdAmount.fromBigInt(BigInt(0)); // Example function, adjust as necessary

export const CCDSCAN_URL = 'testnet.ccdscan.io';
export const PING_INTERVAL_MS = 5000;