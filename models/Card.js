class Card {
  constructor(data) {
    this.id = data.id;
    this.type = data.type; // attack - ruins
    this.piece = data.piece;
    this.duration = data.duration;
    this.way = data.way ? data.way : null;
  }

  getDuration() {
    return this.duration;
  }

  getType() {
    return this.type;
  }
}

module.exports = Card;
