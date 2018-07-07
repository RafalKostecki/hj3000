import { game } from './game.js';
import { IisChar } from './interface.js';

function isBeyondBoard(char) {
    if(char.A[0] <= 5 || char.B[0] >= game.currentBoard.width - 5) { //x-axis
        if(char.isJumping) {
            //if player wanted to jumpt beyond the board
            char.onStruct = false;
            char.isJumping = false;
            fallingSystem(char)
        }
        return true;
    }
    else if(char.D[1] <= -5) {
        char.onStruct = false;
        char.isJumping = false;
        fallingSystem(char)
        return true;
    }
};


function fallingSystem(char) {
  if (char.isJumping) return;

  let breakPoint = game.currentBoard.collisionLinesY;
  let condition = false;

  while (char.A[1] < game.currentBoard.height && condition === false) {
    for (let i=0; i<breakPoint.length; i++) {
      if (char.A[1] >= breakPoint[i][1] && char.A[1] < breakPoint[i][1] + 5) {  //y-axis
        for(let j=0; j<game.currentBoard.structs.length; j++) {
          let struct = game.currentBoard.structs[j];
          if (struct.D[1] === breakPoint[i][1]) {
            if(char.B[0] > struct.A[0] && char.A[0] < struct.B[0]) { //x-axis
              char.onStruct = true;
              //Disable create a new collision after fell on another structure
              char.jumpCollision = struct.id;
              char.collisionCounter++;
              condition = true; //Turn off while loop
              break;
            }
          }
        }
      }
    }

    if(!char.onStruct) {
      char.changePosition(0, 2);
      game.moveBoard(3, char);
    }
  }
};


function onStruct(char, struct) {
  if (struct === null) return;

  if (struct === 0 && char.A[1] <= game.currentBoard.height - 3) {
    fallingSystem(char);
    return;
  }
  else if (struct === 0 && char.A[1] > game.currentBoard.height -3) {
    char.jumpCollision = null;
    char.collisionCounter = 0;
    return;
  }

  if (char.B[0] > struct.A[0]+1 && char.A[0] < struct.B[0]-1) { //x-axis
    if ((char.A[1] > struct.D[1] + 3 && char.A[1] < struct.A[1] - 3) || (char.D[1] > struct.D[1] + 3 && char.D[1] < struct.A[1] - 3)) { //y-axis
      //Character is inside structure
      //This provide disable possibility move through structure after jump and stop on this structure
      if (char.vector !== char.oldVector) return;
      char.onStruct = false;
      char.jumpCollision = null;
      char.collisionCounter = 0;
    }
    else if((struct.A[1] < char.B[1] && struct.D[1] > char.C[1] && !char.isJumping) || (struct.B[1] < char.A[1] && struct.C[1] > char.D[1] && !char.isJumping)) {
      char.onStruct = false;
      char.jumpCollision = null;
      char.collisionCounter = 0;
      fallingSystem(char);
    }
    else { //Character is on structure
      char.onStruct = true;
    }
  }
  else { //Character is beyond structure
    char.onStruct = false;
    char.jumpCollision = null;
    char.collisionCounter = 0;

    if (char.A[1] <= game.currentBoard.height - 3) {
      fallingSystem(char);
    } //Turn off fallingSystem when char is beyond any structure and is on the main platform
  }
};


function findCollision(char, struct, jump) {
  if (jump && char.collisionCounter > 0 && !char.onStruct) {
    char.jumpCollision = struct.id;
    char.collisionStruct = struct;
    fallingSystem(char);
    return true;
  }
  if (struct.id !== char.jumpCollision) { //This create new collision
    char.collisionCounter = 0;
    char.collisionStruct = struct;
  }
  char.jumpCollision = struct.id;
  if (struct.id === char.jumpCollision) {
    if (char.collisionCounter === 0) { //The first move has been blocked.
      char.collisionCounter++;
      return true;
    }
    else { //Not block move, char is on structure
      onStruct(char, char.collisionStruct)
      char.collisionStruct = struct;
    }
  }
  else {
    return true;
  }
};


function directionLeft(char, part, jump) {
  let pBoard = game.currentBoard.partOfMap[part];

  for (let i=0; i<pBoard.length; i++) {
    if(char.A[0] <= pBoard[i].B[0] && char.B[0] > pBoard[i].A[0]) {

      if ((char.A[1] <= pBoard[i].B[1] && char.A[1] >= pBoard[i].C[1]) || (char.D[1] <= pBoard[i].B[1] && char.A[1] >= pBoard[i].C[1])) {
        if(findCollision(char, pBoard[i], jump)) return true;
        else break;
      }
    }
    else {
      onStruct(char, char.collisionStruct)
    }
  }
};


function directionRight(char, part, jump) {
  let pBoard = game.currentBoard.partOfMap[part];

  for (let i=0; i<pBoard.length; i++) {
    if(char.B[0] >= pBoard[i].A[0] && char.A[0] < pBoard[i].B[0]) { //x-axis

      if ((char.B[1] <= pBoard[i].A[1] && char.B[1] >= pBoard[i].D[1]) || (char.C[1] <= pBoard[i].A[1] && char.B[1] >= pBoard[i].D[1])) { //y-axis
         if(findCollision(char, pBoard[i], jump)) return true;
         else break;
      }
    }
    else {
      onStruct(char, char.collisionStruct);
    }
  }
};


function divideMap(char, jump) {
  let partOfMap;

  if (char.vector === 1) { //Right
    if (char.B[0] < game.currentBoard.width/3) { //First part of map
      partOfMap = 0;
    }
    else if (char.B[0] >= game.currentBoard.width/3 && char.B[0] < (game.currentBoard.width/3)*2) { //Second part of map
      partOfMap = 1;
    }
    else { //Third part of map
      partOfMap = 2;
    }

    if (directionRight(char, partOfMap, jump)) return true;
  }
  else if (char.vector === -1) { //Left
    if (char.A[0] < game.currentBoard.width/3) { //First part of map
      partOfMap = 0;
    }
    else if (char.A[0] >= game.currentBoard.width/3 && char.A[0] < (game.currentBoard.width/3)*2) { //Second part of map
      partOfMap = 1;
    }
    else { //Third part of map
      partOfMap = 2;
    }

    if (directionLeft(char, partOfMap, jump)) return true;
  }
  else throw new Error('Invalid character vector.');
};


export const Collisions = {
  //If this function return true, player can`t move
  movement: (char, jump) => {
    IisChar.isIplementedBy(char);

    char.gainPoints();

    if (isBeyondBoard(char)) return true;
    if (divideMap(char, jump)) return true;
  },

  endJump: (char) => {
    IisChar.isIplementedBy(char);
    //TODO: I oguth to check where was call this method and if this was in char.jump I run fallingSystem in another cases not.
    fallingSystem(char)
  },

};
