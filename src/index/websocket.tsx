import { useEffect, ChangeEvent, useRef } from "react";
import "./App.less"
import React from "react";
import { useThrottleCallBack } from "../hooks/useThrottleCallBack";

const MAX = 5;
let current = 1;

function App() {
  const wsRef = useRef<WebSocket>();

  const reStartWs = useThrottleCallBack(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return console.log('ws is open');
    }
    if (current > MAX) {
      return console.log('重连已达最大次数，停止重连');
    }
    console.log('reStartWs, count:', current);
    current++;
    openWs().catch(() => {
      console.log('reStartWs error');
      setTimeout(reStartWs, 5 * 1000);
    })
  }, 5 * 1000);

  const openWs = () => {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket('ws://localhost:8080');
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('Client connected');
        current = 1;
        resolve(void 0);
      };

      ws.onclose = () => {
        wsRef.current = void 0;
        console.log('Client disconnected');
        reStartWs();
      }

      ws.onerror = () => {
        console.log('Client error');
        ws.close();
        wsRef.current = void 0;
        reject(void 0);
      }

      ws.onmessage = (e) => {
        console.log('Client receive message:', e);
      }
    })
  }

  useEffect(() => {
    openWs();
  }, [])

  const [value, setValue] = React.useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const handleBtnClick = () => {
    if (wsRef.current) {
      console.log('Client send message: ', value);
      wsRef.current.send(value);
    } else {
      console.log('ws not open');
    }
  };

  return (
    <div className="app">
      <h1>WebSocket</h1>
      <input type="text" value={value} onChange={handleInputChange} />
      <input className="btn" type="button" value="Send" onClick={handleBtnClick} />
    </div>
  );
}

export default App;