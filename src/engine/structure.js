const gameBoard = document.getElementById('gameBoard');
let idCounter = 0;

export class Structure {
  constructor(style) {
    this.struct = document.createElement('div');
    this.struct.className = style;
    //It is structure direction according to the X-axis; -1 or 1
    this.vector = 1;
    this.oldVector = null;
    this.id = idCounter;
    idCounter++;
  };

  createStruct(width, height, x, y) {
    this.struct.style.width = width + 'px';
    this.struct.style.height = height + 'px';
    this.struct.style.left = x + 'px';
    this.struct.style.top = y + 'px';
  };

  addToBoard() {
    gameBoard.appendChild(this.struct);
  };

  changePosition(changeX, changeY, vector=this.vector) {
    this.struct.style.left = this.D[0] + changeX + 'px';
    this.struct.style.top = this.D[1] + changeY + 'px';
    this.oldVector = this.vector;
    this.vector = vector;
  };

  changeShape(width, height) {
    console.log(width)
    this.struct.style.width = width + 'px';
    this.struct.style.height = height + 'px';
  };

  get A() { //point A[x,y]
    return [parseInt(this.struct.style.left), parseInt(this.struct.style.top) + parseInt(this.struct.style.height)]
  };

  get B() { //point B
    return [parseInt(this.struct.style.left) + parseInt(this.struct.style.width), parseInt(this.struct.style.top) + parseInt(this.struct.style.height)]
  };

  get C() { //point C
    return [parseInt(this.struct.style.left) + parseInt(this.struct.style.width), parseInt(this.struct.style.top)]
  };

  get D() { //point D
    return [parseInt(this.struct.style.left), parseInt(this.struct.style.top)]
  };

  get width() { //point D
    return parseInt(this.struct.style.width)
  };

  get height() { //point D
    return parseInt(this.struct.style.height)
  };
}
