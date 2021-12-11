enum PomodoroState {
  INITIAL,
  WORKING, // Main timer
  WORK_DONE, // Picking next timer
  BREAK, // Break timer
  BREAK_DONE, // Picking next timer
  PAUSED, // Timer is paused
}

export class PomodoroTimer {
  timer: number = 0
  status: PomodoroState = PomodoroState.INITIAL
}
