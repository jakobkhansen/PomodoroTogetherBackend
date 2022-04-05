import { ServerManager } from "./ServerManager";
import { SessionManager } from "./SessionManager";

const sessionManager = SessionManager.getInstance();

const serverManager = ServerManager.getInstance()

const io = serverManager.io;
const httpServer = serverManager.httpServer


io.on('connection', (socket): void => {
  console.log("User connected")
  socket.on('session join', (id, displayName) => {

    console.log(displayName + " connecting to session: " + id)

    const session = sessionManager.getSession(id)

    session.joinSession(socket, displayName)
    session.listenForEvents(socket)
    session.updateUsers()
  })
});

httpServer.listen(process.env.PORT || 5000);
