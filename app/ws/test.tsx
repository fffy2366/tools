"use client";

import React, { useState, useEffect } from "react";
import { pomelo } from "pomelo-creator";

export default function Ws() {
  const [socket, setSocket] = useState<null>(null);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect((): any => {
    const client = pomelo.create("ws://192.168.130.15:13000", {
      auth: async function () {
        const accessToken: string | null = localStorage.getItem("accessToken");
        if (accessToken) {
          const response: any = await client.request(
            "connector.entryHandler.entry",
            {
              token:
                "10adf78a612a10e3253bd410bc8b36d053987ca2d615c31b2eb9a2b90c17d909eb69c1b2629550212541be2edbf6c4e",
              userInfo: null,
            }
          );
          console.log(response);
          if (response.code !== 200) {
            /// 移除失效的 token
            localStorage.removeItem("accessToken");
            return;
          }
          return response;
        }
        console.log("认证失败!");
        return;
      },
      localStorage: {
        setItem: () => {
          localStorage.setItem.bind(localStorage);
        },
        getItem: localStorage.getItem.bind(localStorage),
      },
      retry: 4,
    });
  }, []);

  const sendMessage = () => {
    if (socket) {
      // socket.emit("message", msg);
    }
    setMsg("");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-2 flex-grow overflow-y-auto">
        {messages.map((msg) => (
          <p key={msg}>{msg}</p>
        ))}
      </div>

      <div className="flex gap-2 p-2">
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
