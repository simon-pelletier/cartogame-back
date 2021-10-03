class Player {
  constructor(socket) {
    this.socketId = socket.id;
    this.connected = false;
    this.loggedIn = false;
    this.pseudo = null;
    this.place = "home"; // home - lobby - room - game
    this.roomName = null;
    this.roomId = null;
    this.roomReady = false;
    this.gameMap = null;
    this.inGame = false;
    this.roundReady = false;
    this.money = 0;
    this.score = [0, 0, 0, 0];
    this.totalScore = 0;
  }

  resetPlayerGame() {
    this.money = 0;
    this.score = [0, 0, 0, 0];
  }

  countTotalScore() {
    let totalScore = 0;
    this.score.forEach((score) => {
      totalScore += score;
    });
    this.totalScore = totalScore;
  }

  getSocketId() {
    return this.socketId;
  }

  getConnected() {
    return this.connected;
  }

  getPseudo() {
    return this.pseudo;
  }

  getPlace() {
    return this.place;
  }

  getLoggedIn() {
    return this.loggedIn;
  }

  getRoomName() {
    return this.roomName;
  }

  getRoomId() {
    return this.roomId;
  }

  getRoomReady() {
    return this.roomReady;
  }

  getGameMap() {
    return this.gameMap;
  }

  getInGame() {
    return this.inGame;
  }

  getRoundReady() {
    return this.roundReady;
  }

  getMoney() {
    return this.money;
  }

  getScore() {
    return this.score;
  }

  getTotalScore() {
    return this.totalScore;
  }

  //* GETTERS
  //* -------
  //* SETTERS

  setSocketId(socketId) {
    this.socketId = socketId;
  }

  setConnected(connected) {
    this.connected = connected;
  }

  setPseudo(pseudo) {
    this.pseudo = pseudo;
  }

  setPlace(place) {
    this.place = place;
  }

  setLoggedIn(bool) {
    this.loggedIn = bool;
  }

  setRoomName(roomName) {
    this.roomName = roomName;
  }

  setRoomId(roomId) {
    this.roomId = roomId;
  }

  setRoomReady(bool) {
    this.roomReady = bool;
  }

  setGameMap(gameMap) {
    this.gameMap = gameMap;
  }

  setInGame(bool) {
    this.inGame = bool;
  }

  setRoundReady(bool) {
    this.roundReady = bool;
  }

  setMoney(money) {
    this.money = money;
  }

  addMoney(moneyToAdd) {
    this.money += moneyToAdd;
  }

  removeMoney(moneyToRemove) {
    this.money -= moneyToRemove;
  }

  addScore(currentSeasonId, score) {
    this.score[currentSeasonId] += score;
  }
}

module.exports = Player;
