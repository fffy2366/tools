"use client";

import React, { useState, useEffect, useRef } from "react";
import Select from "./Select";
interface Option {
  label: string;
  value: string;
}
const options: Option[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
];
export default function Ws() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  let pomelo = useRef(require("./pomelo-creator-client"));
  useEffect((): any => {
    pomelo.current = require("./pomelo-creator-client");
    if(!pomelo.current) {
      console.log("pomelo.current is null");
      return;
    }

    pomelo.current.init(
      {
        host: "192.168.130.15",
        port: 13000,
        log: true,
      },
      () => {
        pomelo.current.request(
          "connector.entryHandler.entry",
          {
            token:
              "10adf78a612a10e3253bd410bc8b36d053987ca2d615c31b2eb9a2b90c17d909eb69c1b2629550212541be2edbf6c4e",
            userInfo: null,
          },
          (data: any) => {
            console.log(data);
          }
        );
      }
    );
    
  }, []);

  const sendMessage = () => {
    // 这里pomelo是null,为啥呢
    
    if (pomelo.current) {
      pomelo.current.request(route, msg, (data: any) => {
        console.log(data);
      });
    }
    // setMsg("");
  };

  const [route, setRoute] = useState(options[0].value);

  const handleChange = (value: string) => {
    setRoute(value);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-2 flex-grow overflow-y-auto">
        {messages.map((msg) => (
          <p key={msg}>{msg}</p>
        ))}
      </div>

      <div className="flex gap-2 p-2">
        <Select options={options} value={route} onChange={handleChange} />
        <input
          className="border p-2 flex-grow"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

Ws.useClient = true;
