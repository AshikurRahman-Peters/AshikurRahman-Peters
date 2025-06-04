const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';

const makeCommit = n => {
    if (n === 0) return simpleGit().push();

    const x = Math.floor(Math.random() * 55); // 0–54 weeks
    const y = Math.floor(Math.random() * 7);  // 0–6 days

    const DATE = moment().subtract(1, 'y').add(x, 'w').add(y, 'd').format();
    const data = { date: DATE };

    console.log(`Commit #${n} on ${DATE}`);

    jsonfile.writeFile(FILE_PATH, data, () => {
        simpleGit().add(FILE_PATH).commit(DATE, { '--date': DATE }, () => {
            makeCommit(n - 1);
        });
    });
};

makeCommit(100);
