const inputData = Deno.readTextFileSync('./day2/input.txt'); 
const parsedData = inputData.split("\n"); 

const inputs = {
  simpleInput: "1-3 a: abcde",
  simpleInput2 : "1-3 b: cdefg",
  simpleInput3 : "2-9 c: ccccccccc",
  dataInput : parsedData
};

const input = inputs.dataInput;

const parseInput = (passwordString) => {
  const rangeRegex = /\d*-\d*/; 
  const charRegex = /\w:/;
  const passwordRgx = /\w+$/;
  const rangeString = passwordString.match(rangeRegex)[0]; 
  const charString = passwordString.match(charRegex)[0]; 
  const password = passwordString.match(passwordRgx)[0]; 
  return {
    positions : rangeString.split('-').map(ele => parseInt(ele)), 
    char : charString[0],
    password
  }
}

const isBetweenRange = (positions, charCount) => {
  const [start, end] = positions; 
  return charCount >= start && charCount <= end; 
}

const isValid = ({positions, char, password}) => {
  const charCount = password.split("").reduce((acc, ele) =>
     char === ele ? acc + 1 : acc, 0
)
  return isBetweenRange(positions, charCount); 
}

const isEitherOne = ({positions, char, password}) => 
  char === password[positions[0] - 1] ^ char === password[positions[1] - 1];

const isInPosition = (parsedInfo) => {
  if (isEitherOne(parsedInfo)) 
    return true; 
  return false 
}

const part1 = (input) => {
  const count =  input.reduce((countOfValidPassword, ele) => {
    const parsedInfo = parseInput(ele); 
    console.log(isValid(parsedInfo))
    return isValid(parsedInfo) ? countOfValidPassword + 1 : countOfValidPassword;
  }, 0 );
  return console.log(count); 
}


const part2 = (input) => {
    const count =  input.reduce((count, ele) => {
    const parsedInfo = parseInput(ele); 
    return isInPosition(parsedInfo) ? count + 1 : count;
  }, 0 );
  console.log(count); 
}

part2(input); 