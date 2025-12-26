const input =
  "..##.......\n#...#...#..\n.#....#..#.\n..#.#...#.#\n.#...##..#.\n..#.##.....\n.#.#.#....#\n.#........#\n#.##...#...\n#...##....#\n.#..#...#.#";

const input2 =
  "..##.........##.........##.........##.........##.........##.......\n#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..\n.#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.\n..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#\n.#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.\n..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....\n.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#\n.#........#.#........#.#........#.#........#.#........#.#........#\n#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...\n#...##....##...##....##...##....##...##....##...##....##...##....#\n.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#";

const dataInput = Deno.readTextFileSync("./day3/input.txt");

const stringToScreen = (input) => input.split("\n").map((ele) => ele.split(""));

const getStringInfo = (input) => {
  const screen = stringToScreen(input);
  return {
    screen,
    heigth: screen.length,
    width: screen[0].length,
  };
};

const drawScreen = (screen) => {
  console.log(screen.map((ele) => ele.join("")).join("\n"));
};

const moveSlop = ({ screen, width }, info, {right, down}) => {
  for (let i = 1; i <= right; i++) {
    info.x = info.x + 1;
    info.x = info.x % width;
    // if (screen[info.y][info.x] === "#") info.treesCount++;
  }
  for (let j = 1; j <= down; j++) {
    info.y = info.y + 1;
    // if (screen[info.y][info.x] === "#") info.treesCount++;
  }
  if (screen[info.y][info.x] === "#") info.treesCount++;
};

const part1 = (input, slope) => {
  const {screen, heigth, width} = getStringInfo(input);
  drawScreen(screen); 
  const info = {
    x: 0,
    y: 0,
    treesCount: 0,
  };

  while (info.y + 1 <= heigth - slope.down) {
    moveSlop({screen, width}, info, slope); 
    screen[info.y][info.x] = "O"; 
    drawScreen(screen);
    console.log("treesCount : ", info.treesCount);
  }

  return info.treesCount; 
};

const part2 = (input) => {
  const slopes = [
    {right : 1, down : 1}, 
    {right : 3, down : 1}, 
    {right : 5, down : 1}, 
    {right : 7, down : 1}, 
    {right : 1, down : 2}
  ]

  return {
    multiplication : slopes.reduce((acc, ele) => acc * part1(input, ele), 1),
  }

}

console.log(part2(dataInput));
