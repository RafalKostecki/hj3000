import { Structure } from './structure.js'
import { game } from './game.js';
import { IisStruct, IisChar, IisPlayer, IisGainPoint} from './interface.js';
import { GainPoint } from './gainPoint.js';
import { Ladder } from './ladder.js';
import { loadBoards, checkedBoards } from '../scripts/loadBoards.js'

let gameBoard = document.getElementById('gameBoard');

loadBoards();

const levels = checkedBoards;

function addToPartOfMap(array, struct) {
  //This function divde game board on three part. This behavior has prevent too many search structure in collisionSystem
  //Left break points
  if (struct.B[0] < game.currentBoard.width/3) { //First part of map
    array[0].push(struct)
  }
  else if (struct.B[0] >= game.currentBoard.width/3 && struct.B[0] < (game.currentBoard.width/3)*2) { //Second part of map
    array[1].push(struct)
  }
  else { //Third part of map
    array[2].push(struct)
  }

  //Right break points
  if (struct.A[0] < game.currentBoard.width/3) { //First part of map
    if (array[0].indexOf(struct) > -1) return; //If a hole structure is in the one part of map this conditional statement prevent multiple add the same structure to the same part of map
    array[0].push(struct)
  }
  else if (struct.A[0] >= game.currentBoard.width/3 && struct.A[0] < (game.currentBoard.width/3)*2) { //Second part of map
    if (array[1].indexOf(struct) > -1) return;
    array[1].push(struct)
  }
  else  { //Third part of map
    if (array[2].indexOf(struct) > -1) return;
    array[2].push(struct)
  }
};

function countPoints(lvl) {
  lvl++;
  let result = 0;

  for (let i = 0; i<lvl; i++) {
    result += levels[lvl-1][1].length;
  }

  return result;
};



export class Board {
  constructor(lvl) {
    this.level = lvl;
    this.quantityOfLvls = levels.length;

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
    this.requiredPoints = levels[this.level].gainPoints.length;
    this.endPoint = levels[this.level].endPoint;

    this.width = levels[this.level].board.width;
    this.height = levels[this.level].board.height;

    gameBoard.style.width = this.width + 'px';
    gameBoard.style.height = this.height + 'px';
  };

  createBoard() {
    let lvl = this.level;

    this.addGainPoints(lvl);
    this.setEndPoint();
    this.addLadders(lvl);

    IisPlayer.isIplementedBy(game.player);
    game.player.createStruct(25, 40, levels[lvl].player.x, levels[lvl].player.y);
    game.player.collisionCounter = 1;

    if (game.multiGame) {
      IisPlayer.isIplementedBy(game.player2);
      game.player2.createStruct(25, 40, levels[lvl].player.x, levels[lvl].player.y);
      game.player2.collisionCounter = 1;
    }

    for (let i = 0; i< levels[lvl].structures.length; i++) {
      const struct = new Structure('barrier barrier--style');
      this.addScruct(struct);

      struct.createStruct(levels[lvl].structures[i].width, levels[lvl].structures[i].height, levels[lvl].structures[i].x, levels[lvl].structures[i].y);

      this.collisionLinesY.push([struct.id, struct.D[1]])

      addToPartOfMap(this.partOfMap, struct);
    }

    game.player.jumpCollision = this.structs[0].id;
    if (game.multiGame) game.player2.jumpCollision = this.structs[0].id; //Set jumpCollision at id structure on which player is
  };

  addScruct(struct) {
    IisStruct.isIplementedBy(struct);
    this.structs.push(struct);
  };

  addChar(char) {
    IisChar.isIplementedBy(char);
    IisStruct.isIplementedBy(char);
    this.chars.push(char);
  };

  addGainPoints(lvl) {
    for (let i=0; i<levels[lvl].gainPoints.length; i++) {
      const gainPoint = new GainPoint();
      gainPoint.create(levels[lvl].gainPoints[i].x, levels[lvl].gainPoints[i].y);

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

  addLadders(lvl) {
    for (let i=0; i<levels[lvl].ladders.length; i++) {
      const ladder = new Ladder();
      ladder.createLadder(levels[lvl].ladders[i].x, levels[lvl].ladders[i].y, levels[lvl].ladders[i].height);

      this.ladders.push(ladder);
    }
  };

  theSmallestSize(type) { //type: 0-width or 1-height
    let size;

    if (type === 0) size = 'width';
    else if (type === 1) size = 'height';
    else throw new Error('Invalid value of type size.')

    let result = 2000;
    for (let i=0; i<levels.length; i++) {
      if(levels[i].board.size < result) result = levels[i].board.size;
    }

    return result;
  };

}
