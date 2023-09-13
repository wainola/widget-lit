import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import '@wainola/lit-widget'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
    <widget-test
    widgetApp="Widget App Demo"
    primaryColor="red"
    secondaryColor="blue"
    borderRadius="10px"
    fontWeight="bold"
    allowedRoutes='[{ "id": 1, "name": "ethereum" }]'
    allowedWallets='[{ "id": 1, "name": "metamask" }]'
    defaultFromNetwork='{"id": "1", "name": "ethereum"}'
    resourceList='[
    {
      "resourceId": "0x0000000000000000000000000000000000000000000000000000000000000300",
      "type": "fungible",
      "address": "0x3F9A68fF29B3d86a6928C44dF171A984F6180009",
      "symbol": "ERC20LRTest",
      "decimals": 18
    },
    {
      "resourceId": "0x0000000000000000000000000000000000000000000000000000000000000500",
      "type": "permissionlessGeneric",
      "address": "",
      "symbol": "",
      "decimals": 0
    },
    {
      "resourceId": "0x0000000000000000000000000000000000000000000000000000000000001000",
      "type": "fungible",
      "address": "0xB376b0Ee6d8202721838e76376e81eEc0e2FE864",
      "symbol": "GPHA",
      "decimals": 18
    }]'
    ></widget-test>
  </div>
`

setupCounter(document.querySelector('#counter'))
