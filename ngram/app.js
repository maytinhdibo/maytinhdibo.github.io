var data = {
    uniGram: {},
    biGram: {},
    triGram: {}
}

var totalWord = 0;

var wordVocab = [];

init();

async function init() {
    await readData("uniGram", "unigram.txt");
    await readData("biGram", "bigram.txt");
    await readData("triGram", "trigram.txt");
    await readVocab();

    document.querySelector("#loading").style.display = "none";
}

async function readVocab() {
    await fetch("output/vocab.txt").then(function (response) {
        return response.text();
    })
        .then(function (text) {
            var lines = text.split("\n");
            totalWord = lines[0];
            lines = lines.slice(1, lines.length - 1);
            for (const line of lines) {
                wordVocab.push(line);
            }
        });;
}

async function readData(variable, fileName) {
    await fetch("output/" + fileName).then(function (response) {
        return response.text();
    })
        .then(function (text) {
            const lines = text.split("\n");
            for (const line of lines) {
                const lineData = line.split(":");
                data[variable][lineData[0]] = lineData[1];
            }
        });;
}

function pUni(word) {
    return data.uniGram[word] / totalWord || 0;
}

function pBi(word1, word2) {
    const words = [word1, word2].join(" ");
    return data.biGram[words] / data.uniGram[word1] || 0;
}

function pTri(word1, word2, word3) {
    const words = [word1, word2, word3].join(" ");
    return data.triGram[words] / data.biGram[[word1, word2].join(" ")] || 0;
}

function normalize(str) {
    let result = str.replace(/#|`/g, '');
    result = result.replace(/-/g, ' ')
    result = result.replace(/\n/g, ' ');
    result = result.replace(/'/g, ' \'')
    result = result.replace(/\s+/g, ' ');

    return result;
}

const resultDisplay = document.querySelector("#result");
const inputText = document.querySelector("#input");

var typingTimer;
var doneTypingInterval = 100;

inputText.addEventListener("keyup", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(run, doneTypingInterval);
});

inputText.addEventListener("keydown", () => {
    clearTimeout(typingTimer);
});


function run() {
    let result = [];

    var input = inputText.value;

    input = input.trim();

    const wordsInput = normalize(input).split(" ");
    const iWord1 = wordsInput[wordsInput.length - 1];
    const iWord2 = wordsInput[wordsInput.length - 2];

    console.log(iWord1);
    console.log(iWord2);

    wordVocab.forEach(word => {
        const p = 0.01 * pUni(word) + 0.4 * pBi(iWord1, word) + 0.5 * pTri(iWord2, iWord1, word);

        result.push({
            word: word,
            p
        })
    })

    result.sort(function (a, b) {
        return b.p - a.p;
    });

    resultDisplay.innerHTML = "";
    result.splice(0, 5).forEach(data => {
        resultDisplay.innerHTML += "<span>" + data.word + "</span>";
    });
}