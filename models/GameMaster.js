const helper = require("../helper");

let Room = require("./Room");
let Player = require("./Player");

let test = new Room("TEST ROOM");
// console.log("test", test.deck);
test.deck.container.forEach((card) => {
  console.log('---', card.piece)
})

class GameMaster {
  constructor(io, log) {
    this.io = io;
    this.log = log;

    this.rooms = [];
    this.players = [];
    this.authPlayerArray = [];

    this.awake();
  }

  //! supprimer les Rooms ou il n'y a plus persone depuis x temps...

  awake() {
    const self = this;
    this.log.success("Game Master is awake !");

    this.io.on("connection", function (socket) {
      if (!socket.handshake.headers.uuid) {
        self.log.error("No uuid - Rejected connection");
      }

      let existingPlayer = self.playerAlreadyExist(
        socket.handshake.headers.uuid,
        socket.id
      );

      if (existingPlayer) {
        self.log.success("Know player connected");
      } else {
        let player = new Player(socket);
        player.setConnected(true);

        self.players.push(player);
        self.authPlayerArray.push({
          uuid: socket.handshake.headers.uuid,
          socketId: socket.id,
        });

        self.emitPlayerState(player);
        self.log.success("New Player connected");
      }

      let playerConnected = self.getCurrentPlayer(socket);
      let playerRoomId = playerConnected.getRoomId();
      socket.join(playerRoomId);

      self.emitRoomState(playerRoomId, playerConnected);
      self.emitPlayerState(playerConnected);
      self.emitLobbyState();

      socket.on("loginSubmit", (pseudo) => {
        if (pseudo && pseudo !== "") {
          let loggedPlayer = self.getCurrentPlayer(socket);
          loggedPlayer.setPseudo(pseudo);
          loggedPlayer.setLoggedIn(true);
          loggedPlayer.setPlace("lobby");
          socket.emit("loginReturn", { success: true });
          self.log.success("Login with pseudo success");
          self.emitLobbyState();
          self.emitPlayerState(loggedPlayer);
        } else {
          self.log.error("No pseudo - Rejected login");
          socket.emit("loginReturn", { success: false });
        }
      });

      socket.on("logout", () => {
        let loggedPlayer = self.getCurrentPlayer(socket);
        loggedPlayer.setPseudo(null);
        loggedPlayer.setLoggedIn(false);
        loggedPlayer.setPlace("home");
        self.emitLobbyState();
        self.emitPlayerState(loggedPlayer);
      });
      //test

      socket.on("askUpdate", () => {
        let loggedPlayer = self.getCurrentPlayer(socket);

        let playerRoomId = loggedPlayer.getRoomId();
        if (playerRoomId) {
          socket.join(playerRoomId);
          self.emitRoomState(playerRoomId, loggedPlayer);
        }

        self.emitLobbyState();
        self.emitPlayerState(loggedPlayer);
      });

      socket.on("newRoom", (roomName) => {
        let roomNameAlreadyExist = self.roomNameAlreadyExist(roomName);
        if (roomNameAlreadyExist && roomName !== "") {
          self.log.error("Room name already exists - Rejected room creation");
          socket.emit("newRoomReturn", {
            success: false,
            msg: "Room name already exists !",
          });
        } else {
          let loggedPlayer = self.getCurrentPlayer(socket);
          let newRoom = new Room(roomName);
          let roomId = newRoom.getId();
          loggedPlayer.setPlace("room");
          loggedPlayer.setRoomName(roomName);
          loggedPlayer.setRoomId(roomId);
          newRoom.addPlayer(loggedPlayer);
          socket.join(roomId);
          self.rooms.push(newRoom);
          socket.emit("newRoomReturn", { success: true });
          self.emitLobbyState();
          self.emitRoomState(roomId, loggedPlayer);
          self.emitPlayerState(loggedPlayer);
        }
      });

      socket.on("joinRoom", (roomId, roomName) => {
        let existingRoom = self.roomNameAlreadyExist(roomName);
        if (!existingRoom) {
          self.log.error("Room doen't exist - Rejected room creation");
          socket.emit("joinRoomReturn", {
            success: false,
            msg: "Room doen't exist",
          });
        } else {
          let loggedPlayer = self.getCurrentPlayer(socket);
          let room = self.getRoomById(roomId);
          let currentRoomId = room.getId();
          loggedPlayer.setRoomName(room.getName());
          loggedPlayer.setRoomId(currentRoomId);
          loggedPlayer.setPlace("room");
          room.addPlayer(loggedPlayer);
          socket.join(currentRoomId);
          socket.emit("joinRoomReturn", { success: true });
          self.emitLobbyState();
          self.emitRoomState(currentRoomId, loggedPlayer);
          self.emitPlayerState(loggedPlayer);
        }
      });

      socket.on("leaveRoom", () => {
        let loggedPlayer = self.getCurrentPlayer(socket);
        let currentRoomId = loggedPlayer.getRoomId();
        loggedPlayer.setRoomName(null);
        loggedPlayer.resetPlayerGame();
        loggedPlayer.setPlace("lobby");
        loggedPlayer.setRoomReady(false);
        let room = self.getRoomById(currentRoomId);
        room.removePlayer(loggedPlayer);
        let roomId = room.getId();
        self.removeEmptyRooms();
        self.emitLobbyState();
        self.emitRoomState(roomId, loggedPlayer);
        self.emitPlayerState(loggedPlayer);
        socket.leave(roomId);
      });

      socket.on("leaveGame", () => {
        let loggedPlayer = self.getCurrentPlayer(socket);
        let currentRoomId = loggedPlayer.getRoomId();

        loggedPlayer.setRoomName(null);
        loggedPlayer.resetPlayerGame();
        loggedPlayer.setPlace("lobby");
        loggedPlayer.setRoomReady(false);
        loggedPlayer.setInGame(false);
        loggedPlayer.setGameMap(null);
        loggedPlayer.setRoundReady(false);
        loggedPlayer.setRoomId(null);

        let room = self.getRoomById(currentRoomId);
        room.removePlayer(loggedPlayer);

        let roomId = room.getId();
        self.removeEmptyRooms();
        self.emitLobbyState();
        self.emitRoomState(roomId, loggedPlayer);
        self.emitPlayerState(loggedPlayer);

        socket.leave(roomId);
      });

      socket.on("roomReady", (bool) => {
        let loggedPlayer = self.getCurrentPlayer(socket);
        loggedPlayer.setRoomReady(bool);
        loggedPlayer.setPlace("game");
        let room = self.getRoomById(loggedPlayer.getRoomId());
        let roomId = room.getId();
        let isRoomReady = room.isRoomReady();
        if (isRoomReady) {
          room.setLocked();
          self.createGame(room, loggedPlayer);
          self.log.success("Game Started !");
          self.io.to(`${roomId}`).emit("startGame");
        }
        self.emitLobbyState();
        self.emitRoomState(roomId, loggedPlayer);
        self.emitPlayerState(loggedPlayer);
      });

      socket.on("roundPlayed", (playerChoice) => {
        console.log("playerChoice", playerChoice);

        let currentPlayer = self.getCurrentPlayer(socket);
        currentPlayer.setRoundReady(true);
        let room = self.getRoomById(currentPlayer.getRoomId());

        if (playerChoice === "ruin") {
        } else {
          let tempMap = JSON.parse(JSON.stringify(currentPlayer.getGameMap()));

          for (var i = 0; i < tempMap.length; i++) {
            for (var j = 0; j < tempMap.length; j++) {
              playerChoice.shape.forEach((coords) => {
                let splittedCoords = coords.split(":");
                if (
                  parseInt(splittedCoords[0]) === i &&
                  parseInt(splittedCoords[1]) === j
                ) {
                  tempMap[i][j].land = playerChoice.land;
                  tempMap[i][j].locked = true;
                }
              });
            }
          }

          tempMap.forEach((column) => {
            column.forEach((tile) => {
              if (tile.land === "mountain" && tile.money === true) {
                let isSurroundedByEverything = helper.isSurroundedByEverything(
                  tile,
                  tempMap
                );
                if (isSurroundedByEverything) {
                  tile.money = false;
                  currentPlayer.addMoney(1);
                }
              }
            });
          });

          if (playerChoice.indexPiece !== undefined) {
            if (playerChoice.indexPiece === 0) {
              currentPlayer.addMoney(1);
            }
          }

          currentPlayer.setGameMap(tempMap);
        }

        let isRoundReady = room.areAllPlayerRoundReady();
        if (isRoundReady) {
          if (room.getGameMod() === "ruin" && playerChoice !== "ruin") {
            room.setGameMod("normal");
          }
          room.nextRound();
        }

        self.emitRoomState(room.getId(), currentPlayer);

        //* updateAllRoomPlayers
        let playersToUpdate = room.getPlayers();
        playersToUpdate.forEach((player) => {
          self.emitPlayerState(player);
        });
      });

      socket.on("disconnect", () => {
        let currentPlayer = self.getCurrentPlayer(socket);

        if (currentPlayer) {
          currentPlayer.setConnected(false);
          let room = self.getRoomById(currentPlayer.getRoomId());
          if (room) {
            self.emitRoomState(room.getId(), currentPlayer);
          }
        }

        self.emitLobbyState();
      });
    });
  }

