import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export function processFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      const lines = data.split("\n");
      let totalSum = 0;

      lines.forEach((line) => {
        let cleanedLine = "";

        for (let char of line) {
          if (!isNaN(char) && char !== " ") {
            cleanedLine += char;
          }
        }

        let number;
        if (cleanedLine.length === 1) {
          // Si un seul chiffre, on le compte deux fois
          number = parseInt(cleanedLine + cleanedLine);
        } else if (cleanedLine.length > 1) {
          // Si plusieurs chiffres, on prend le premier et le dernier
          const firstChar = cleanedLine.charAt(0);
          const lastChar = cleanedLine.charAt(cleanedLine.length - 1);
          number = parseInt(firstChar + lastChar);
        } else {
          // Pas de chiffre, on passe
          number = 0;
        }

        totalSum += number;
      });

      resolve(totalSum);
    });
  });
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, 'data.txt');
const result = await processFile(dataPath); 
console.log(`Le total calculé est: ${result}`);

