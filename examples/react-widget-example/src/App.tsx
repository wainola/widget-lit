import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
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
      <widget-test
        widgetApp="Widget App Demo"
        primaryColor="white"
        secondaryColor="violet"
        borderRadius="5px"
        fontWeight="bold"
      ></widget-test>
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