// Advent of Code - Day 2 - Part One
export function part1(input: string): number {
  const lines = input.split("\n");
  let safeLines = 0;

  for (const line of lines) {
    const items = line.split(" ").map((i) => parseInt(i, 10));
    safeLines += isSafe(items) ? 1 : 0;
  }

  return safeLines;
}

function isSafe(items: number[]): boolean {
  if (isNaN(items[0])) return false;
  let isValid = true;
  const isDescending = items[0] < items[1];

  for (let i = 0; i < items.length - 1; i++) {
    const diff = Math.abs(items[i] - items[i + 1]);
    if (diff < 1 || diff > 3) {
      isValid = false;
      break;
    }

    if (isDescending && items[i] > items[i + 1]) {
      isValid = false;
      break;
    }
  }

  return isValid;
}
