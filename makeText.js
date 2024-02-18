/** Command-line tool to generate Markov text. */
const { Markov } = require('./markov')
const fs = require('fs');
const axios = require('axios')

const type = process.argv[2]
const path = process.argv[3]


const fnMap = {
    'file': function () {
        fs.readFile(`./${path}`, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                process.exit(1)
            } else {
                const mm = new Markov(data);
                return mm.makeText()
            }
        })
    },
    'url': async function () {
        try {
            const res = await axios.get(`${path}`)
            const mm = new Markov(res.data);
            return mm.makeText()
        } catch (e) {
            console.log(e)
            process.exit(1)
        }
    }
}

async function run() {
    if (type === 'file' || type === 'url') {
        let text = await fnMap[type]();
        return text;
    } else {
        console.log(process.argv)
        console.log('file or url type flag expected, please retry with correct flag. EX. makeText.js file eggs.txt');
        process.exit(1);

    }
}

run()

module.exports = {
    'type': type,
    'path': path,
    'fnMap': fnMap,
    'run': run
}