  createGame(room, currentPlayer) {
    let mapGenerated = helper.generateMap(11);
    room.setGameMap(mapGenerated);
    room.setAllPlayerGameMap(mapGenerated, this.emitPlayerState.bind(this));
    room.setAllPlayerInGame(true);

    let roomIdToCreateGame = room.getId();

    this.emitLobbyState();
    this.emitRoomState(roomIdToCreateGame, currentPlayer);
  }

  removeEmptyRooms() {
    let roomsUpdate = this.rooms.filter((room) => room.getPlayers().length > 0);
    this.rooms = roomsUpdate;
  }

  getCurrentPlayer(socket) {
    let playerSocketId = socket.id;
    let currentPlayer = this.players.find(
      (player) => player.getSocketId() === playerSocketId
    );
    return currentPlayer;
  }

  updatePlayerSocketId(oldSocketId, newSocketId) {
    this.players.forEach((player) => {
      if (player.getSocketId() === oldSocketId) {
        player.setSocketId(newSocketId);
        player.setConnected(true);
        this.emitPlayerState(player);
      }
    });
  }

  roomNameAlreadyExist(roomName) {
    let existingRoom = false;
    this.rooms.forEach((room) => {
      if (room.getName() === roomName) {
        existingRoom = true;
      }
    });
    return existingRoom;
  }

