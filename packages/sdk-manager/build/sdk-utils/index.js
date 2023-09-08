import { EVMAssetTransfer, Environment, SubstrateAssetTransfer } from '@buildwithsygma/sygma-sdk-core';
const createEvmAssetTransfer = async (evmWallet) => {
    const assetTransfer = new EVMAssetTransfer();
    await assetTransfer.init(evmWallet.currentProvider, Environment.TESTNET);
    return assetTransfer;
};
const createSubstrateAssetTransfer = async (substrateWallet) => {
    const assetTransfer = new SubstrateAssetTransfer();
    await assetTransfer.init(substrateWallet.currentApi, Environment.TESTNET);
    return assetTransfer;
};
export { createEvmAssetTransfer, createSubstrateAssetTransfer };
