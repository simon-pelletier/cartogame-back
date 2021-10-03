const helper = require("../helper");
let mapGame = [
  [
    { land: "empty", position: "0:0" },
    { land: "empty", position: "0:1" },
    { land: "empty", position: "0:2" },
    { land: "empty", position: "0:3" },
    { land: "empty", position: "0:4" },
    { land: "empty", position: "0:5" },
    { land: "empty", position: "0:6" },
    { land: "empty", position: "0:7" },
    { land: "empty", position: "0:8" },
    { land: "empty", position: "0:9" },
    { land: "empty", position: "0:10" },
  ],
  [
    { land: "mountain", position: "1:0" },
    { land: "mountain", position: "1:1" },
    { land: "empty", position: "1:2" },
    { land: "empty", position: "1:3" },
    { land: "desert", position: "1:4" },
    { land: "empty", position: "1:5" },
    { land: "ruin", position: "1:6" },
    { land: "forest", position: "1:7", locked: true },
    { land: "empty", position: "1:8" },
    { land: "empty", position: "1:9" },
    { land: "empty", position: "1:10" },
  ],
  [
    { land: "empty", position: "2:0" },
    { land: "desert", position: "2:1" },
    { land: "empty", position: "2:2" },
    { land: "mountain", position: "2:3" },
    { land: "empty", position: "2:4" },
    { land: "empty", position: "2:5" },
    { land: "house", position: "2:6" },
    { land: "house", position: "2:7" },
    { land: "ruin", position: "2:8" },
    { land: "lake", position: "2:9", locked: true },
    { land: "empty", position: "2:10" },
  ],
  [
    { land: "desert", position: "3:0" },
    { land: "empty", position: "3:1" },
    { land: "empty", position: "3:2" },
    { land: "empty", position: "3:3" },
    { land: "empty", position: "3:4" },
    { land: "empty", position: "3:5" },
    { land: "empty", position: "3:6" },
    { land: "empty", position: "3:7" },
    { land: "empty", position: "3:8" },
    { land: "empty", position: "3:9" },
    { land: "empty", position: "3:10" },
  ],
  [
    { land: "empty", position: "4:0" },
    { land: "empty", position: "4:1" },
    { land: "empty", position: "4:2" },
    { land: "house", position: "4:3" },
    { land: "house", position: "4:4" },
    { land: "empty", position: "4:5" },
    { land: "empty", position: "4:6" },
    { land: "desert", position: "4:7" },
    { land: "empty", position: "4:8" },
    { land: "empty", position: "4:9" },
    { land: "empty", position: "4:10" },
  ],
  [
    { land: "empty", position: "5:0" },
    { land: "empty", position: "5:1" },
    { land: "empty", position: "5:2" },
    { land: "house", position: "5:3" },
    { land: "house", position: "5:4" },
    { land: "house", position: "5:5" },
    { land: "ruin", position: "5:6" },
    { land: "empty", position: "5:7" },
    { land: "empty", position: "5:8" },
    { land: "empty", position: "5:9" },
    { land: "empty", position: "5:10" },
  ],
  [
    { land: "desert", position: "6:0" },
    { land: "ruin", position: "6:1" },
    { land: "empty", position: "6:2" },
    { land: "empty", position: "6:3" },
    { land: "ruin", position: "6:4" },
    { land: "mountain", position: "6:5" },
    { land: "desert", position: "6:6" },
    { land: "empty", position: "6:7" },
    { land: "empty", position: "6:8" },
    { land: "empty", position: "6:9" },
    { land: "ruin", position: "6:10" },
  ],
  [
    { land: "desert", position: "7:0" },
    { land: "empty", position: "7:1" },
    { land: "mountain", position: "7:2" },
    { land: "mountain", position: "7:3" },
    { land: "ruin", position: "7:4" },
    { land: "empty", position: "7:5" },
    { land: "empty", position: "7:6" },
    { land: "empty", position: "7:7" },
    { land: "mountain", position: "7:8" },
    { land: "empty", position: "7:9" },
    { land: "empty", position: "7:10" },
  ],
  [
    { land: "empty", position: "8:0" },
    { land: "empty", position: "8:1" },
    { land: "ruin", position: "8:2" },
    { land: "empty", position: "8:3" },
    { land: "empty", position: "8:4" },
    { land: "ruin", position: "8:5" },
    { land: "empty", position: "8:6" },
    { land: "desert", position: "8:7" },
    { land: "empty", position: "8:8" },
    { land: "empty", position: "8:9" },
    { land: "desert", position: "8:10" },
  ],
  [
    { land: "empty", position: "9:0" },
    { land: "house", position: "9:1" },
    { land: "empty", position: "9:2" },
    { land: "house", position: "9:3" },
    { land: "empty", position: "9:4" },
    { land: "empty", position: "9:5" },
    { land: "mountain", position: "9:6" },
    { land: "empty", position: "9:7" },
    { land: "house", position: "9:8" },
    { land: "house", position: "9:9" },
    { land: "empty", position: "9:10" },
  ],
  [
    { land: "mountain", position: "10:0" },
    { land: "empty", position: "10:1" },
    { land: "empty", position: "10:2" },
    { land: "empty", position: "10:3" },
    { land: "empty", position: "10:4" },
    { land: "empty", position: "10:5" },
    { land: "ruin", position: "10:6" },
    { land: "desert", position: "10:7" },
    { land: "empty", position: "10:8" },
    { land: "mountain", position: "10:9" },
    { land: "empty", position: "10:10" },
  ],
];
//! DE PARTOUT ICI IL VA FALLOIR GERER LES RUINES !!!

