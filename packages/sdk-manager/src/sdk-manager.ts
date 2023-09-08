import { LitElement, html } from 'lit'

@customElement('sdk-manager')
export class SdkManager extends LitElement {
  @property({ type: String })
  sdkManagerApp: string = 'The SDK Manager'

  
  render() {
    return html`
      <h1>SDK Manager</h1>
    `;
  }
}