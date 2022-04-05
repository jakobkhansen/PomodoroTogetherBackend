import { Socket } from "socket.io";

import { PomodoroTimer } from "./PomodoroTimer";
import { Session } from "./Session";

// TODO refactor this, probably don't even need separate methods
export class SessionEventListener {
  socket: Socket;
  timer: PomodoroTimer;

  constructor(timer: PomodoroTimer) {
    this.timer = timer;
  }

  // Register all events socket can send
  public registerSocket(socket: Socket) {
    // Run handler, update users
    Object.values(this.events).forEach(([event, handler]) => {
      socket.on(event, (args) => {
        console.info("Event: " + event)
        this.timer.updateTimestamp()
        handler(args);
        this.timer.updateUsers();
      });
    });
  }

  events: { [key: string]: [string, (...args: any[]) => void] } = {
    start: [
      "session start",
      (time: number) => {
        this.timer.startTimer(time);
      },
    ],
    pause: [
      "session pause",
      () => {
        this.timer.pauseTimer();
      },
    ],
    unpause: [
      "session unpause",
      () => {
        this.timer.unPauseTimer();
      },
    ],
    stop: [
      "session stop",
      () => {
        this.timer.stopTimer();
      },
    ],
    increment: [
      "session increment",
      (time: number) => {
        this.timer.incrementTimer(time);
      },
    ],
    // Empty handler, only sends back updates
    update: [
      "session update",
      () => {}
    ]
  };
}
