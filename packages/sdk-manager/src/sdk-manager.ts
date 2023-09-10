import {
  EVMAssetTransfer,
  EvmFee,
  Fungible,
  SubstrateAssetTransfer,
  Transfer
} from '@buildwithsygma/sygma-sdk-core';
import { ReactiveController, ReactiveControllerHost } from 'lit';
import { EvmWallet, Substrate } from '@wainola/lit-wallet-manager';
import { createEvmAssetTransfer } from './sdk-utils';
import { UnsignedTransaction } from '@ethersproject/transactions';
import { PopulatedTransaction } from '@ethersproject/contracts';

// This is a reactive controller that works as a react hook... kind of
class SDKController implements ReactiveController {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore-next-line
  private host: ReactiveControllerHost;
  evmAssetTransfer: EVMAssetTransfer | undefined;
  substrateAssetTransfer: SubstrateAssetTransfer | undefined;
  evmWallet: EvmWallet | undefined;
  substrateWallet: Substrate | undefined;

  constructor(
    host: ReactiveControllerHost,
    evmWallet?: EvmWallet,
    substrateWallet?: Substrate
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

  async createFungibleTransfer(
    address: string,
    destinationChainId: number,
    destinationAddress: string,
    resourceId: string,
    amount: string
  ): Promise<Transfer<Fungible>> {
    const transfer = await this.evmAssetTransfer?.createFungibleTransfer(
      address,
      destinationChainId,
      destinationAddress,
      resourceId,
      amount
    );

    return transfer as Transfer<Fungible>;
  }

  async getFee(transfer: Transfer<Fungible>): Promise<EvmFee> {
    const fee = await this.evmAssetTransfer?.getFee(transfer);
    return fee as EvmFee;
  }

  async buildApprovals(
    transfer: Transfer<Fungible>,
    fee: EvmFee
  ): Promise<UnsignedTransaction[]> {
    const approvals = await this.evmAssetTransfer?.buildApprovals(
      transfer,
      fee
    );
    return approvals as UnsignedTransaction[];
  }

  async buildTransferTransaction(
    transfer: Transfer<Fungible>,
    fee: EvmFee
  ): Promise<PopulatedTransaction> {
    const transferTx = await this.evmAssetTransfer?.buildTransferTransaction(
      transfer,
      fee
    );
    return transferTx as PopulatedTransaction;
  }
}

export default SDKController;
