import { Socket } from "socket.io";
import { PomodoroTimer } from "./PomodoroTimer";
import { ServerManager } from "./ServerManager";

export class Session {
  roomId: string;
  timer: PomodoroTimer = new PomodoroTimer();

  constructor(id: string) {
    this.roomId = id;
    this.initializeSession()
  }

  private initializeSession() {
    setInterval(() => {
      this.statusUpdate()
    }, 3000)
  }

  public joinSession(socket : Socket) : void {
    socket.join(this.roomId);
  }

  public statusUpdate() : void {
    console.log("Sending update")
    const io = ServerManager.getInstance().io
    io.to(this.roomId).emit("update", this.timer)
  }
}
