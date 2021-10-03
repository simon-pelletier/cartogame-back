let landsByType = {
  oneCase: [["forest", "house", "field", "lake", "monster"]],
  pieceChoice: [["forest"], ["house"], ["field"], ["lake"]],
  landChoice: [
    ["forest", "house"],
    ["forest", "field"],
    ["forest", "lake"],
    ["house", "field"],
    ["house", "lake"],
    ["field", "lake"],
  ],
  fight: [["monster"]],
};

let shapesByType = {
  oneCase: [[[[0, 0]]]],
  fight: [
    [
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [0, 1],
        [2, 1],
      ],
    ],
    [
      [
        [0, 0],
        [1, 0],
        [0, 2],
        [1, 2],
      ],
    ],
    [
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    ],
    [
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [1, 1],
      ],
    ],
  ],
  pieceChoice: [
    [
      [
        [0, 0],
        [1, 0],
        [1, 1],
      ],
      [
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
        [0, 2],
      ],
    ],
    [
      [
        [0, 0],
        [1, 0],
      ],
      [
        [1, 0],
        [0, 1],
        [1, 1],
        [2, 1],
        [1, 2],
      ],
    ],
    [
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [2, 0],
        [1, 1],
        [2, 1],
        [0, 2],
        [1, 2],
      ],
    ],
    [
      [
        [0, 0],
        [1, 1],
      ],
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 2],
      ],
    ],
  ],
  landChoice: [
    [
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [1, 1],
        [1, 2],
      ],
    ],
    [
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [1, 1],
      ],
    ],
    [
      [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 2],
        [1, 3],
      ],
    ],
    [
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 2],
      ],
    ],
    [
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ],
    ],
    [
      [
        [0, 0],
        [1, 0],
        [2, 0],
        [0, 1],
        [0, 2],
      ],
    ],
  ],
};

class Piece {
  //* Ajouter un côté RANDOM à la génération de carte
  constructor(data) {
    this.availableLands =
      landsByType[data.type][
        this.randomIntFromInterval(0, landsByType[data.type].length - 1)
      ];
    this.shapes =
      shapesByType[data.type][
        this.randomIntFromInterval(0, shapesByType[data.type].length - 1)
      ];
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

module.exports = Piece;
