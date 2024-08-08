import assert from 'assert'
import { isValidPosition, sumPartNumbers, calculateSumFromFile } from '../day3/index.js'
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

assert.strictEqual(isValidPosition(0, 0, 10, 10), true);
assert.strictEqual(isValidPosition(9, 9, 10, 10), true);
assert.strictEqual(isValidPosition(10, 10, 10, 10), false);
assert.strictEqual(isValidPosition(-1, 5, 10, 10), false);
assert.strictEqual(isValidPosition(5, -1, 10, 10), false);



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('sumPartNumbers', () => {
  const testFilePath = path.join(__dirname, 'testData.txt');

  before(() => {
    fs.writeFileSync(testFilePath, ' 467..114..\n ...*......\n ..35..633.\n ......#...\n 617*......\n .....+.58.\n ..592.....\n ......755.\n ...$.*....\n .664.598..');
  });
  it('should correctly sum the part numbers in testData.txt', async () => {
    const sumPartNumber = calculateSumFromFile(testFilePath, (err, res) => {
        assert.strictEqual(res, 4361);
    })

  });

  after(() => {
    fs.unlinkSync(testFilePath);
  });
});
