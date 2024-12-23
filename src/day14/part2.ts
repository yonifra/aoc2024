interface Robot {
  pos: [number, number];
  vel: [number, number];
}

export function part2(input: string): number {
  const buildMatrix = (robots: Robot[], n: number, m: number): string[][] => {
    const mat = Array.from({ length: n }, () => Array(m).fill("."));
    for (const r of robots) {
      mat[r.pos[0]][r.pos[1]] = "#";
    }
    return mat;
  };

  const longestLine = (mat: string[][]): number => {
    let longest = 0;

    // Check rows
    for (let i = 0; i < mat.length; i++) {
      let cnt = 0;
      for (let j = 0; j < mat[i].length; j++) {
        if (mat[i][j] === "#") {
          cnt++;
        } else {
          longest = Math.max(longest, cnt);
          cnt = 0;
        }
      }
      longest = Math.max(longest, cnt);
    }

    // Check columns
    for (let j = 0; j < mat[0].length; j++) {
      let cnt = 0;
      for (let i = 0; i < mat.length; i++) {
        if (mat[i][j] === "#") {
          cnt++;
        } else {
          longest = Math.max(longest, cnt);
          cnt = 0;
        }
      }
      longest = Math.max(longest, cnt);
    }

    return longest;
  };

  const printRobots = (robots: Robot[], n: number, m: number): void => {
    const mat = buildMatrix(robots, n, m);
    for (const line of mat) {
      console.log(line.join(""));
    }
    console.log("\n");
  };

  const robots: Robot[] = input.split("\n").map((line) => {
    const [p, v] = line.split(" ");
    const [px, py] = p.split("=")[1].split(",").map(Number);
    const [vx, vy] = v.split("=")[1].split(",").map(Number);
    return { pos: [px, py], vel: [vx, vy] };
  });

  const m = 103;
  const n = 101;
  const iterations = 100000;
  let longest = 0;
  let longestIter = 0;

  for (let i = 0; i < iterations; i++) {
    for (const r of robots) {
      r.pos[0] = (r.pos[0] + r.vel[0] + n) % n;
      r.pos[1] = (r.pos[1] + r.vel[1] + m) % m;
    }

    const mat = buildMatrix(robots, n, m);
    const longestLineNow = longestLine(mat);
    if (longestLineNow > longest) {
      longest = longestLineNow;
      longestIter = i;
    }
  }

  return longestIter + 1;
}
