const gameBoard = document.getElementById('gameBoard');

export class Ladder {
  constructor() {
    this.div = document.createElement('div');
    this.div.className = 'ladder ladder--style';
  };

  createLadder(left, top, height) {
    this.div.style.left = left + 'px';
    this.div.style.top = top + 'px';
    this.div.style.height = height + 'px';
  };

  addToBoard() {
    gameBoard.appendChild(this.div);
  };

  get top() { //point A[x,y]
      return parseInt(this.div.style.top);
  };

  get bottom() { //point A[x,y]
      return (parseInt(this.div.style.top) + parseInt(this.div.style.height));
  };

  get left() { //point A[x,y]
      return parseInt(this.div.style.left);
  };
}
