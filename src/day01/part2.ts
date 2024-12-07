// Advent of Code - Day 1 - Part Two

export function part2(input: string): number {
  const left: number[] = [];
  const right: number[] = [];
  const lines = input.split("\n");
  for (const line of lines) {
    const nums = line.split("   ").map((num) => parseInt(num));
    left.push(nums[0]);
    right.push(nums[1]);
  }

  // go over the right array and create an object where the key is the value in the array, and the value is the number of times this value appears in the array
  const rightMap: Record<number, number> = {};
  for (const num of right) {
    if (rightMap[num]) {
      rightMap[num]++;
    } else {
      rightMap[num] = 1;
    }
  }

  let sum = 0;
  for (const num of left) {
    if (rightMap[num]) {
      sum += num * rightMap[num];
    }
  }
  return sum;
}
