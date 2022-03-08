import { Socket } from "socket.io";
import { PomodoroTimer } from "./PomodoroTimer";
import { ServerManager } from "./ServerManager";
import { SessionEventListener } from "./SessionEventListener";

const io = ServerManager.getInstance().io;

export class Session {
  roomId: string;
  users: { [socketId: string]: string } = {};
  updateUsers = () => {
    this.timer.updateTimestamp()
    io.to(this.roomId).emit("session update", this.serialize());
  };
  timer: PomodoroTimer = new PomodoroTimer(this.updateUsers);
  eventListener = new SessionEventListener(this.timer);

  constructor(id: string) {
    this.roomId = id;
  }

  public joinSession(socket: Socket, displayName: string): void {
    socket.join(this.roomId);
    this.users[socket.id] = displayName;

    // Disconnect handler
    socket.on('disconnect', () => {
      delete this.users[socket.id]
      this.updateUsers()
    })

    socket.on('session leave', () => {
      delete this.users[socket.id]
      this.updateUsers()
    })
  }

  public listenForEvents(socket: Socket): void {
    this.eventListener.registerSocket(socket);
  }

  public serialize() {
    return {
      users: Object.values(this.users),
      clock: this.timer.serialize()
    };
  }
}
