const inputData = Deno.readTextFileSync('./day1/input.txt'); 
const parsedData = inputData.split("\n").map(num => parseInt(num)); 

const inputs = {
  expenseReportTest: [1721, 979, 366, 299, 675, 1456],
  dataInput : parsedData
};

const input = inputs.dataInput;

const isSumEqualTo2020 = (num1, num2) => 
  num1 + num2 === 2020 

const twoEntriesWithSum2020 = (input, total) => {
  for (let i = 0; i < input.length; i++) {
    const num1 = input[i]; 
    const num2 = total - num1;
    if (input.find((num1) => num1 === num2)) {
      return [num1, num2]; 
    }
  }
};


const ThreeEntriesWithSum2020 = (input, total) => {
  for (let i = 0; i < input.length; i++) {
    const temp = total - input[i]; 
    // console.log({temp}); 
    const result = twoEntriesWithSum2020(input, temp);
    // console.log({result : [temp, result]}); 
    if (result != undefined) return [input[i], ...result]; 
  }
};

const part1 = (input) => {
  const [num1, num2] = twoEntriesWithSum2020(input, 2020);
  return num1 * num2; 
};


const part2 = (input) => {
  const [num1, num2, num3] = ThreeEntriesWithSum2020(input, 2020);
  return num1 * num2 * num3; 
};

// console.log(part1(input)); 
// ThreeEntriesWithSum2020(input, 2020); 
console.log(part2(input, 2020)); 
