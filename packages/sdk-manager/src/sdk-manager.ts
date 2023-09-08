import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('sdk-manager')
export class SdkManager extends LitElement {
  @property({ type: String })
  sdkManagerApp: string = 'The SDK Manager';

  @property({ type: String })
  dick?: string;

  render() {
    return html` <h1>SDK Manager</h1> `;
  }
}
