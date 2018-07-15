import { IisStruct } from './interface.js';
import { game } from './game.js';
import { Structure } from './structure.js';


function jumpAnime(char) {
  const boundElement = Structure.prototype.changePosition.bind(char);

  if (game.collisionsSystem.movement(char, true)) char.isJumping = false;
  else if (char.isJumping) {
    const direction = char.counter <= 9 ? -5 : 5;
    const turn = char.counter <= 9 ? 2 : 3;

    boundElement(4*char.vector, direction);
    game.moveBoard(turn, char);
    if (char.counter % 2 === 0) char.vector === -1 ? game.moveBoard(0, char) : game.moveBoard(1, char);
  }

  char.counter++

}

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
  counter: 0,

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
    if (char.isJumping) return

    IisStruct.isIplementedBy(char)
    char.isJumping = true

    const interval = setInterval(
      () => {
        if (char.counter < 20) jumpAnime(char)
        else {
          char.counter = 0;
          char.isJumping = false;
          game.collisionsSystem.endJump(char);
          window.clearInterval(interval)
        }
      }, 15
    )
  },

})