  playerAlreadyExist(uuid, socketId) {
    let existingPlayer = false;
    this.authPlayerArray.forEach((authPlayer) => {
      if (authPlayer.uuid === uuid) {
        this.updatePlayerSocketId(authPlayer.socketId, socketId);
        authPlayer.socketId = socketId;
        existingPlayer = true;
      }
    });
    return existingPlayer;
  }

  getRoomById(roomId) {
    let currentRoomIndex = this.rooms.findIndex(
      (room) => room.getId() === roomId
    );
    return this.rooms[currentRoomIndex];
  }

  //* EMIT LOBBY
  emitLobbyState() {
    const self = this;
    this.log.emit("EMIT ON LOBBY");
    let playersForFront = [];
    let roomsForFront = [];
    this.players.forEach((player) => {
      let playerForFront = {
        pseudo: player.getPseudo(),
        loggedIn: player.getLoggedIn(),
        roomName: player.getRoomName(),
        inGame: player.getInGame(),
      };
      playersForFront.push(playerForFront);
    });
    this.rooms.forEach((room) => {
      let roomForFront = {
        id: room.getId(),
        locked: room.getLocked(),
        name: room.getName(),
        players: room.getPlayersForFront(),
      };
      roomsForFront.push(roomForFront);
    });
    this.io.sockets.emit("lobby", {
      rooms: roomsForFront,
      players: playersForFront,
    });

    console.log(this.players)
  }

  //* EMIT ROOM
  emitRoomState(roomId, currentPlayer) {
    const self = this;
    let currentRoom = self.getRoomById(roomId);
    if (!currentRoom) {
      let roomForFront = {};
      this.io.to(`${roomId}`).emit("roomState", roomForFront);
    } else {
      this.log.emit("EMIT ON ROOM : ", roomId);
      let roomForFront = {
        id: currentRoom.getId(),
        name: currentRoom.getName(),
        locked: currentRoom.getLocked(),
        players: currentRoom.getPlayersForFrontRoom(),
        currentCard: currentRoom.getCurrentCard(),
        currentSeason: currentRoom.getCurrentSeason(),
        currentDuration: currentRoom.getCurrentDuration(),
        endGame: currentRoom.getEndGame(),
        seasons: currentRoom.getSeasons(),
        gameMod: currentRoom.getGameMod(),
      };
      this.io.to(`${roomId}`).emit("roomState", roomForFront);
    }
  }

  //* EMIT PLAYER ONLY
  emitPlayerState(player) {
    if (player) {
      this.log.emit("EMIT ON PLAYER ", player.getPseudo());
      let playerForFront = {
        pseudo: player.getPseudo(),
        place: player.getPlace(),
        connected: player.getConnected(),
        loggedIn: player.getLoggedIn(),
        roomName: player.getRoomName(),
        gameMap: player.getGameMap(),
        inGame: player.getInGame(),
        roundReady: player.getRoundReady(),
        score: player.getScore(),
        money: player.getMoney(),
        totalScore: player.getTotalScore(),
      };
      this.io.to(`${player.getSocketId()}`).emit("playerState", playerForFront);
    }
  }
}

module.exports = GameMaster;
