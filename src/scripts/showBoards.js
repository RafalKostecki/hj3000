import { loadBoards, allBoards } from '../scripts/loadBoards.js';
import fs from 'fs';


const showBoards = () => {
  const allBoardsDiv = document.getElementById('boardsAll');

  for (let board of allBoards) {
    const name = document.createElement('li');
    const content = document.createTextNode(board.file.name);
    name.appendChild(content);
    allBoardsDiv.appendChild(name);

    if (board.file.checked) setChecked(name);

    name.addEventListener('click', () => switchCheck(board, name))
  }
}

function switchCheck(board, name) {
  board.file.checked = !board.file.checked;
  fs.writeFileSync(board.path, JSON.stringify(board.file));
  if (board.file.checked) setChecked(name);
  else unChecked(name)
}

function setChecked(name) {
  name.style.color = '#720b0b';
  name.style.fontWeight = 'bold';
}

function unChecked(name) {
  name.style.color = 'inherit';
  name.style.fontWeight = 'normal';
}

loadBoards(showBoards)