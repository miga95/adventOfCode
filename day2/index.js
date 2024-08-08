import fs from 'fs';

const availableCubes = {
  red: 12,
  green: 13,
  blue: 14
};

const lines = fs.readFileSync('./data.txt', "utf-8").trim().split("\n");

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
  console.log(draws);
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

lines.forEach((line, index) => {
  const draws = parseLine(line);
  const possible = isGamePossible(draws, availableCubes);
  console.log(`Game ${index + 1} is ${possible ? 'possible' : 'not possible'}`);
});
