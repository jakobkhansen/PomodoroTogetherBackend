export function minutesToSeconds(minutes : number) {
  return minutes*60;
}

export function getDateSeconds() : number {
  return Date.now() / 1000
}
