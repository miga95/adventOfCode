import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const availableCubes = {
  red: 12,
  green: 13,
  blue: 14
};

function parseLine(line) {
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

function isGamePossible(draws, available) {
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

describe('Game Feasibility Test', () => {
  let lines;

  before(() => {
    const filePath = path.join(__dirname, 'testData.txt');
    const fileContent = `
      Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
      Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
      Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
      Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
      Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
    `.trim();

    // Écrire ce contenu dans un fichier temporaire
    fs.writeFileSync(filePath, fileContent, 'utf-8');

    // Lire le fichier simulé
    lines = fs.readFileSync(filePath, "utf-8").trim().split("\n");
  });

  it('should correctly identify feasible games', () => {
    const results = lines.map((line, index) => {
      const draws = parseLine(line);
      return isGamePossible(draws, availableCubes);
    });

    expect(results).to.deep.equal([true, true, false, false, true]);
  });

  after(() => {
    const filePath = path.join(__dirname, 'testData.txt');
    fs.unlinkSync(filePath);
  });
});
