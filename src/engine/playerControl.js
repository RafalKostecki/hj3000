import { game } from './game.js';


function operator(instance, char, type) {
  if (instance.ableToMove) { //Decrease invoked playerMove function
    if (game.collisionsSystem.movement(char, false)) instance.ableToMove = false;
  }

  instance.loopOperator = true;
  move(instance, char, type);
};

function move(instance, char, type) {
  if(!char.canMove || char.isJumping) return; //Disable move if player is jumping in this moment

  if (instance.currentType !== type && !instance.ableToMove) instance.ableToMove = true;
  else instance.currentType = type;

  if (instance.loopOperator && instance.startKey && type != undefined && game.start) {
    instance.loopOperator = false;

    if (instance.ableToMove) {
      char.move(type, char, 5);//Do step
      game.moveBoard(type, char);
    }

    setTimeout(() => operator(instance, char, type), 25); //Do next step after 0.025 sec
  }
};

export class PlayerControl {
  constructor() {
    this.typeKey = null;
    this.loopOperator = true;
    this.startKey = null;
    this.ableToMove = true;
    this.currentType = null;
  };

  addGameControl() {
    let startOneBtn = document.getElementById('startOne');
    let startTwoBtn = document.getElementById('startTwo');
    let giveUpBtn = document.getElementById('giveUpBoard');

    startOneBtn.addEventListener('click', () => {
      game.runGame(false);
    });
    startTwoBtn.addEventListener('click', ()=> {
      game.runGame(true);
    });
    giveUpBtn.addEventListener('click', ()=> {
      if (!game.endBoard) return;
      game.endBoard();
    });

  };

  keyDown(char, eventCode) {
    this.startKey = true;

    switch(eventCode) {
      case 65:
      case 37:
        move(this, char, 0);
      break;
      case 68:
      case 39:
        move(this, char, 1);
      break;
    }

    this.typeKey = event.keyCode;
  };

  //If player pressed key of wasd or arrows on keyboard, the movement will be stopped
  keyUp(event) {
    this.startKey = false;
  };

};
