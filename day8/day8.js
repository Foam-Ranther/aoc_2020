const inputs = {
  test_input: Deno.readTextFileSync("./day8/test_input.txt"),
  questionInput: Deno.readTextFileSync("./day8/input.txt"),
};

const input = inputs.test_input;

const parseInstructionString = (input) => input.split("\n");

const parseInstruction = (instruction) => {
  const instructionArr = instruction.split(" ");
  return {
    instruction: instructionArr[0],
    argument: parseInt(instructionArr[1]),
  };
};

// const instructions = {
//   'nop' : (argument) =>
// }

const part1 = (input) => {
  const parsedInstructions = parseInstructionString(input);
  let index = 0;
  let acc = 0;
  while (index < parsedInstructions.length ) {
    if (acc === 5) return acc
    const instructionStr = parsedInstructions[index];
    const instructionObj = parseInstruction(instructionStr);
    if (instructionObj.instruction === "nop") {
      index++;
    }
    if (instructionObj.instruction === "acc") {
      acc += instructionObj.argument;
      index++;
    }
    if (instructionObj.instruction === "jmp") {
      // if (instructionObj.argument < 0) return acc; 
      index += instructionObj.argument;
    }
    console.log(acc);
  }

  return acc;
};

console.log(part1(input));
