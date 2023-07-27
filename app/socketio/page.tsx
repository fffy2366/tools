"use client";

import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

export default function Ws() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(():any => {
    const newSocket = io("ws://192.168.130.15:13000/");
    setSocket(newSocket);
    newSocket.on("message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => newSocket.disconnect();
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit("message", msg);
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
