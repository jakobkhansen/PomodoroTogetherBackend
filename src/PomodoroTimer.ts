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
  timer: number = 0;
  state: PomodoroState = PomodoroState.DONE;
  interval = this.initializeInterval();
  updateUsers: () => void;

  public constructor(updateCallback: () => void) {
    this.updateUsers = updateCallback;
  }

  public startTimer(seconds: number) {
    this.timer = seconds;
    this.state = PomodoroState.WORKING;
    this.updateUsers();
  }

  public initializeInterval() {
    return setInterval(() => {
      console.log(this.state);
      console.log(runningTimerStates);
      console.log(this.state in runningTimerStates);
      if (this.timerRunning()) {
        this.timer--;
        if (this.timer <= 0) this.stopTimer();
      }
    }, 1000);
  }

  public pauseTimer() {
    if (this.timerRunning()) {
      this.state++;
    }
  }

  public unPauseTimer() {
    if (this.timerPaused()) {
      this.state--;
    }
  }

  public stopTimer() {
    this.timer = 0;
    this.state = PomodoroState.DONE;
  }

  private timerRunning() {
    return runningTimerStates.includes(this.state);
  }

  private timerPaused() {
    return pausedTimerStates.includes(this.state);
  }

  public serialize() {
    return {
      timer: this.timer,
      state: this.state,
    };
  }
}
