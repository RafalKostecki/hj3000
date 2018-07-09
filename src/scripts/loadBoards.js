import fs from 'fs';

let allBoards = [];
let chosenBoards = [];

fs.readdir('./boards', (err, dir) => {
  for (let i = 0, path; path = dir[i]; i++) {
    fs.readFile(`./boards/${path}`, (err, data) => {
      if (err) throw err;
      const file = JSON.parse(data);

      if (!file.checked) allBoards.push(file.name)
      else chosenBoards.push(file.name)

      if (i=== dir.length-1) showBoards();
    });
  }
});

function showBoards() {
  const allBoardsDiv = document.getElementById('boardsAll');
  const chosenBoardsDiv = document.getElementById

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
