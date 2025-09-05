import type { NextApiResponse } from "next";
import type { Server as IOServer } from "socket.io";
import type { Socket } from "net";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: {
      io?: IOServer;
    };
  };
};
