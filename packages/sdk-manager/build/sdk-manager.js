import { createEvmAssetTransfer } from './sdk-utils';
// This is a reactive controller that works as a react hook... kind of
class SDKController {
    constructor(host, evmWallet, substrateWallet) {
        // Storing the reference to the host element
        this.host = host;
        this.evmWallet = evmWallet;
        this.substrateWallet = substrateWallet;
        // Register for lifecycle updates
        host.addController(this);
    }
    hostConnected() {
        this.evmAssetTransfer = undefined;
        this.substrateAssetTransfer = undefined;
    }
    hostDisconnected() {
        this.evmAssetTransfer = undefined;
        this.substrateAssetTransfer = undefined;
    }
    async createEvmAssetTransfer() {
        if (this.evmWallet) {
            this.evmAssetTransfer = await createEvmAssetTransfer(this.evmWallet);
        }
    }
    async createFungibleTransfer(address, destinationChainId, destinationAddress, resourceId, amount) {
        const transfer = await this.evmAssetTransfer?.createFungibleTransfer(address, destinationChainId, destinationAddress, resourceId, amount);
        return transfer;
    }
    async getFee(transfer) {
        const fee = await this.evmAssetTransfer?.getFee(transfer);
        return fee;
    }
    async buildApprovals(transfer, fee) {
        const approvals = await this.evmAssetTransfer?.buildApprovals(transfer, fee);
        return approvals;
    }
}
export default SDKController;
