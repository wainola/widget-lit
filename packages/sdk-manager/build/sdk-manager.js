var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let SdkManager = class SdkManager extends LitElement {
    constructor() {
        super(...arguments);
        this.sdkManagerApp = 'The SDK Manager';
    }
    render() {
        return html ` <h1>SDK Manager</h1> `;
    }
};
__decorate([
    property({ type: String })
], SdkManager.prototype, "sdkManagerApp", void 0);
__decorate([
    property({ type: String })
], SdkManager.prototype, "dick", void 0);
SdkManager = __decorate([
    customElement('sdk-manager')
], SdkManager);
export { SdkManager };
