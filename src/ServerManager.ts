import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

export class ServerManager {
  private static instance : ServerManager

  public app
  public httpServer
  public io

  private constructor() {
    this.app = express()
    this.httpServer = createServer(this.app)
    this.io = new Server(this.httpServer)
  }

  public static getInstance() : ServerManager {
    if (!ServerManager.instance) {
      ServerManager.instance = new ServerManager()
    }
    return ServerManager.instance
  }
}
