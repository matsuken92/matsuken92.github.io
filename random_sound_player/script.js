const sounds = [
    'note_01_C.mp3',
    'note_02_Df.mp3',
    'note_03_D.mp3',
    'note_04_Ef.mp3',
    'note_05_E.mp3',
    'note_06_F.mp3',
    'note_07_Fs.mp3',
    'note_08_G.mp3',
    'note_09_Gs.mp3',
    'note_10_A.mp3',
    'note_11_Bf.mp3',
    'note_12_B.mp3'
];

const displayNames = {
    'note_01_C.mp3': 'C',
    'note_02_Df.mp3': 'D♭',
    'note_03_D.mp3': 'D',
    'note_04_Ef.mp3': 'E♭',
    'note_05_E.mp3': 'E',
    'note_06_F.mp3': 'F',
    'note_07_Fs.mp3': 'F#',
    'note_08_G.mp3': 'G',
    'note_09_Gs.mp3': 'G#',
    'note_10_A.mp3': 'A',
    'note_11_Bf.mp3': 'B♭',
    'note_12_B.mp3': 'B'
};

const playCounts = {};
const correctCounts = {};
const incorrectCounts = {};

sounds.forEach(sound => {
    playCounts[sound] = 0;
    correctCounts[sound] = 0;
    incorrectCounts[sound] = 0;
});

let currentSound = null;

document.getElementById('playButton').addEventListener('click', () => {
    playRandomSound();
    document.getElementById('playButton').disabled = true;
});

document.getElementById('replayButton').addEventListener('click', replaySound);
document.getElementById('correctButton').addEventListener('click', markCorrect);
document.getElementById('incorrectButton').addEventListener('click', markIncorrect);

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function getWeightedRandomSound() {
    const weights = sounds.map(sound => {
        const playCount = playCounts[sound];
        const incorrectCount = incorrectCounts[sound];
        const ratio = playCount > 0 ? incorrectCount / playCount : 0;
        return sigmoid(ratio);
    });

    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const randomValue = Math.random() * totalWeight;
    let cumulativeWeight = 0;

    for (let i = 0; i < sounds.length; i++) {
        cumulativeWeight += weights[i];
        if (randomValue < cumulativeWeight) {
            return sounds[i];
        }
    }
    return sounds[sounds.length - 1]; // Fallback in case of rounding errors
}

function playRandomSound() {
    if (Math.random() < 0.5) {
        currentSound = sounds[Math.floor(Math.random() * sounds.length)];
    } else {
        currentSound = getWeightedRandomSound();
    }

    const audio = new Audio(currentSound);
    audio.play();
    playCounts[currentSound]++;
    updateSoundList();
}

function replaySound() {
    if (currentSound) {
        const audio = new Audio(currentSound);
        audio.play();
    }
}

function markCorrect() {
    if (currentSound) {
        correctCounts[currentSound]++;
        playRandomSound();
    }
}

function markIncorrect() {
    if (currentSound) {
        incorrectCounts[currentSound]++;
        playRandomSound();
    }
}

function updateSoundList() {
    const soundList = document.getElementById('soundList');
    soundList.innerHTML = '';

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    const headers = ['音符', '再生回数', '正解回数', '不正解回数', '正解率'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    for (const sound of sounds) {
        const row = document.createElement('tr');

        const noteCell = document.createElement('td');
        noteCell.textContent = displayNames[sound];
        row.appendChild(noteCell);

        const playCountCell = document.createElement('td');
        playCountCell.textContent = playCounts[sound];
        row.appendChild(playCountCell);

        const correctCountCell = document.createElement('td');
        correctCountCell.textContent = correctCounts[sound];
        row.appendChild(correctCountCell);

        const incorrectCountCell = document.createElement('td');
        incorrectCountCell.textContent = incorrectCounts[sound];
        row.appendChild(incorrectCountCell);

        const accuracyCell = document.createElement('td');
        const playCount = playCounts[sound];
        const correctCount = correctCounts[sound];
        const accuracy = playCount > 0 ? (correctCount / playCount * 100).toFixed(2) + '%' : '-';
        accuracyCell.textContent = accuracy;
        row.appendChild(accuracyCell);

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    soundList.appendChild(table);
}

// 初期表示を行うために、ページ読み込み時に一度実行
updateSoundList();
