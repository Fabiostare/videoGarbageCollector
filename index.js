import fs from 'fs';
import path from 'path';

const dir = '/home/rodion/cafap-front-next/tmp/';

fs.readdir(dir, (err, files) => {
  if (err) {
    throw err;
  }
  if (files.length) {
    files.forEach(file => {
      const filePath = path.join(dir, file)
      fs.stat(filePath, (err, stat) => {
        if (err) {
          throw err;
        }
        const oneHour = 1000 * 60 * 60;
        const atimeMs = stat.atimeMs;

        console.log('date: ' + stat.atime);

        if (Date.now() > atimeMs + oneHour) {
          fs.unlink(filePath, (err) => {
            if (err) {
              throw err;
            }
            console.log(file + ' is deleted!');
          });
        }
      })
    })
  } else {
    console.log('no files found!');
  }
});
