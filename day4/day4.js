const small_input = Deno.readTextFileSync("./day4/small_input.txt"); 
const questionInput = Deno.readTextFileSync("./day4/input.txt"); 


const parsePasswordsString = (input) => 
  input.split("\n\n").map(str => str.split(/\s/));

const getEntries = (keyValueStr) => {
  return keyValueStr.split(":"); 
}

const isValidPassport = (passport) => { 
  const entries = passport.map(getEntries); 
  const passportObj = Object.fromEntries(entries); 
  const inputKeys = Object.keys(passportObj);  
  const validKeys = ["hcl", "iyr", "eyr", "ecl", "pid", "byr", "hgt"]; 
  for (let i = 0; i < validKeys.length; i++) {
    const key = validKeys[i];  
    if (!(inputKeys.includes(key))) return false;
  }
  return true; 
}

const part1 = (input) => {
  const passports = parsePasswordsString(input);  
  return passports.reduce((count, passport) => 
    isValidPassport(passport) ? count + 1 : count, 0); 
}

const inBetween = (value, lowerEnd, upperEnd) => 
  value >= lowerEnd && value <= upperEnd;

const isBYRValid = (yearInString) => {
  const year = parseInt(yearInString);
  return inBetween(year, 1920, 2002);
}

const isIYRValid = (yearInString) => {
  const year = parseInt(yearInString);
  return inBetween(year, 2010, 2020); 
}

const isEYRValid = (yearInString) => {
  const year = parseInt(yearInString);
  return inBetween(year, 2020, 2030);  
}

const isHGTValid = (heightString) => {
  const unit = heightString.slice(-2); 
  console.log(unit); 
  const numberString = heightString.slice(0, heightString.length - 2); 
  const height = parseInt(numberString); 
  if (unit === "cm") return inBetween(height, 150, 193);  
  if (unit === "in") return inBetween(height, 59, 76); 
}

const isHCLValid = (hcl) => {
  return /#[0-9a-f]{5}/.test(hcl);
}

const isECLValid = (hcl) => {
  const validECLs = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]; 
  return validECLs.includes(hcl); 
}

const isPIDValid = (pid) => {
  if (pid.length > 9) return false; 
  return /[0-9]{9}/.test(pid);
}

const dataValidationFns = {
  "byr" : isBYRValid,
  "iyr" : isIYRValid,
  "eyr" : isEYRValid, 
  "hgt" : isHGTValid,
  "hcl" : isHCLValid, 
  "ecl" : isECLValid, 
  "pid" : isPIDValid
}


const isValidPassport2 = (passport) => { 
  const entries = passport.map(getEntries); 
  const passportObj = Object.fromEntries(entries); 
  const inputKeys = Object.keys(passportObj);  
  const validKeys = ["hcl", "iyr", "eyr", "ecl", "pid", "byr", "hgt"]; 
  for (let i = 0; i < validKeys.length; i++) {
    const key = validKeys[i]; 
    const isValidData =  dataValidationFns[key]; 

    if (!(inputKeys.includes(key) && isValidData(passportObj[key]))) return false;
  }
  return true; 
}

const part2 = (input) => {
  const passports = parsePasswordsString(input);  
  return passports.reduce((count, passport) => 
    isValidPassport2(passport) ? count + 1 : count, 0); 
}


console.log(part2(questionInput)); 