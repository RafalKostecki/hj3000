import { IisStruct } from './interface.js';
import { game } from './game.js';
import { Structure } from './structure.js';

export const char = (lifes) => ({
  life: lifes,
  //Below variables which are necessary to collision system
  jumpCollision: null,
  collisionCounter: 1,
  //Equal structure id which take part in collision with character
  collisionStruct: null,
  //This property prevent jump block when character is on structure. If this is equal to true, method AA.1 in collision.js won`t run, so we can jump on another structure or whenever where you want.
  onStruct: false,
  //When this variable is equal to true, it means that player is jumping, right now.
  isJumping: false,

  move: (direction, char, movementSpeed) => {
    IisStruct.isIplementedBy(char);
    const boundElement = Structure.prototype.changePosition.bind(char);

    if (direction === 0) { //Left
      const changeValue = Math.abs(movementSpeed) * (-1);
      boundElement(changeValue, null, -1);
    }
    else if (direction === 1) { //Right
      boundElement(Math.abs(movementSpeed), null, 1);
    }
    else throw new Error('Cannot recognize direction value.')
  },

  jump: (char) => {
    if (char.isJumping) return;

    IisStruct.isIplementedBy(char);
    const boundElement = Structure.prototype.changePosition.bind(char);
    const vector = (char).vector;
    char.isJumping = true;

    for (let i=0; i<9 && char.isJumping; i++) { //up
      setTimeout(() => {
        if (game.collisionsSystem.movement(char, true)) char.isJumping = false;
        else if (char.isJumping) {
          boundElement(4*vector, -5);
          game.moveBoard(2, char);
          if (i%2===0) char.vector === -1 ? game.moveBoard(0, char) : game.moveBoard(1, char);
        }
      }, 15)
    }

    setTimeout(()=> {
      for (let i=0; i<9 && char.isJumping; i++) { //down
        setTimeout(() => {
          if (game.collisionsSystem.movement(char, true)) char.isJumping = false;
          else if (char.isJumping) {
            boundElement(4*vector, 5);
            game.moveBoard(4, char);
            if (i%2===0) char.vector === -1 ? game.moveBoard(0, char) : game.moveBoard(1, char);
          }
        }, 15)
      }
    }, 200)

    setTimeout(()=> {
      if (!char.isJumping) return;
        //This will be when player jumped off any structure and didn`t come across on any structure, so we have to run fallingSystem, what will cause a fall
        char.isJumping = false;
        game.collisionsSystem.endJump(char);
      }, 360)

  },
})
