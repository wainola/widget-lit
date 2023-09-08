import {
  EVMAssetTransfer,
  SubstrateAssetTransfer
} from '@buildwithsygma/sygma-sdk-core';
import { ReactiveController, ReactiveControllerHost } from 'lit';
import { EvmWallet, SubstrateWallet } from 'packages/wallet-manager/build';
import { createEvmAssetTransfer } from './sdk-utils';

// This is a reactive controller that works as a react hook... kind of
class SDKController implements ReactiveController {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore-next-line
  private host: ReactiveControllerHost;
  evmAssetTransfer: EVMAssetTransfer | undefined;
  substrateAssetTransfer: SubstrateAssetTransfer | undefined;
  evmWallet: EvmWallet | undefined;
  substrateWallet: SubstrateWallet | undefined;

  constructor(
    host: ReactiveControllerHost,
    evmWallet?: EvmWallet,
    substrateWallet?: SubstrateWallet
  ) {
    // Storing the reference to the host element
    this.host = host;
    this.evmWallet = evmWallet;
    this.substrateWallet = substrateWallet;

    // Register for lifecycle updates
    host.addController(this as ReactiveController);
  }

  hostConnected(): void {
    this.evmAssetTransfer = undefined;
    this.substrateAssetTransfer = undefined;
  }

  hostDisconnected(): void {
    this.evmAssetTransfer = undefined;
    this.substrateAssetTransfer = undefined;
  }

  async createEvmAssetTransfer(): Promise<void> {
    if (this.evmWallet) {
      this.evmAssetTransfer = await createEvmAssetTransfer(this.evmWallet);
    }
  }
}

export default SDKController;
