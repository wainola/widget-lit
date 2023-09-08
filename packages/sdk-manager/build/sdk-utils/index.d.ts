import { EVMAssetTransfer, SubstrateAssetTransfer } from '@buildwithsygma/sygma-sdk-core';
import { EvmWallet, SubstrateWallet } from '@wainola/wallet-manager';
declare const createEvmAssetTransfer: (evmWallet: EvmWallet) => Promise<EVMAssetTransfer>;
declare const createSubstrateAssetTransfer: (substrateWallet: SubstrateWallet) => Promise<SubstrateAssetTransfer>;
export { createEvmAssetTransfer, createSubstrateAssetTransfer };
