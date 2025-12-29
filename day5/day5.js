const inputs = {
  input1: "FBFBBFFRLR",
  input2: "FFFBBBFRRR",
  input3: "BBFFBBFRLL",
  questionInput: Deno.readTextFileSync("./day5/input.txt").split("\n"),
};

const input = inputs.questionInput;

const something = (lowerEnd, upperEnd, instruction) => {
  let mid = 0;

  for (let i = 0; i < instruction.length; i++) {
    const char = instruction[i];

    mid = Math.floor((upperEnd - lowerEnd) / 2) + lowerEnd;

    if (char === "F" || char === "L") upperEnd = mid;

    if (char === "B" || char === "R") {
      lowerEnd = mid;
      mid++;
    }
  }
  
  return mid;
};

const calculateSeatNumber = (boardingPass) => {
  const rowInstruction = boardingPass.slice(0, 7);
  const columnInstruction = boardingPass.slice(7);
  const rowNumber = something(0, 127, rowInstruction);
  const columnNumber = something(0, 7, columnInstruction);
  return (8 * rowNumber) + columnNumber;
}

const part1 = (boardingPasses) => {
  const seatNumbers = boardingPasses.map(boardingPass => 
    calculateSeatNumber(boardingPass)); 

  return seatNumbers.reduce((count, seatNumber) => 
    count > seatNumber ? count : seatNumber); 
};

const part2 = (boardingPasses) => {
  const seatNumbers = boardingPasses.map(boardingPass => 
    calculateSeatNumber(boardingPass)); 

  const sortedSeats = seatNumbers.sort((a, b) => a - b); 
  
  let seat = sortedSeats[0]; 
  let index = 0
  while (index < sortedSeats.length) {
    const element = sortedSeats[index]; 
    if (seat != element) {
      console.log({seat, element});
      return seat
    }; 
    seat++; 
    index++; 
  }
}


console.log(part2(input));
