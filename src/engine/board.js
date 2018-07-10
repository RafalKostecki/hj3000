import { Structure } from './structure.js'
import { game } from './game.js';
import { IisStruct, IisChar, IisPlayer, IisGainPoint} from './interface.js';
import { GainPoint } from './gainPoint.js';
import { Ladder } from './ladder.js';

let gameBoard = document.getElementById('gameBoard');

/*let levels = [
  [[playerX, playerY(start position), board width, board height], Player and board settings
  [[gainPintX, gainPointY], [anotherGainPointX, agpY]], GainPoints
  [[endX, endY], [eX, eY]] end of map
  [className, width, height, x, y], [another structure]],
  [another level structs]
] */
const levels = [
  [ //Level 1
    //Player and board settings
    [40, 70, 1200, 500],
    //Gain points
    [
      [140, 50], [185, 85], [260, 200], [10, 180], [90, 210], [505, 160], [600, 155], [695, 155], [790, 120], [870, 90], [950, 60], [1140, 190], [960, 250], [800, 320], [570, 320], [400, 415], [250, 415], [100, 415], [700, 460], [950, 460]
    ],
    //End point
    [1170, 492],
    //Ladders
    [//[left, top, height]
      [495, 310, 190], [675, 140, 220]
    ],
    //Structures
    ['barrier', 120, 30, 0, 110], ['barrier', 50, 30, 170, 110], ['barrier', 250, 30, 200, 230], ['barrier', 150, 30, 0, 240], ['barrier', 50, 140, 330, 0], ['barrier', 50, 30, 490, 195], ['barrier', 50, 30, 585, 190], ['barrier', 50, 30, 685, 190], ['barrier', 50, 30, 775, 155], ['barrier', 50, 30, 855, 120], ['barrier', 50, 30, 935, 95], ['barrier', 165, 30, 1035, 250], ['barrier', 60, 30, 940, 295], ['barrier', 400, 30, 510, 360], ['barrier', 30, 100, 320, 365], ['barrier', 30, 100, 170, 365]
  ],
  [ //Level 2
    //Player and board settings
    [40, 70, 1200, 500],
    //Gain points
    [
      [265, 70], [365, 70], [465, 70], [565, 70], [665, 70], [765, 70], [865, 70], [965, 70], [1065, 70], [265, 200], [100, 200], [40, 430], [210, 430], [430, 430], [850, 430], [415, 240], [600, 240], [700, 240], [885, 240], [975, 280]
    ],
    //End point
    [1170, 492],
    //Ladders
    [//[left, top, height]
      [1105, 60, 440]
    ],
    //Structures
    ['barrier', 200, 30, 0, 110], ['barrier', 350, 30, 0, 240], ['barrier', 50, 30, 250, 110], ['barrier', 50, 30, 350, 110], ['barrier', 50, 30, 450, 110], ['barrier', 50, 30, 550, 110], ['barrier', 50, 30, 650, 110], ['barrier', 50, 30, 750, 110], ['barrier', 50, 30, 850, 110], ['barrier', 50, 30, 950, 110], ['barrier', 50, 30, 1050, 110], ['barrier', 50, 30, 400, 280], ['barrier', 50, 30, 500, 320], ['barrier', 50, 30, 585, 280], ['barrier', 50, 30, 690, 280], ['barrier', 50, 30, 780, 320], ['barrier', 50, 30, 870, 280], ['barrier', 50, 30, 960, 320], ['barrier', 30, 80, 100, 385], ['barrier', 30, 80, 300, 385],
  ],
  [ //Level 3
    //Player and board settings
    [40, 70, 1200, 500],
    //Gain points
    [
      [185, 70], [285, 70], [385, 70], [485, 70], [585, 70], [685, 70], [785, 70], [885, 70], [985, 70], [1085, 70], [185, 200], [285, 200], [385, 200], [485, 200], [585, 200], [685, 200], [785, 200], [885, 200], [985, 200], [1085, 200], [55, 360], [320, 325], [485, 325], [655, 325], [820, 325]
    ],
    //End point
    [1170, 492],
    [//[left, top, height]
      [155, 65, 335]
    ],
    //Structures
    ['barrier', 130, 30, 0, 110], ['barrier', 50, 30, 170, 110], ['barrier', 50, 30, 270, 110], ['barrier', 50, 30, 370, 110], ['barrier', 50, 30, 470, 110], ['barrier', 50, 30, 570, 110], ['barrier', 50, 30, 670, 110], ['barrier', 50, 30, 770, 110], ['barrier', 50, 30, 870, 110], ['barrier', 50, 30, 970, 110], ['barrier', 50, 30, 1070, 110], ['barrier', 130, 30, 1070, 240], ['barrier', 50, 30, 170, 240], ['barrier', 50, 30, 270, 240], ['barrier', 50, 30, 370, 240], ['barrier', 50, 30, 470, 240], ['barrier', 50, 30, 570, 240], ['barrier', 50, 30, 670, 240], ['barrier', 50, 30, 770, 240], ['barrier', 50, 30, 870, 240], ['barrier', 50, 30, 970, 240], ['barrier', 300, 100, 0, 400], ['barrier', 100, 100, 365, 400], ['barrier', 100, 100, 530, 400], ['barrier', 100, 100, 695, 400], ['barrier', 100, 100, 860, 400]
  ],
  [ //Level 4
    //Player adn board settings
    [40, 70, 1200, 500],
    //Gain points
    [
      [185, 70], [285, 70], [385, 70], [485, 70], [585, 70], [685, 70], [785, 70], [885, 70], [985, 70], [1085, 70], [185, 200], [285, 200], [385, 200], [485, 200], [585, 200], [685, 200], [785, 200], [885, 200], [985, 200], [1085, 200], [320, 325], [485, 325], [655, 325], [820, 325], [320, 455], [485, 455], [655, 455], [820, 455]
    ],
    //End point
    [0, 492],
    //ladders
    [],
    //Structures
    ['barrier', 1100, 30, 0, 110], ['barrier', 1100, 30, 100, 240], ['barrier', 1100, 30, 0, 370]
  ],
  [ //Level 5
    //Player and board settings
    [40, 70, 1200, 500],
    //Gain points
    [[185, 70], [380, 70], [565, 70], [755, 70], [940, 70], [185, 230], [350, 230], [610, 225], [790, 230],  [975, 230], [320, 420], [485, 420], [655, 420], [820, 420]],
    //End point
    [1170, 492],
    //Ladders
    [//[left, top, height]
      [1100, 80, 210], [120, 220, 280]
    ],
    //Structures
    ['barrier', 300, 30, 0, 110], ['barrier', 30, 30, 340, 130], ['barrier', 30, 30, 430, 140], ['barrier', 30, 30, 520, 130], ['barrier', 30, 30, 610, 120], ['barrier', 30, 30, 700, 130], ['barrier', 30, 30, 790, 140], ['barrier', 30, 30, 880, 130], ['barrier', 30, 30, 970, 120], ['barrier', 30, 30, 1060, 130], ['barrier', 30, 30, 300, 290], ['barrier', 30, 30, 390, 300], ['barrier', 30, 30, 470, 290], ['barrier', 30, 30, 560, 280], ['barrier', 30, 30, 650, 290], ['barrier', 30, 30, 740, 300], ['barrier', 30, 30, 830, 290], ['barrier', 30, 30, 920, 280], ['barrier', 30, 30, 1010, 290], ['barrier', 110, 30, 1090, 290], ['barrier', 120, 30, 130, 270],
  ],
];

