const fs = require('fs');


let corpusData = "";

const corpusFiles = fs.readdirSync("corpus");

corpusFiles.forEach(corpusFile => {
    const content = fs.readFileSync("corpus/" + corpusFile);
    corpusData = corpusData.concat(content.toString());
})

//pre

corpusData = normalize(corpusData);

function normalize(str) {
    let result = str.replace(/#|`/g, '');
    result = result.replace(/-/g, ' ')
    result = result.replace(/\n/g, ' ');
    result = result.replace(/'/g, ' \'')
    result = result.replace(/\s+/g, ' ');

    return result;
}

sentenceArr = corpusData.split(/[.*:;?!,"&|()<>{}\[\]\r\n/\\]+/);

let wordVocab = [];
let uniGram = {};
let biGram = {};
let triGram = {};

let totalWord = 0;

sentenceArr.forEach(sentence => {
    sentence = sentence.toLowerCase();

    let words = sentence.split(" ");
    words = words.filter(word => {
        reg = /^[A-Za-z]+$/;
        return word.length > 0 && reg.test(word);
    });

    words.forEach(word => {
        if (wordVocab.indexOf(word) == -1) {
            wordVocab.push(word);
        }
        if (uniGram[word] != null) uniGram[word]++; else uniGram[word] = 1;
        totalWord++;
    });

    for (let i = 0; i <= words.length - 2; i++) {
        const bi = words.slice(i, i + 2).join(" ");
        if (biGram[bi] != null) biGram[bi]++; else biGram[bi] = 1;
    }

    for (let i = 0; i <= words.length - 3; i++) {
        const tri = words.slice(i, i + 3).join(" ");
        if (triGram[tri] != null) triGram[tri]++; else triGram[tri] = 1;
    }

});

const logger = fs.createWriteStream("output/vocab.txt", {
    flags: 'w'
});

logger.write(totalWord.toString());

for (const word of wordVocab) {
    logger.write("\n");
    logger.write(word);
}
logger.close();

writeLog(uniGram, "unigram.txt");
writeLog(biGram, "bigram.txt");
writeLog(triGram, "trigram.txt");

function writeLog(data, fileName) {
    const logger = fs.createWriteStream("output/" + fileName, {
        flags: 'w'
    });

    var start = true;

    for (let words in data) {
        if (!start) logger.write("\n");
        logger.write(words + ":" + data[words]);
        start = false;
    }
    logger.close();
}
//