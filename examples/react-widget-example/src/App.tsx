import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { WidgetReact } from '@wainola/react-widget';
import { Widget } from '@wainola/lit-widget';
import '@wainola/lit-widget';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* <widget-test
        widgetApp="Widget App Demo"
        primaryColor="white"
        secondaryColor="violet"
        borderRadius="5px"
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
      ></widget-test> */}
      <WidgetReact
        primaryColor="red"
        secondaryColor="blue"
        borderRadius="5px"
        fontWeight="bold"
        widgetApp="React version of the Widget"
        allowedRoutes={[{ id: 1, name: 'ethereum' }]}
        allowedWallets={[
          {
            id: '1',
            name: 'metamask'
          }
        ]}
        resourceList={[
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
          }]}
      />
    </>
  );
}

export default App;

declare global {
  module JSX {
    interface IntrinsicElements {
      'widget-test': Partial<Widget>;
    }
  }
}
