import fs from 'fs';

export let allBoards = [];
export let checkedBoards = [];

export function loadBoards(func) {
  fs.readdir('./boards', (err, dir) => {
    for (let i = 0, path; path = dir[i]; i++) {
      fs.readFile(`./boards/${path}`, (err, data) => {
        if (err) throw err;
        const file = JSON.parse(data);
  
        allBoards.push({
          "file": file,
          "path": `./boards/${path}`
        })
        if (file.checked) checkedBoards.push(file)
  
        if (i=== dir.length-1 && typeof func === 'function') func();
      });
    }
  });
}