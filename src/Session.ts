import { Socket } from "socket.io";
import { PomodoroTimer } from "./PomodoroTimer";
import { ServerManager } from "./ServerManager";
import { SessionEventListener } from "./SessionEventListener";

const io = ServerManager.getInstance().io;

export class Session {
  roomId: string;
  updateUsers = () => {
    io.to(this.roomId).emit("session update", this.timer.serialize());
  };
  timer: PomodoroTimer = new PomodoroTimer(this.updateUsers);
  eventListener = new SessionEventListener(this.timer)

  constructor(id: string) {
    this.roomId = id;
  }


  public joinSession(socket: Socket): void {
    socket.join(this.roomId);
  }

  public listenForEvents(socket : Socket) : void {
    this.eventListener.registerSocket(socket)
  }

}
