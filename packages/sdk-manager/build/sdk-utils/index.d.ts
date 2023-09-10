import { EVMAssetTransfer, SubstrateAssetTransfer } from '@buildwithsygma/sygma-sdk-core';
import { EvmWallet, Substrate } from '@wainola/lit-wallet-manager';
declare const createEvmAssetTransfer: (evmWallet: EvmWallet) => Promise<EVMAssetTransfer>;
declare const createSubstrateAssetTransfer: (substrateWallet: Substrate) => Promise<SubstrateAssetTransfer>;
export { createEvmAssetTransfer, createSubstrateAssetTransfer };
