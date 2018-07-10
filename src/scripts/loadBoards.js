import fs from 'fs';

export let allBoards = [];
export let chosenBoards = [];

export function loadBoards(func) {
  fs.readdir('./boards', (err, dir) => {
    for (let i = 0, path; path = dir[i]; i++) {
      fs.readFile(`./boards/${path}`, (err, data) => {
        if (err) throw err;
        const file = JSON.parse(data);
  
        if (!file.checked) allBoards.push(file.name)
        else chosenBoards.push(file.name)
  
        if (i=== dir.length-1) func();
      });
    }
  });
}