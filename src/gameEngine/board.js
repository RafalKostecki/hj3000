import { Structure } from './structure.js'
import { game } from './game.js';
import { IisStruct, IisPlayer, IisGainPoint} from './interface.js';
import { GainPoint } from './gainPoint.js';
import { Ladder } from './ladder.js';
import { loadBoards, checkedBoards } from '../assets/scripts/loadBoards.js'

const gameBoard = document.getElementById('gameBoard');

loadBoards();

const levels = checkedBoards;

function addToPartOfMap(array, struct, boardWidth) {
  //This function divde game board on three parts. This behavior has prevent too many search structure in collisionSystem
  //Left break points
  if (struct.B[0] < boardWidth/3) { //First part of map
    array[0].push(struct)
  }
  else if (struct.B[0] >= boardWidth/3 && struct.B[0] < (boardWidth/3)*2) { //Second part of map
    array[1].push(struct)
  }
  else { //Third part of map
    array[2].push(struct)
  }

  //Right break points
  if (struct.A[0] < boardWidth/3) { //First part of map
    if (array[0].indexOf(struct) > -1) return; //If a hole structure is in the one part of map this conditional statement prevent multiple add the same structure to the same part of map
    array[0].push(struct)
  }
  else if (struct.A[0] >= boardWidth/3 && struct.A[0] < (boardWidth/3)*2) { //Second part of map
    if (array[1].indexOf(struct) > -1) return;
    array[1].push(struct)
  }
  else  { //Third part of map
    if (array[2].indexOf(struct) > -1) return;
    array[2].push(struct)
  }
};


class Board {
  constructor(lvl, stages=levels, gameOperator=game) {
    this.level = lvl;
    this.quantityOfLvls = stages.length;

    this.collisionLinesY = []; //This array includes values in OY axis were are structs. The value is a s.D[1] point, the highest edgy of structure
    this.structs = []; //This array includes every structures of board (one level)
    this.chars = []; //Similary to above
    this.ladders = [];
    this.gainPoints = [];
    this.partOfMap = [
      [],
      [],
      [],
    ];
    this.requiredPoints = stages[this.level].gainPoints.length;
    this.endPoint = stages[this.level].endPoint;

    this.width = stages[this.level].board.width;
    this.height = stages[this.level].board.height;
  };

  setGameBoard() {
    gameBoard.style.width = this.width + 'px';
    gameBoard.style.height = this.height + 'px';
  }

  createBoard() {
    const lvl = this.level;

    IisPlayer.isIplementedBy(game.player);
    game.player.createStruct(25, 40, levels[lvl].player.x, levels[lvl].player.y);
    game.player.addToBoard();
    game.player.collisionCounter = 1;

    if (game.multiGame) {
      IisPlayer.isIplementedBy(game.player2);
      game.player2.createStruct(25, 40, levels[lvl].player.x, levels[lvl].player.y);
      game.player2.addToBoard();
      game.player2.collisionCounter = 1;
    }

    for (const structure of levels[lvl].structures) {
      const struct = new Structure('barrier barrier--style');
      this.addScruct(struct);

      struct.createStruct(structure.width, structure.height, structure.x, structure.y);
      struct.addToBoard();

      this.collisionLinesY.push([struct.id, struct.D[1]])

      addToPartOfMap(this.partOfMap, struct, game.currentBoard.width);
    }

    game.player.jumpCollision = this.structs[0].id;
    if (game.multiGame) game.player2.jumpCollision = this.structs[0].id; //Set jumpCollision at id structure on which player is
  };

  addScruct(struct) {
    IisStruct.isIplementedBy(struct);
    this.structs.push(struct);
  };

  addGainPoints(stages=levels, create=true) { //Default set at true, so we want to also add gainPoint to gameBoard
    for (const gp of stages[this.level].gainPoints) {
      const gainPoint = new GainPoint();

      if (create) {
        gainPoint.create(gp.x, gp.y);
        gainPoint.addToBoard();
      }

      IisGainPoint.isIplementedBy(gainPoint);
      this.gainPoints.push(gainPoint);
    }
  };

  setEndPoint() {
    const endPoint = document.createElement('div');
    endPoint.className = 'endPoint endPoint--style';
    endPoint.style.left = this.endPoint.x + 'px';
    endPoint.style.top = this.endPoint.y + 'px';

    gameBoard.appendChild(endPoint);
  };

  addLadders(stages=levels, create=true) { //Default set at true, so we want to also add addLadders to gameBoard
    for (const lad of stages[this.level].ladders) {
      const ladder = new Ladder();

      if (create) {
        ladder.createLadder(lad.x, lad.y, lad.height)
        ladder.addToBoard()
      }

      this.ladders.push(ladder);
    }
  };

  theSmallestSize(type, stages=levels) { //type: 0-width or 1-height
    let size;

    let result = 3000;
    for (let stage of stages) {
      if (type === 0) size = stage.board.width;
      else if (type === 1) size = stage.board.height;
      
      if(size < result) result = size;
    }

    return result;
  };

}

export { Board, addToPartOfMap }