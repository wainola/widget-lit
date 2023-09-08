import {
  EVMAssetTransfer,
  Environment,
  SubstrateAssetTransfer
} from '@buildwithsygma/sygma-sdk-core';
import { EvmWallet, SubstrateWallet } from '@wainola/wallet-manager';

const createEvmAssetTransfer = async (
  evmWallet: EvmWallet
): Promise<EVMAssetTransfer> => {
  const assetTransfer = new EVMAssetTransfer();
  await assetTransfer.init(evmWallet!.currentProvider!, Environment.TESTNET);
  return assetTransfer;
};

const createSubstrateAssetTransfer = async (
  substrateWallet: SubstrateWallet
): Promise<SubstrateAssetTransfer> => {
  const assetTransfer = new SubstrateAssetTransfer();
  await assetTransfer.init(substrateWallet!.currentApi!, Environment.TESTNET);
  return assetTransfer;
};

export { createEvmAssetTransfer, createSubstrateAssetTransfer };
