import { Collisions } from './collisions.js';
import { PlayerControl } from './playerControl.js';
import { Player } from './player.js';
import { Board } from './board.js';


const gameBoard = document.getElementById('gameBoard');
const gameWindow = document.getElementById('gameWindow');
const gameWrapper = document.getElementById('gameWrapper');
const gameArt = document.getElementById('gameArt');
const gameFrame = document.getElementById('game');


function changePosition(type, char, wDebt, hDebt, ladder) {
  switch(type) {
    case 0: //Left
      if ((gameBoard.offsetLeft >= 0) || (char.A[0]-wDebt > gameWindow.clientWidth/2)) return;

      gameBoard.style.left = (gameBoard.offsetLeft + 5) + 'px';
    break;
    case 1: //Right
      if ((gameBoard.offsetLeft <= wDebt*-1) || (char.B[0] < gameWindow.clientWidth/2)) return;

      gameBoard.style.left = (gameBoard.offsetLeft - 5) + 'px';
    break;
    case 2: //up
      if ((gameBoard.offsetTop >= 0) || (char.D[1] > gameWindow.clientHeight/1)) return;

      gameBoard.style.top = (gameBoard.offsetTop + 2) + 'px';
    break;
    case 3: //down
      if ((gameBoard.offsetTop <= hDebt*-1) || (char.A[1] < gameWindow.clientHeight/2)) return;

      gameBoard.style.top = (gameBoard.offsetTop - 2) + 'px';
    break;
  }
};

function isInt(value) {
  const x = parseFloat(value);
  return !isNaN(value) && (x | 0) === x;
};


export const game = {
  start: false,
  multiGame: false,
  currentLvl: 0,
  currentBoard: null,
  collisionsSystem: Collisions,
  player: null,
  playerControl: null,
  player2: null,
  player2Control: null,
  stop: false,

  runGame: function (multi=false) {
    if (this.start) return;
    this.multiGame = multi;

    this.player = new Player('player player--style player--first');
    this.playerControl = new PlayerControl();
    this.player.timer();

    if (this.multiGame) {
      this.player2 = new Player('player player--style player--second')
      this.player2Control = new PlayerControl();
      this.player2.timer();
    }
    else if (!this.multiGame && this.player2) {
      this.player2 = undefined;
      this.player2Control = undefined;
    }

    this.run();
  },

  run: function() {
    this.start = true;

    this.currentBoard = new Board(this.currentLvl);
    this.currentBoard.setGameBoard();
    this.currentBoard.createBoard();
    this.currentBoard.addGainPoints();
    this.currentBoard.setEndPoint();
    this.currentBoard.addLadders();

    gameBoard.style.top = 0;
    gameBoard.style.left = 0;

    this.player.canMove = true;

    if (this.multiGame) this.player2.canMove = true;

  },

  setStats: function(stats, char, value) {
    if (this.stop) return;
    
    const charContainsClass = char.struct.classList.contains('player--first');
    const id = charContainsClass ? 0 : 1;

    switch(stats) {
      case 0: //Points
        document.getElementById('pointsPlayer'+id).innerHTML = value;
      break;
      case 1: //Time
        document.getElementById('timePlayer'+id).innerHTML = value;
      break;
    }
  },

  endBoard: function() {
    if (!this.start) return;

    document.getElementsByClassName('barrier').remove();
    document.getElementsByClassName('endPoint').remove();
    document.getElementsByClassName('gainPoint').remove();
    document.getElementsByClassName('ladder').remove();
    if (this.multiGame) {
      this.player2.clearGainedPoints();
      this.player2.gp = 0;
    }
    this.player.clearGainedPoints();
    this.player.gp = 0;

    this.currentLvl++;
    if (this.currentLvl >= this.currentBoard.quantityOfLvls) {
      this.endGame();
    }
    else this.run();
  },

  endGame: function() {
    alert('The end!')
    this.start = false;

    if (this.multiGame) {
      this.player2.canMove = false;
      this.player2.timer(true);
      this.player2.score = 0;
    }

    this.player.canMove = false;
    this.player.timer(true);
    this.player.score = 0;
    this.currentLvl = 0;
    document.getElementsByClassName('player').remove();
  },

  moveBoard: (type, char) => {
    const charContainsClass = char.struct.classList.contains('player--first');
    if (!charContainsClass) return; //Prevent move board by two players

    const widthDebt = gameBoard.clientWidth-gameWindow.offsetWidth;
    const heightDebt = gameBoard.clientHeight-gameWindow.clientHeight;

    if (isInt(widthDebt) && isInt(heightDebt)) changePosition(type, char, widthDebt, heightDebt)
    else throw new Error('Debet cannot has different type than integer.');
  },

  setWindow: () => {
    const width = Board.prototype.theSmallestSize(0);
    const height = Board.prototype.theSmallestSize(1);
    const windowHeight = window.innerHeight;
    const titleHeight = document.getElementById('title').offsetHeight;

    gameArt.style.maxWidth = width + 'px';
    gameWrapper.style.maxWidth = width + 'px';
    gameWindow.style.width = (gameArt.clientWidth - 6) + 'px';

    if (windowHeight < height) {
      gameFrame.style.height = (windowHeight - titleHeight) + 'px';
      gameWindow.style.height = (windowHeight - titleHeight - 6) + 'px';
    }
  },

}
