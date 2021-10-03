let Season = require("./Season");
let Deck = require("./Deck");
let Goal = require("./Goal");

const { v4: uuidv4 } = require("uuid");

class Room {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
    this.players = [];
    this.locked = false;
    this.gameMap = null;
    this.endGame = false;

    this.deck = new Deck();

    this.currentCardId = 0;
    this.currentCard = this.deck.getCardById(this.currentCardId);
    this.currentDuration = 0;

    this.goals = [new Goal(0), new Goal(1), new Goal(2), new Goal(3)];

    this.seasons = [
      new Season({
        id: 0,
        name: "Printemps",
        duration: 8,
        goals: [this.goals[0], this.goals[1]],
      }),
      new Season({
        id: 1,
        name: "Eté",
        duration: 8,
        goals: [this.goals[1], this.goals[2]],
      }),
      new Season({
        id: 2,
        name: "Automne",
        duration: 7,
        goals: [this.goals[2], this.goals[3]],
      }),
      new Season({
        id: 3,
        name: "Hiver",
        duration: 6,
        goals: [this.goals[3], this.goals[0]],
      }),
    ];

    let mod = this.currentCard.getType();
    if (mod === "ruin") {
      this.gameMod = "ruin";
    } else {
      this.gameMod = "normal";
    }

    this.currentSeasonId = 0;
  }

  getSeasons() {
    return this.seasons;
  }

  nextRound() {
    this.currentDuration += this.currentCard.getDuration();
    if (
      this.currentDuration >= this.seasons[this.currentSeasonId].getDuration()
    ) {
      this.players.forEach((player) => {
        let score = 0;
        let playerGameMap = [...player.getGameMap()];
        let currentGoals = this.seasons[this.currentSeasonId].getGoals();
        currentGoals.forEach((goal) => {
          score += goal.countGoalScore(playerGameMap);
        });
        player.addScore(this.currentSeasonId, score);
      });

      if (this.currentSeasonId >= 3) {
        this.endGame = true;
        this.players.forEach((player) => {
          player.countTotalScore();
        });
      } else {
        this.deck.addFightCard();
        this.deck.shuffleDeck();
        this.setAllPlayerNotRoundReady();
        this.currentSeasonId += 1;
        this.currentDuration = 0;
        this.pickACard();
      }
    } else {
      this.setAllPlayerNotRoundReady();
      this.pickACard();
    }
  }

  pickACard() {
    // * Désactive les gameMod à la pioche d'une nouvelle carte
    // if (this.gameMod === "ruin" || this.gameMod === "fight") {
    //   this.gameMod = "normal";
    // }

    //! GERER LE CAS D'UNE CARD DE FIGHT => Suppression de la card ! => Round spécial !
    //* Si la carte est 'fight' avtiver le fightMod
    // this.gameMod = 'fight'
    //* Passer les cartes de chaque joueurs à celui d'avant ou d'après
    //* Validation du round > récupération des maps.
    //* désactivation du fightMod
    // this.gameMod = 'normal'

    //! GERER LE CAS D'UNE CARD RUIN => Mode Build On Ruins !
    //* Si la carte est 'ruin' -> activation du ruinMod
    // this.gameMod = 'ruin'
    //* Pick a card again withRuinMod
    //* désactiver le ruinMod
    // this.gameMod = 'normal'

    this.currentCardId++;
    if (this.deck.getCardById(this.currentCardId)) {
      this.currentCard = this.deck.getCardById(this.currentCardId);
    } else {
      this.currentCardId = 0;
      this.deck.shuffleDeck();
      this.currentCard = this.deck.getCardById(this.currentCardId);
    }

    let mod = this.currentCard.getType();
    if (mod === "ruin") {
      this.gameMod = "ruin";
    }
  }

  getEndGame() {
    return this.endGame;
  }

  getCurrentDuration() {
    return this.currentDuration;
  }

  getCurrentCard() {
    return this.currentCard;
  }

  getCurrentSeason() {
    return this.seasons[this.currentSeasonId];
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getPlayers() {
    return this.players;
  }

  getLocked() {
    return this.locked;
  }

  setName(name) {
    this.name = name;
  }

  setLocked() {
    this.locked = true;
  }

  setGameMap(gameMap) {
    this.gameMap = gameMap;
  }

  setAllPlayerGameMap(gameMap, callbackEmit) {
    this.players.forEach((player) => {
      player.setGameMap(gameMap);
      callbackEmit(player);
    });
  }

  setAllPlayerInGame(bool) {
    this.players.forEach((player) => {
      player.setInGame(bool);
    });
  }

  setAllPlayerNotRoundReady() {
    this.players.forEach((player) => {
      player.setRoundReady(false);
    });
  }

  areAllPlayerRoundReady() {
    let ready = true;
    this.players.forEach((player) => {
      if (!player.getRoundReady()) {
        ready = false;
      }
    });
    return ready;
  }

  isRoomReady() {
    let result = true;

    this.players.forEach((player) => {
      if (!player.getRoomReady()) {
        result = false;
      }
    });

    if (result) {
      this.players.forEach((player) => {
        player.resetPlayerGame();
      });
    }

    return result;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removePlayer(playerToRemove) {
    let playersUpdate = this.players.filter(
      (player) => player.getSocketId() !== playerToRemove.getSocketId()
    );
    this.players = playersUpdate;
  }

  getPlayersForFront() {
    let playersForFront = [];
    this.players.forEach((player) => {
      let playerForFront = {
        pseudo: player.getPseudo(),
      };
      playersForFront.push(playerForFront);
    });
    return playersForFront;
  }

  getPlayersForFrontRoom() {
    let playersForFront = [];
    this.players.forEach((player) => {
      let playerForFront = {
        pseudo: player.getPseudo(),
        connected: player.getConnected(),
        roomReady: player.getRoomReady(),
        roundReady: player.getRoundReady(),
        gameMap: player.getGameMap(),
        score: player.getScore(),
        money: player.getMoney(),
        totalScore: player.getTotalScore(),
      };
      playersForFront.push(playerForFront);
    });
    return playersForFront;
  }

  getGameMod() {
    return this.gameMod;
  }

  setGameMod(gameMod) {
    this.gameMod = gameMod;
  }
}

module.exports = Room;
