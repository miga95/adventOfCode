import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const availableCubes = {
  red: 12,
  green: 13,
  blue: 14
};

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataPath = path.join(__dirname, 'data.txt')
const lines = fs.readFileSync(dataPath, "utf-8").trim().split("\n");

export function parseLine(line) {
  const draws = line.split(': ')[1].split('; ');
  
  return draws.map(draw => {
    const counts = { red: 0, green: 0, blue: 0 };
    
    draw.split(', ').forEach(part => {
      const [num, color] = part.split(' ');
      counts[color] = parseInt(num, 10);
    });

    return counts;
  });
}

export function isGamePossible(draws, available) {
  const cubes = { ...available };
  for (const draw of draws) {
    for (const color in draw) {
      if (draw[color] > cubes[color]) {
        return false; 
      }
      cubes[color] -= draw[color];
    }
  }

  return true;
}
let totalSumOfGamesPossibleId = 0
lines.forEach((line, index) => {
  const draws = parseLine(line);
  const possible = isGamePossible(draws, availableCubes);
  if(possible) totalSumOfGamesPossibleId++
  console.log(`Game ${index + 1} is ${possible ? 'possible' : 'not possible'}`);
});

console.log(totalSumOfGamesPossibleId);