function addToPartOfMap(array, struct) {
  //This function divde game board on three parts(0-400px, 400-800px, 800-1200px). This behavior has prevent too many search structure in collisionSystem
  //Left break points
  if (struct.B[0] < game.currentBoard.width/3) { //First part of map
    array[0].push(struct)
  }
  else if (struct.B[0] >= game.currentBoard.width/3 && struct.B[0] < (game.currentBoard.width/3)*2) { //Second part of map
    array[1].push(struct)
  }
  else { //Third part of map
    array[2].push(struct)
  }

  //Right break points
  if (struct.A[0] < game.currentBoard.width/3) { //First part of map
    if (array[0].indexOf(struct) > -1) return; //If a hole structure is in the one part of map this conditional statement prevent multiple add the same structure to the same part of map
    array[0].push(struct)
  }
  else if (struct.A[0] >= game.currentBoard.width/3 && struct.A[0] < (game.currentBoard.width/3)*2) { //Second part of map
    if (array[1].indexOf(struct) > -1) return;
    array[1].push(struct)
  }
  else  { //Third part of map
    if (array[2].indexOf(struct) > -1) return;
    array[2].push(struct)
  }
};

function countPoints(lvl) {
  lvl++;
  let result = 0;

  for (let i = 0; i<lvl; i++) {
    result += levels[lvl-1][1].length;
  }

  return result;
};



