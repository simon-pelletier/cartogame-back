let Piece = require("./Piece");
let Card = require("./Card");

class Deck {
  constructor() {
    this.container = [];

    //   // cartes ruin
    for (var i = 0; i < 2; i++) {
      this.container.push(new Card({ type: "ruin", duration: 0, piece: null, id:`ruin${i}` }));
    }

    // carte oneCase
    for (var j = 0; j < 1; j++) {
      this.container.push(
        new Card({
          type: "oneCase",
          duration: 0,
          piece: new Piece({ type: "oneCase" }),
          id:`oneCase${j}`
        })
      );
    }

    // carte pieceChoice
    for (var k = 0; k < 4; k++) {
      this.container.push(
        new Card({
          type: "pieceChoice",
          duration: 1,
          piece: new Piece({ type: "pieceChoice" }),
          id:`pieceChoice${k}`
        })
      );
    }

    // // carte landChoice
    for (var l = 0; l < 6; l++) {
      this.container.push(
        new Card({
          type: "landChoice",
          duration: 2,
          piece: new Piece({ type: "landChoice" }),
          id:`landChoice${l}`
        })
      );
    }

    //   // carte fight
    // for (var m = 0; m < 1; m++) {
    //   this.container.push(
    //     new Card({
    //       type: "fight",
    //       duration: 0,
    //       piece: new Piece({ type: "fight" }),
    //       way: this.randomIntFromInterval(0, 1),
    //     })
    //   );
    // }

    this.shuffleDeck(this.container);
  }

  addFightCard() {
    this.container.push(
      new Card({
        type: "fight",
        duration: 0,
        piece: new Piece({ type: "fight" }),
        way: this.randomIntFromInterval(0, 1),
        id:`fight${this.randomIntFromInterval(1000,9999)}`
      })
    );
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getCards() {
    return this.container;
  }

  shuffleDeck() {
    for (let i = this.container.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.container[i], this.container[j]] = [
        this.container[j],
        this.container[i],
      ];
    }
    // return a;
  }

  addCardInDeck() {}

  removeCardFromDeck() {}

  getCardById(id) {
    if (this.container[id]) {
      return this.container[id];
    } else {
      return false;
    }
  }
}

module.exports = Deck;
