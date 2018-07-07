import { game } from './game.js'

let gameBoard = document.getElementById('gameBoard');
let idCounter = 0;


function destroy(point) {
  let id = 'gainPoint' + point.id;
  document.getElementById(id).remove()
  let array = game.currentBoard.gainPoints;
  let index = array.indexOf(point);
  array.splice(index, 1);
};


function setStyle(point, style='gainPoint gainPoint--style') {
  point.gainPoint.className = style;

  if ((game.multiGame && point.gained===2) || (!game.multiGame && point.gained===1)) destroy(point);
};


export class GainPoint {
  constructor() {
    this.gained = 0;
    this.gainPoint = document.createElement('div');
    this.id = idCounter;
    this.gainPoint.id = 'gainPoint' + this.id;
    idCounter++;
  };

  pick(char) {
    let charContainsClass = char.struct.classList.contains('player--first');
    let id = charContainsClass ? 0 : 1;
    let style;
    this.gained++;

    if (id === 0) {
      style = 'gainPoint gainPoint--style gainPoint--second';
    }
    else if (id === 1) {
      style = 'gainPoint gainPoint--style gainPoint--first';
    }
    else throw new Error('Indicated invalid char.id!')

    if (style) setStyle(this, style);
  };

  create(x, y) {
    setStyle(this);
    this.gainPoint.style.left = x + 'px';
    this.gainPoint.style.top = y + 'px';
    gameBoard.appendChild(this.gainPoint);
  };
}
