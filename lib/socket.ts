// lib/socket.ts
"use client";
import { io, Socket } from "socket.io-client";

export const socket: Socket = io({
  path: "/socket.io", // default path
});
