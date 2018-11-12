import { PlayerControl } from './playerControl.js';
import { game } from './game.js';


game.setWindow();


//Add remove div function
Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for(let i = this.length - 1; i >= 0; i--) {
    if(this[i] && this[i].parentElement) this[i].parentElement.removeChild(this[i]);
  }
}


document.addEventListener('keydown', (event) => {
  if (!game.start) return;

  switch(event.keyCode) {
    case 65:
    case 68:
      game.playerControl.keyDown(game.player, event.keyCode);
    break;
    case 32:
      game.player.jump(game.player);
    break;
    case 67:
      game.player.crouch(true);
    break;
    case 87:
      game.player.climbingLadder();
    break;
  }

  if (!game.multiGame) return;
  switch(event.keyCode) {
    case 39:
    case 37:
      game.player2Control.keyDown(game.player2, event.keyCode);
    break;
    case 13:
      game.player2.jump(game.player2);
    break;
    case 191:
      game.player2.crouch(true);
    break;
    case 38:
      game.player2.climbingLadder();
    break;
  }
});

//When key up, this stop loop
document.addEventListener('keyup', (event) => {
  switch(event.keyCode) {
    case 65:
    case 68:
      game.playerControl.keyUp();
    break;
    case 67:
      game.player.crouch(false);
    break;
  }

  if (!game.multiGame) return;
  switch(event.keyCode) {
    case 39:
    case 37:
      game.player2Control.keyUp();
    break;
    case 191:
      game.player2.crouch(false);
    break;
  }
});


PlayerControl.prototype.addGameControl();
