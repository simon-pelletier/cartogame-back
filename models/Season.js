class Season {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.duration = data.duration;
    this.goals = data.goals;
  }

  getDuration() {
    return this.duration;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getGoals() {
    return this.goals;
  }
}

module.exports = Season;
