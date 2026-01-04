import { intersect, union } from "@std/collections";

const questionInput = Deno.readTextFileSync("./day6/input.txt");
const smallInput = Deno.readTextFileSync("./day6/small_input.txt");

const parseGroupsData = (data) =>
  data.split("\n\n").map((groups) => groups.split("\n"));

const findUniqueYesAnswers = (groupsYesAnswers) => 
  groupsYesAnswers.map((individualYesAnswers) => 
    individualYesAnswers.reduce((acc, ele) => union(acc, ele)).length
  );

const part1 = (data) => {
  const groupsYesAnswers = parseGroupsData(data);
  const uniqueYesAnswers = findUniqueYesAnswers(groupsYesAnswers);
  return uniqueYesAnswers.reduce((count, ele) => count + ele);
};

const findCommonYesAnswers = (groupsYesAnswers) => 
  groupsYesAnswers.map((individualYesAnswers) => 
    individualYesAnswers.reduce((acc, ele) => intersect(acc, ele)).length
  );

const part2 = (data) => {
  const groupsYesAnswers = parseGroupsData(data);
  const commonYesAnswers = findCommonYesAnswers(groupsYesAnswers);
  return commonYesAnswers.reduce((count, ele) => count + ele);
};

console.log(part2(questionInput));