export class Board {
  constructor(lvl) {
    this.level = lvl;
    this.quantityOfLvls = levels.length;

    this.collisionLinesY = []; //This array includes values in OY axis were are structs. The value is a s.D[1] point, the highest edgy of structure
    this.structs = []; //This array includes every structures of board (one level)
    this.chars = []; //Similary to above
    this.ladders = [];
    this.gainPoints = [];
    this.partOfMap = [
      [],
      [],
      [],
    ];
    this.requiredPoints = levels[this.level][1].length;
    this.endPoint = levels[this.level][2];

    this.width = levels[this.level][0][2];
    this.height = levels[this.level][0][3];

    gameBoard.style.width = this.width + 'px';
    gameBoard.style.height = this.height + 'px';
  };

  createBoard() {
    let lvl = this.level;

    this.addGainPoints(lvl);
    this.setEndPoint();
    this.addLadders(lvl);

    IisPlayer.isIplementedBy(game.player);
    game.player.createStruct(25, 40, levels[lvl][0][0], levels[lvl][0][1]);
    game.player.collisionCounter = 1;

    if (game.multiGame) {
      IisPlayer.isIplementedBy(game.player2);
      game.player2.createStruct(25, 40, levels[lvl][0][0], levels[lvl][0][1]);
      game.player2.collisionCounter = 1;
    }

    for (let i=4; i<levels[lvl].length; i++) {
      let struct;

      if (levels[lvl][i][0] === 'barrier') {
        struct = new Structure('barrier barrier--style');
        this.addScruct(struct);
      }
      else if (levels[lvl][i][0] === 'mob') {
      //  struct = new Mob('mob');
        this.addChar(struct);
      }
      else {
        throw new Error(`Invalid class name for structure number: ${i} from level: ${lvl}.`)
      }

      struct.createStruct(levels[lvl][i][1], levels[lvl][i][2], levels[lvl][i][3], levels[lvl][i][4]);

      if(levels[lvl][i][0] === 'barrier') this.collisionLinesY.push([struct.id, struct.D[1]])

      addToPartOfMap(this.partOfMap, struct);
    }

    game.player.jumpCollision = this.structs[0].id;
    if (game.multiGame) game.player2.jumpCollision = this.structs[0].id; //Set jumpCollision at id structure on which player is
  };

  addScruct(struct) {
    IisStruct.isIplementedBy(struct);
    this.structs.push(struct);
  };

  addChar(char) {
    IisChar.isIplementedBy(char);
    IisStruct.isIplementedBy(char);
    this.chars.push(char);
  };

  addGainPoints(lvl) {
    for (let i=0; i<levels[lvl][1].length; i++) {
      let gainPoint = new GainPoint();
      gainPoint.create(levels[lvl][1][i][0], levels[lvl][1][i][1]);

      IisGainPoint.isIplementedBy(gainPoint);
      this.gainPoints.push(gainPoint);
    }
  };

  setEndPoint() {
    let endPoint = document.createElement('div');
    endPoint.className = 'endPoint endPoint--style';
    endPoint.style.left = this.endPoint[0] + 'px';
    endPoint.style.top = this.endPoint[1] + 'px';

    gameBoard.appendChild(endPoint);
  };

  addLadders(lvl) {
    for (let i=0; i<levels[lvl][3].length; i++) {
      let ladder = new Ladder();
      ladder.createLadder(levels[lvl][3][i][0], levels[lvl][3][i][1], levels[lvl][3][i][2]);

      this.ladders.push(ladder);
    }
  };

  theSmallestSize(type) { //type: 0-width or 1-height
    let size;

    if (type === 0) size = 2;
    else if (type === 1) size = 3;
    else throw new Error('Invalid value of type size.')
    let result = 2000;
    for (let i=0; i<levels.length; i++) {
      if(levels[i][0][size] < result) result = levels[i][0][size];
    }

    return result;
  };

}
