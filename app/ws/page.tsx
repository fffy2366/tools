"use client";

import React, { useState, useEffect, useRef } from "react";
import Select from "./Select";
import UserSelect from "./UserSelect";

interface Option {
  label: string;
  value: string;
}
interface User {
  name: string;
  email: string;  
}
const options: Option[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
];
const users: User[] = [
  { name: "hardy", email: "fengxuting@qq.com" },
  { name: "frank", email: "fengxuting@gmail.com" },
];
export default function Ws() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  let pomelo = useRef(require("./pomelo-creator-client"));
  useEffect((): any => {
    pomelo.current = require("./pomelo-creator-client");
    if (!pomelo.current) {
      console.log("pomelo.current is null");
      return;
    }
    login().then((data) => {
      console.log("login success");
    }
    );

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

  const login = async () => {
    const user = await fetch("http://localhost:4000/users/mpc/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
      body: JSON.stringify({
        email: "fengxuting@qq.com",
        code: "666666",
      })
    }).then((res) => res.json());
    console.log(user);
  }

  const didLogin = async (token:string) => {
    const user = await fetch("http://localhost:13009/did/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
      body: JSON.stringify({
        token
      })
    }).then((res) => res.json());
    console.log(user);
    return user;
  }

  const sendMessage = () => {
    if (pomelo.current) {
      pomelo.current.request(route, msg, (data: any) => {
        console.log(data);
        setMessages((prev) => [...prev, "response:" + msg]);
      });
    }
    setMessages((prev) => [...prev, "request:" + msg]);
    setMsg("");
  };

  const [route, setRoute] = useState(options[0].value);
  const [currenctName, setCurrentName] = useState(users[0].name);
  const [currenctEmail, setCurrentEmail] = useState(users[0].email);

  const handleChange = (value: string) => {
    setRoute(value);
  };
  const handleUserChange = (name: string, email: string) => {
    setCurrentName(name);
    setCurrentEmail(email);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-2 flex-grow overflow-y-auto">
        {messages.map((msg) => (
          <p key={msg}>{msg}</p>
        ))}
      </div>

      <div className="flex gap-2 p-2">
        <UserSelect options={users} label={currenctName} value={currenctEmail} onChange={handleUserChange} />
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
