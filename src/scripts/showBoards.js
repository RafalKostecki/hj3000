import { loadBoards, allBoards, chosenBoards } from '../scripts/loadBoards.js';

console.log(allBoards)
console.log(chosenBoards)
const showBoards = () => {
  const allBoardsDiv = document.getElementById('boardsAll');
  const chosenBoardsDiv = document.getElementById('boardsChosen')

  for (let board of allBoards) {
    const name = document.createElement('li');
    const content = document.createTextNode(board);
    name.appendChild(content);
    allBoardsDiv.appendChild(name);
  }

  for (let board of chosenBoards) {
    const name = document.createElement('li');
    const content = document.createTextNode(board);
    name.appendChild(content);
    chosenBoardsDiv.appendChild(name);
  }
}

loadBoards(showBoards)