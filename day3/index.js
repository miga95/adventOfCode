import fs from 'fs'

export function isValidPosition(x, y, rows, cols) {
    return x >= 0 && y >= 0 && x < rows && y < cols;
}

export function isAdjacentToSymbol(x, y, rows, cols, schematic) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    for (let [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (isValidPosition(newX, newY, rows, cols) &&
            ['*', '#', '+', '$'].includes(schematic[newX][newY])) {
            return true;
        }
    }
    return false;
}

export function sumPartNumbers(schematic) {
    const rows = schematic.length;
    const cols = schematic[0].length;
    let partSum = 0;

    for (let i = 0; i < rows; i++) {
        let j = 0;
        while (j < cols) {
            if (schematic[i][j] >= '0' && schematic[i][j] <= '9') {
                let numberStr = '';
                let startJ = j;

                while (j < cols && schematic[i][j] >= '0' && schematic[i][j] <= '9') {
                    numberStr += schematic[i][j];
                    j++;
                }

                const number = parseInt(numberStr, 10);

                let isPartNumber = false;
                for (let k = startJ; k < j; k++) {
                    if (isAdjacentToSymbol(i, k, rows, cols, schematic)) {
                        isPartNumber = true;
                        break;
                    }
                }

                if (isPartNumber) {
                    partSum += number;
                }
            } else {
                j++;
            }
        }
    }

    return partSum;
}

export function calculateSumFromFile(filename, callback) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }

        const schematic = data.trim().split('\n').map(line => line.split(''));

        const result = sumPartNumbers(schematic);
        callback(null, result);
    });
}

calculateSumFromFile('data.txt', (err, result) => {
    if (err) {
        console.error('Erreur de lecture du fichier:', err);
    } else {
        console.log("La somme de tous les 'part numbers' est:", result);
    }
});
