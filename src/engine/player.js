import { Structure } from './structure.js';
import { char } from './char.js';
import { game } from './game.js';
//import { GainPoint } from './gainPoint.js'

function checkGainedPoints(character, point) {
  let gp = character.gainedPoints;

  for (let i=0; i<gp.length; i++) {
    if (point.id === gp[i]) return true;
  }
};


function checkEndPoint(character) {
  let endPoint = game.currentBoard.endPoint;

  if ((endPoint[0]+10 > character.A[0] && endPoint[0]+10 < character.B[0]) && (endPoint[1]-4 > character.D[1] && endPoint[1]-4 < character.A[1])) {
    character.canMove = false;

    if(!game.multiGame) game.endBoard();
  }

  if (game.multiGame && (!game.player.canMove && !game.player2.canMove)) game.endBoard();
};


export class Player extends Structure {
  constructor(style, width, height, x, y) {
    super(style, width, height, x, y);
    this.gainedPoints = [];
    this.time = '-:--';
    this.min = 0;
    this.sec = 0;
    this.ms = 0;
    this.score = 0;
    this.gp = 0;
    this.isCrouching = false;
    this.canMove = true;
  };

  crouch(run) {
    if ((this.isCrouching && run) || this.isJumping) return;

    switch(run) {
      case true: //Player wants to crouch
        this.changeShape(25, 30)
        this.changePosition(0, 10)
        this.isCrouching = true;
      break;
      case false: //Player wants to stand up
        this.changeShape(25, 40)
        this.changePosition(0, -10)
        this.isCrouching = false;
      break;
    }
  };

  climbingLadder(type) { //0-up, 1-down
    let ladders = game.currentBoard.ladders;

    for (let i=0; i<ladders.length; i++) {
      if ((this.B[0] + 6 >= ladders[i].left && this.A[0] -11 <= ladders[i].left) && (this.A[1]-1 <= ladders[i].bottom && this.D[1] >= ladders[i].top)) {
        this.collisionStruct = 0;
        this.onStruct = false;

        let xDebt = ladders[i].left - this.D[0] - 10;
        let yDebt = ladders[i].top - this.D[1];
        this.changePosition(xDebt, yDebt);

        for (let i=0; i<(yDebt*-1) /2.7; i++) {
          game.moveBoard(2, this);
        }
      }
    }
  };

  gainPoints() {
    if (this.gp===game.currentBoard.requiredPoints) {
      checkEndPoint(this);
      return;
    }
    let gainPoints = game.currentBoard.gainPoints;

    for (let i=0; i<gainPoints.length; i++) {
      let gainPointX = parseInt(gainPoints[i].gainPoint.style.left) + 10;
      let gainPointY = parseInt(gainPoints[i].gainPoint.style.top) + 10;

      if ((gainPointX > this.A[0] && gainPointX < this.B[0]) && (gainPointY > this.D[1] && gainPointY < this.A[1])) {
        if(!checkGainedPoints(this, gainPoints[i])) {
          this.score++;
          this.gp++;
          this.gainedPoints.push(gainPoints[i].id);
          gainPoints[i].pick(this)
          game.setStats(0, this, this.score);
        }
        else return;
      }
    }
  };

  timer(clear) {
    if (clear) {
      this.time = this.min + ":" + this.sec + ":" + this.ms;
      this.min = 0;
      this.sec = 0;
      this.ms = 0;
    }

    if (this.canMove) {
      this.ms++;
      if (this.ms > 99) {
        this.ms = 0;
        this.sec++;
      }
      else if(this.sec > 60) {
        this.sec = 0;
        this.min++;
      }
      this.time = this.min + ":" + this.sec + ":" + this.ms;
      setTimeout(()=> this.timer(), 100);
    }

    game.setStats(1, this, this.time)
  };

  clearGainedPoints() {
    this.gainedPoints = [];
  };
}

Object.assign(Player.prototype, char(10));
