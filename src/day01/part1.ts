// Advent of Code - Day 1 - Part One

export function part1(input: string): number {
  // go over line by line and split put each of the two numbers into a min-heap array
  const left: number[] = [];
  const right: number[] = [];
  const lines = input.split("\n");
  for (const line of lines) {
    const nums = line.split("   ").map((num) => parseInt(num));
    left.push(nums[0]);
    right.push(nums[1]);
  }

  right.sort((a, b) => a - b);
  left.sort((a, b) => a - b);

  let sum = 0;

  for (let i = 0; i < left.length; i++) {
    if (!Number.isNaN(Math.abs(left[i] - right[i]))) {
      sum += Math.abs(left[i] - right[i]);
    }
  }

  return sum;
}

// Min-heap implementation in typescript
