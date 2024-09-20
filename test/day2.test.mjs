import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseLine, isGamePossible } from '../day2/index.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const availableCubes = {
  red: 12,
  green: 13,
  blue: 14
};


describe('Game Feasibility Test', () => {
  let lines;

  before(() => {
    const data = path.join(__dirname, 'day2data.txt');
    lines = fs.readFileSync(data, "utf-8").trim().split("\n");
  });

  it('should correctly identify feasible games', () => {
    const results = lines.map((line, index) => {
      const draws = parseLine(line);
      return isGamePossible(draws, availableCubes);
    });

    expect(results).to.deep.equal([true, true, false, false, true]);
  });

});
