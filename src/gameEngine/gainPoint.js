import { game } from './game.js'

const gameBoard = document.getElementById('gameBoard');
let idCounter = 0;


function destroy(point) {
  const id = 'gainPoint' + point.id;
  document.getElementById(id).remove()
  const array = game.currentBoard.gainPoints;
  const index = array.indexOf(point);
  array.splice(index, 1);
};


function setStyle(point, style='gainPoint gainPoint--style') {
  point.gainPoint.className = style;

  if ((game.multiGame && point.gained===2) || (!game.multiGame && point.gained===1)) destroy(point);
};


class GainPoint {
  constructor() {
    this.gained = 0;
    this.gainPoint = document.createElement('div');
    this.id = idCounter;
    this.gainPoint.id = 'gainPoint' + this.id;
    idCounter++;
  };

  pick(char) {
    const charContainsClass = char.struct.classList.contains('player--first');
    const id = charContainsClass ? 0 : 1;
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
  };

  addToBoard() {
    gameBoard.appendChild(this.gainPoint);
  };

  get left() {
    return parseInt(this.gainPoint.style.left)
  };

  get top() {
    return parseInt(this.gainPoint.style.top)
  };
}

export { GainPoint, destroy, setStyle }