const goalsDeck = [
  [
    //! LAKE & FIELD

    {
      title: "Vallée des mages",
      rules: [
        {
          description:
            "Gagnez deux étoiles de réputation pour chaque case lac adjacente à une case montagne.",
          points: 2,
          countScore: (gameMap) => {
            let score = 0;

            gameMap.forEach((column) => {
              column.forEach((tile) => {
                if (tile.land === "lake") {
                  let isAdjacentToOnMapMountain = helper.isAdjacentToOnMap(
                    tile,
                    "mountain",
                    gameMap
                  );
                  if (isAdjacentToOnMapMountain) {
                    score += 1;
                  }
                }
              });
            });
            return score;
          },
        },
        {
          description:
            "Gagnez une étoile de réputation pour chaque case ferme adjacente à une case montagne.",
          points: 1,
          countScore: (gameMap) => {
            let score = 0;

            gameMap.forEach((column) => {
              column.forEach((tile) => {
                if (tile.land === "field") {
                  let isAdjacentToOnMapMountain = helper.isAdjacentToOnMap(
                    tile,
                    "mountain",
                    gameMap
                  );
                  if (isAdjacentToOnMapMountain) {
                    score += 1;
                  }
                }
              });
            });
            return score;
          },
        },
      ],
    },
    {
      title: "Canaux d'irrigation",
      rules: [
        {
          description:
            "Gagnez une étoile de réputation pour chaque case lac adjacente à au moins une ferme.",
          points: 1,
          countScore: (gameMap) => {
            let score = 0;

            gameMap.forEach((column) => {
              column.forEach((tile) => {
                if (tile.land === "lake") {
                  let isAdjacentToOnMapField = helper.isAdjacentToOnMap(
                    tile,
                    "field",
                    gameMap
                  );
                  if (isAdjacentToOnMapField) {
                    score += 1;
                  }
                }
              });
            });
            return score;
          },
        },
        {
          description:
            "Gagnez une étoile de réputation pour chaque case ferme adjacente à au moins une case lac.",
          points: 1,
          countScore: (gameMap) => {
            let score = 0;

            gameMap.forEach((column) => {
              column.forEach((tile) => {
                if (tile.land === "field") {
                  let isAdjacentToOnMapLake = helper.isAdjacentToOnMap(
                    tile,
                    "lake",
                    gameMap
                  );
                  if (isAdjacentToOnMapLake) {
                    score += 1;
                  }
                }
              });
            });
            return score;
          },
        },
      ],
    },
  ],
  [
    //! FOREST

    {
      title: "Arbres-Vigies",
      rules: [
        {
          description:
            "Gagnez une étoile de réputation pour chaque pour chaque forêt entourée sur ses quatre côtés par des cases remplies ou par le bord du parchemin",
          points: 1,
          countScore: (gameMap) => {
            let score = 0;

            gameMap.forEach((column) => {
              column.forEach((tile) => {
                if (tile.land === "forest") {
                  let isSurroundedByEverything = helper.isSurroundedByEverything(
                    tile,
                    gameMap
                  );
                  if (isSurroundedByEverything) {
                    score += 1;
                  }
                }
              });
            });
            return score;
          },
        },
      ],
    },
    {
      title: "Bois de la sentinelle",
      rules: [
        {
          description:
            "Gagnez une étoile de réputation pour chaque case forêt adjacente au bord du parchemin.",
          points: 1,
          countScore: (gameMap) => {
            let score = 0;

            gameMap.forEach((column) => {
              column.forEach((tile) => {
                if (tile.land === "forest") {
                  let tilePosition = tile.position.split(":");
                  let tileY = parseInt(tilePosition[0]);
                  let tileX = parseInt(tilePosition[1]);

                  if (
                    tileY === 0 ||
                    tileY === gameMap.length - 1 ||
                    tileX === 0 ||
                    tileX === gameMap.length - 1
                  ) {
                    score++;
                  }
                }
              });
            });
            return score;
          },
        },
      ],
    },
    {
      title: "Chemin verdoyant",
      rules: [
        {
          description:
            "Gagnez une étoile de réputation pour chaque ligne ou colonne ayant au moins une case forêt. La même case forêt peut être décomptée à la fois pour une ligne et pour une colonne.",
          points: 1,
          countScore: (gameMap) => {
            let columnHaveForestCount = 0;
            for (var i = 0; i < gameMap.length; i++) {
              let haveForest = false;
              gameMap[i].forEach((tile) => {
                if (tile.land === "forest") {
                  haveForest = true;
                }
              });
              if (haveForest) {
                columnHaveForestCount++;
              }
            }

            let rowHaveForest = 0;
            for (var j = 0; j < gameMap.length; j++) {
              let haveForest = false;
              for (var k = 0; k < gameMap.length; k++) {
                if (gameMap[k][j] === "forest") {
                  haveForest = true;
                }
              }
              if (haveForest) {
                rowHaveForest++;
              }
            }

            let score = columnHaveForestCount + rowHaveForest;

            return score;
          },
        },
      ],
    },
  ],
  [
    //! DISTANCE

    {
      title: "Chaudrons",
      rules: [
        {
          description:
            "Gagnez une étoile de réputation pour chaque case vierge entourée de ses quatre côtés par des cases remplies ou par le bord du parchemin.",
          points: 1,
          countScore: (gameMap) => {
            let score = 0;

            gameMap.forEach((column) => {
              column.forEach((tile) => {
                if (tile.land === "empty") {
                  let isSurroundedByEverything = helper.isSurroundedByEverything(
                    tile,
                    gameMap
                  );
                  if (isSurroundedByEverything) {
                    score += 1;
                  }
                }
              });
            });
            return score;
          },
        },
      ],
    },
    {
      title: "Frontières",
      rules: [
        {
          description:
            "Gagnez six étoiles de réputation pour chaque ligne complète et chaque colonne complète de cases remplies.",
          points: 6,
          countScore: (gameMap) => {
            let filledColumnsCount = 0;
            for (var i = 0; i < gameMap.length; i++) {
              let fullColumn = true;
              gameMap[i].forEach((tile) => {
                if (tile.land === "empty") {
                  fullColumn = false;
                }
              });
              if (fullColumn) {
                filledColumnsCount++;
              }
            }

            let filledRowsCount = 0;
            for (var j = 0; j < gameMap.length; j++) {
              let fullRow = true;
              for (var k = 0; k < gameMap.length; k++) {
                if (gameMap[k][j].land === "empty") {
                  fullRow = false;
                }
              }
              if (fullRow) {
                filledRowsCount++;
              }
            }

            let score = filledColumnsCount + filledRowsCount;
            return score;
          },
        },
      ],
    },
    {
      title: "Route brisée",
      rules: [
        {
          description:
            "Gagnez trois étoiles de réputaion pour chaque ligne diagonale de cases remplies qui touchent le bord gauche et le bord inférieur du parchemin.",
          points: 3,
          countScore: (gameMap) => {
            let score = 0;

            for (var i = 0; i < gameMap.length; i++) {
              let diagonalHaveEmpty = false;

              let leftTile = gameMap[0][i];
              if (leftTile.land !== "empty") {
                let stopped = false;
                for (var j = 1; stopped === false; j++) {
                  if (gameMap[0 + j] && gameMap[0 + j][i + j]) {
                    if (gameMap[0 + j][i + j] === "empty") {
                      diagonalHaveEmpty = true;
                      stopped = true;
                    }
                  } else {
                    stopped = true;
                  }
                }
              } else {
                diagonalHaveEmpty = true;
              }
              if (!diagonalHaveEmpty) {
                score++;
              }
            }

            return score;
          },
        },
      ],
    },
  ],
  [
    //   //! HOUSES (zones)

    {
      title: "Places fortes",
      rules: [
        {
          description:
            "Gagnez huit étoiles de réputation pour chaque région de six maisons ou plus.",
          points: 8,
          countScore: (gameMap) => {
            let score = 0;

            let areasArray = [];
            let housesArray = [];

            gameMap.forEach((column) => {
              column.forEach((tile) => {
                if (tile.land === "house") {
                  housesArray.push(tile);
                }
              });
            });

            do {
              let newArea = [housesArray.shift()];
              function findNextAdjacent() {
                let findedOneAdjacentTile = false;
                for (var h = 0; h < newArea.length; h++) {
                  let tileToRemoveIndex = null;
                  for (var i = 0; i < housesArray.length; i++) {
                    let tileIsAdjacentTo = helper.isAdjacentTo(
                      newArea[h],
                      housesArray[i]
                    );
                    if (tileIsAdjacentTo) {
                      tileToRemoveIndex = i;
                      newArea.push(housesArray[i]);
                      findedOneAdjacentTile = true;
                      break;
                    }
                  }
                  if (tileToRemoveIndex !== null) {
                    housesArray.splice(tileToRemoveIndex, 1);
                    break;
                  }
                }
                if (findedOneAdjacentTile) {
                  findNextAdjacent();
                }
              }
              findNextAdjacent();
              areasArray.push(newArea);
            } while (housesArray.length > 0);

            areasArray.forEach((area) => {
              if (area.length >= 6) {
                score++;
              }
            });
            return score;
          },
        },
      ],
    },

    {
      title: "Remparts",
      rules: [
        {
          description:
            "Gagnez deux étoiles de réputation pour chaque case maison dans la deuxième plus grande région de maisons.",
          points: 2,
          countScore: (gameMap) => {
            let score = 0;

            let areasArray = [];
            let housesArray = [];

            gameMap.forEach((column) => {
              column.forEach((tile) => {
                if (tile.land === "house") {
                  housesArray.push(tile);
                }
              });
            });

            do {
              let newArea = [housesArray.shift()];
              function findNextAdjacent() {
                let findedOneAdjacentTile = false;
                for (var h = 0; h < newArea.length; h++) {
                  let tileToRemoveIndex = null;
                  for (var i = 0; i < housesArray.length; i++) {
                    let tileIsAdjacentTo = helper.isAdjacentTo(
                      newArea[h],
                      housesArray[i]
                    );
                    if (tileIsAdjacentTo) {
                      tileToRemoveIndex = i;
                      newArea.push(housesArray[i]);
                      findedOneAdjacentTile = true;
                      break;
                    }
                  }
                  if (tileToRemoveIndex !== null) {
                    housesArray.splice(tileToRemoveIndex, 1);
                    break;
                  }
                }
                if (findedOneAdjacentTile) {
                  findNextAdjacent();
                }
              }
              findNextAdjacent();
              areasArray.push(newArea);
            } while (housesArray.length > 0);

            if (areasArray.length >= 2) {
              areasArray.sort(function (a, b) {
                return b.length - a.length;
              });
              areasArray[1].forEach((house) => {
                score++;
              });
            }

            return score;
          },
        },
      ],
    },
  ],
];

// //! TESTS !
// let result = goalsDeck[3][1].rules[0].countScore(mapGame);
// console.log("result", result);

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Goal {
  constructor(typeId) {
    let pickedGoalCard =
      goalsDeck[typeId][randomIntFromInterval(0, goalsDeck[typeId].length - 1)];
    this.title = pickedGoalCard.title;
    this.rules = pickedGoalCard.rules;
  }

  getTitle() {
    return this.title;
  }

  getRules() {
    return this.rules;
  }

  countGoalScore(gameMap) {
    let points = 0;
    this.rules.forEach((rule) => {
      let ruleScore = rule.countScore(gameMap);
      let rulePoints = rule.points * ruleScore;
      points += rulePoints;
    });
    return points;
  }
}

module.exports = Goal;
