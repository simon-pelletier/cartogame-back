let helper = {
  randomIntFromInterval: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  generateMap: (size) => {
    let startContent = [];

    let land = ["mountain", "desert", "ruin"];

    for (let i = 0; i < size; i++) {
      startContent.push([]);
      for (let j = 0; j < size; j++) {
        let landGen =
          helper.randomIntFromInterval(0, 25) > 3
            ? "empty"
            : land[helper.randomIntFromInterval(0, land.length - 1)];

        startContent[i].push({
          land: landGen === "ruin" ? "empty" : landGen,
          position: `${i}:${j}`,
          ruin: landGen === "ruin" ? true : false,
          money: landGen === "mountain" ? true : false,
        });
      }
    }

    return startContent;
  },

  isSurroundedByEverything: (tile, gameMap) => {
    let isSurrounded = true;

    let tilePosition = tile.position.split(":");
    let tileY = parseInt(tilePosition[0]);
    let tileX = parseInt(tilePosition[1]);

    if (gameMap[tileY - 1]) {
      let surroundingTileUp = gameMap[tileY - 1][tileX];
      if (surroundingTileUp.land === "empty") {
        isSurrounded = false;
      }
    }

    if (gameMap[tileY + 1]) {
      let surroundingTileDown = gameMap[tileY + 1][tileX];
      if (surroundingTileDown.land === "empty") {
        isSurrounded = false;
      }
    }

    let surroundingTileLeft = gameMap[tileY][tileX - 1];
    let surroundingTileRight = gameMap[tileY][tileX + 1];

    if (surroundingTileLeft) {
      if (surroundingTileLeft.land === "empty") {
        isSurrounded = false;
      }
    }

    if (surroundingTileRight) {
      if (surroundingTileRight.land === "empty") {
        isSurrounded = false;
      }
    }

    return isSurrounded;
  },

  isAdjacentTo: (tile, target) => {
    let isAdjacent = false;

    let tilePosition = tile.position.split(":");
    let targetPosition = target.position.split(":");
    let tileY = parseInt(tilePosition[0]);
    let tileX = parseInt(tilePosition[1]);
    let targetY = parseInt(targetPosition[0]);
    let targetX = parseInt(targetPosition[1]);

    if (tileY + 1 === targetY && tileX === targetX) {
      isAdjacent = true;
    }

    if (tileY - 1 === targetY && tileX === targetX) {
      isAdjacent = true;
    }

    if (tileX + 1 === targetX && tileY === targetY) {
      isAdjacent = true;
    }

    if (tileX - 1 === targetX && tileY === targetY) {
      isAdjacent = true;
    }

    return isAdjacent;
  },

  isAdjacentToOnMap: (tile, targetLandName, gameMap) => {
    let isAdjacent = false;

    let tilePosition = tile.position.split(":");
    let tileY = parseInt(tilePosition[0]);
    let tileX = parseInt(tilePosition[1]);

    if (tileY - 1 >= 0) {
      if (gameMap[tileY - 1][tileX].land === targetLandName) {
        isAdjacent = true;
      }
    }

    if (tileY + 1 < gameMap.length) {
      if (gameMap[tileY + 1][tileX].land === targetLandName) {
        isAdjacent = true;
      }
    }

    if (tileX - 1 >= 0) {
      if (gameMap[tileY][tileX - 1].land === targetLandName) {
        isAdjacent = true;
      }
    }

    if (tileX + 1 < gameMap.length) {
      if (gameMap[tileY][tileX + 1].land === targetLandName) {
        isAdjacent = true;
      }
    }

    return isAdjacent;
  },

  findAreasBy(gameMap, type) {
    // let positionMinY = 0;
    // let positionMinX = 0;
    // let areas = [];
    // do {
    //   let result = helper.searchArea(positionMinX, positionMinY, gameMap, type);
    //   areas.push(result[0]);
    //   positionMinY = result[1];
    //   positionMinX = result[2];
    // } while (positionMinX <= gameMap.length && positionMinY <= gameMap.length);
    // // let tilePosition = tile.position.split(":");
    // // let tileY = parseInt(tilePosition[0]);
    // // let tileX = parseInt(tilePosition[1]);
    // return areas;
  },
  // searchArea(startY, startX, gameMap, type) {
  //   let area = [];
  //   let lastY = startY;
  //   let lastX = startX;

  //   if (gameMap[lastY][lastX] && gameMap[lastY][lastX].land !== "empty") {
  //     area.push(gameMap[lastY][lastX]);
  //     if (
  //       gameMap[lastY + 1] &&
  //       gameMap[lastY + 1][lastX] &&
  //       gameMap[lastY + 1][lastX + 1] &&
  //       gameMap[lastY] &&
  //       gameMap[lastY][lastX + 1]
  //     ) {
  //       if (
  //         gameMap[lastY + 1][lastX] !== "empty" &&
  //         gameMap[lastY + 1][lastX + 1] !== "empty" &&
  //         gameMap[lastY][lastX + 1] !== "empty"
  //       ) {
  //         lastY++;
  //         lastX++;
  //       }
  //     }
  //   }

  // for (var i = startY; i < gameMap.length; i++) {
  //   for (var j = startX; j < gameMap.length; j++) {
  //     if (type === "all") {
  //       if (gameMap[i][j].land !== "empty") {
  //         //! ouh bah c'est la merde
  //       }
  //     }

  //     //* lastX++;
  //   }
  //   //* lastY++;
  // }
  // return [area, lastY, lastX];
  // },
};

module.exports = helper;
