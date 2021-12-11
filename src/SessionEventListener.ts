import { Socket } from "socket.io";
import { PomodoroTimer } from "./PomodoroTimer";


// TODO refactor this, probably don't even need separate methods
export class SessionEventListener {
  socket : Socket
  timer : PomodoroTimer

  constructor(timer : PomodoroTimer) {
    this.timer = timer
  }

  public registerSocket(socket : Socket) {
    this.startListener(socket)
    this.pauseListener(socket)
  }

  public startListener(socket : Socket) {
    const timer = this.timer
    socket.on('session start', (time : number) => {
      timer.startTimer(time)
      timer.updateUsers()
    })

  }

  public pauseListener(socket : Socket) {
    const timer = this.timer
    socket.on('session pause', () => {
      timer.pauseTimer()
      timer.updateUsers()
    })
  }

  public unPauseListener(socket : Socket) {
    const timer = this.timer
    socket.on('session unpause', () => {
      timer.unPauseTimer()
      timer.updateUsers()
    })
  }

  public stopListener(socket : Socket) {
    const timer = this.timer
    socket.on('session stop', () => {
      timer.stopTimer()
      timer.updateUsers()
    })
  }

  // Client requests an update from server
  public updateListener(socket : Socket) {
    const timer = this.timer
    socket.on('session stop', () => {
      timer.updateUsers()
    })
  }

}
