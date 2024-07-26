import { expect } from 'chai';
import { processFile } from '../ex1.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('processFile', () => {
  const testFilePath = path.join(__dirname, 'testData.txt');

  before(() => {
    fs.writeFileSync(testFilePath, '1abc2\n pqr3stu8vwx\n a1b2c3d4e5f \n treb7uchet');
  });

  it('should correctly sum the numbers in the file', async () => {
    const res = await processFile(testFilePath)
    expect(res).to.equal(142);
  });

  after(() => {
    fs.unlinkSync(testFilePath);
  });
});