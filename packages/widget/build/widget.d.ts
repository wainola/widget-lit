import { LitElement } from 'lit';
import { EvmWallet } from '@wainola/lit-wallet-manager';
import { SDKController } from '@wainola/lit-sdk-manager';
export declare class Widget extends LitElement {
    widgetApp?: string;
    providerUrl?: string;
    evmWallet: EvmWallet | undefined;
    sdkController: SDKController | undefined;
    constructor();
    evmAccount: string;
    evmBalance: string;
    amountToTransfer: string;
    addressToTransfer: string;
    sepoliaChainId: number;
    resourceId: string;
    sendingApprovals: boolean;
    private _connectoToEvm;
    private handleChange;
    private handleCheck;
    private handleSubmit;
    render(): import("lit-html").TemplateResult<1>;
}
