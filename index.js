require("dotenv").config({ path: ".env" });
const port = process.env.PORT || 3001;
const log = require("./logger");

let GameMaster = require("./models/GameMaster");

let server = require("http").createServer();

let io = require("socket.io")(server, {
  path: "/",
  pingInterval: 10000,
  pingTimeout: 5000,
  cors: {
    // origin: `http://${process.env.CLIENT_DOMAIN}:${process.env.CLIENT_PORT}`,
    origin: '*',
    credentials: true,
  },
});

server.listen(port, () => {
  log.listen(port);
    new GameMaster(io, log);
});
