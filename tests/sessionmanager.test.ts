import { SessionManager } from "../src/SessionManager"

test("Create and get SessionManager Singleton", () => {
  const manager = SessionManager.getInstance()
  const sameManager = SessionManager.getInstance();
  expect(manager).toBe(sameManager)
  expect(manager)
})
