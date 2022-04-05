import { Session } from "./Session";

// Singleton

export class SessionManager {
  private static instance: SessionManager;

  private sessions: { [id: string]: Session } = {};

  private constructor() {}

  public getSession(id: string): Session {
    if (!this.sessions[id]) {
      console.log("Creating new session, ID: " + id)
      this.sessions[id] = new Session(id);
    }
    return this.sessions[id];
  }

  public existsSession(id: string): boolean {
    return this.sessions[id] !== undefined;
  }

  public deleteSession(id: string): void {
    delete this.sessions[id];
  }

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }

    return SessionManager.instance;
  }
}
