import { getDateSeconds } from "./Utils";

enum PomodoroState {
  WORKING, // Main timer
  WORKING_PAUSED, // Timer is paused
  BREAK, // Break timer
  BREAK_PAUSED, // Break timer
  DONE, // Timer has finished, initial state
}

const runningTimerStates = [PomodoroState.WORKING, PomodoroState.BREAK];
const pausedTimerStates = [
  PomodoroState.WORKING_PAUSED,
  PomodoroState.BREAK_PAUSED,
];

/*
  TODO refactor this, store a timestamp started/unpaused and time left or something
  so that we don't need to tick each session every second
*/
export class PomodoroTimer {
  timestamp : number
  timeLeft : number
  state: PomodoroState = PomodoroState.DONE;
  updateUsers: () => void;

  public constructor(updateCallback: () => void) {
    this.updateUsers = updateCallback;
  }

  public startTimer(seconds: number) {
    this.timestamp = getDateSeconds()
    this.timeLeft = seconds
    this.state = PomodoroState.WORKING;
    this.updateUsers();
  }

  public pauseTimer() {
    if (this.timerRunning()) {
      this.timeLeft -= getDateSeconds() - this.timestamp
      this.timestamp = getDateSeconds()
      this.state++;
      this.checkIfDone()
    }
  }

  public unPauseTimer() {
    if (this.timerPaused()) {
      this.timestamp = getDateSeconds()
      this.state--;
    }
  }

  public stopTimer() {
    this.timeLeft = 0
    this.state = PomodoroState.DONE;
  }

  private timerRunning() {
    return runningTimerStates.includes(this.state);
  }

  private timerPaused() {
    return pausedTimerStates.includes(this.state);
  }

  private checkIfDone() {
    if (this.timeLeft < 0) {
      this.stopTimer()
    }
  }

  public serialize() {
    return {
      timestamp : this.timestamp,
      timeLeft : this.timeLeft,
      state: this.state,
    };
  }
}
