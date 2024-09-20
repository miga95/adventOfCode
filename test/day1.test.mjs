import { expect } from 'chai';
import { processFile } from '../day1/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, 'day1data.txt');

describe('processFile', () => {
  
  it('should correctly sum the numbers in the file', async () => {
    const res = await processFile(dataPath)
    expect(res).to.equal(53651);
  });

});