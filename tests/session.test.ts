import { Session } from "../src/Session"

test('Creating a session object', () => {
  const session = new Session("gutta");
  expect(session.roomId).toBe("gutta")
})
