import fs from 'fs';

let allBoards = [];
let checkedBoards = [];

const loadBoards = callback => {
  fs.readdir('./src/assets/boards', (err, dir) => {
    console.log(dir)
    for (let i = 0, path; path = dir[i]; i++) {
      fs.readFile(`./src/assets/boards/${path}`, (err, data) => {
        if (err) throw err;
        const file = JSON.parse(data);
  
        allBoards.push({
          "file": file,
          "path": `./src/assets/boards/${path}`
        });
        if (file.checked) checkedBoards.push(file);
  
        if (i=== dir.length-1 && typeof callback === 'function') callback();
        console.log(allBoards)
        console.log(checkedBoards)
      });
    }
  });
}

export { allBoards, checkedBoards, loadBoards }