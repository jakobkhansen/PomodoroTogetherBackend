import { Session } from "./Session";
import { SessionManager } from "./SessionManager";
import { ServerManager } from "./ServerManager";
import { Server, Socket } from "socket.io";
import express from "express";

const sessionManager = SessionManager.getInstance();

const serverManager = ServerManager.getInstance()

const io = serverManager.io;
const httpServer = serverManager.httpServer

io.on('connection', (socket): void => {
  console.log("Hello")
  socket.on('join session', (id) => {
    console.log(id)
    const session = sessionManager.getSession(id)
    session.joinSession(socket)
  })
});

httpServer.listen(3000);
