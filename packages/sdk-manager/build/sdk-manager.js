class SDKController {
    constructor(host) {
        // Storing the reference to the host element
        this.host = host;
        // Register for lifecycle updates
        host.addController(this);
    }
    hostConnected() {
        console.log('SDKController hostConnected');
        this.evmAssetTransfer = undefined;
        this.substrateAssetTransfer = undefined;
    }
    hostDisconnected() {
        console.log('SDKController hostDisconnected');
        this.evmAssetTransfer = undefined;
        this.substrateAssetTransfer = undefined;
    }
}
export default SDKController;
