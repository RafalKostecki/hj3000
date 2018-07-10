import fs from 'fs';

export let allBoards = [];
export let chosenNames = [];
export let checkedBoards = [];

export function loadBoards(func) {
  fs.readdir('./boards', (err, dir) => {
    for (let i = 0, path; path = dir[i]; i++) {
      fs.readFile(`./boards/${path}`, (err, data) => {
        if (err) throw err;
        const file = JSON.parse(data);
  
        if (!file.checked) allBoards.push(file.name)
        else {
          chosenNames.push(file.name)
          checkedBoards.push(file)
        }
  
        console.log(typeof func)
        if (i=== dir.length-1 &&  typeof func === 'function') func();
      });
    }
  });
}