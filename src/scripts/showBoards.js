import { loadBoards, allBoards, chosenNames } from '../scripts/loadBoards.js';

const showBoards = () => {
  const allBoardsDiv = document.getElementById('boardsAll');
  const chosenBoardsDiv = document.getElementById('boardsChosen')

  for (let board of allBoards) {
    const name = document.createElement('li');
    const content = document.createTextNode(board);
    name.appendChild(content);
    allBoardsDiv.appendChild(name);
  }

  for (let board of chosenNames) {
    const name = document.createElement('li');
    const content = document.createTextNode(board);
    name.appendChild(content);
    chosenBoardsDiv.appendChild(name);
  }
}

loadBoards(showBoards)