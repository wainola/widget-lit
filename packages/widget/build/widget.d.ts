import { LitElement } from 'lit';
import { EvmWallet } from '@wainola/lit-wallet-manager';
import { SDKController } from '@wainola/lit-sdk-manager';
export declare class Widget extends LitElement {
    primaryColor?: string;
    secondaryColor?: string;
    borderRadius?: string;
    fontWeight?: string;
    widgetApp?: string;
    allowedRoutes?: Array<{
        id: number;
        name: string;
    }>;
    allowedWallets?: Array<{
        id: string;
        name: string;
    }>;
    defaultFromNetwork?: {
        id: string;
        name: string;
    };
    resourceList?: Array<{
        resourceId: string;
        type: 'fungible' | 'permissionlessGeneric';
        address: string;
        symbol: string;
        decimals: number;
    }>;
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
