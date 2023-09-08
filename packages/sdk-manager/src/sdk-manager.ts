import {
  EVMAssetTransfer,
  SubstrateAssetTransfer
} from '@buildwithsygma/sygma-sdk-core';
import { ReactiveController, ReactiveControllerHost } from 'lit';

// This is a reactive controller that works as a react hook... kind of
class SDKController implements ReactiveController {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore-next-line
  private host: ReactiveControllerHost;
  evmAssetTransfer: EVMAssetTransfer | undefined;
  substrateAssetTransfer: SubstrateAssetTransfer | undefined;

  constructor(host: ReactiveControllerHost) {
    // Storing the reference to the host element
    this.host = host;

    // Register for lifecycle updates
    host.addController(this as ReactiveController);
  }

  hostConnected(): void {
    console.log('SDKController hostConnected');
    this.evmAssetTransfer = undefined;
    this.substrateAssetTransfer = undefined;
  }

  hostDisconnected(): void {
    console.log('SDKController hostDisconnected');
    this.evmAssetTransfer = undefined;
    this.substrateAssetTransfer = undefined;
  }
}

export default SDKController;
