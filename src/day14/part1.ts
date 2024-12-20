// Advent of Code - Day 14 - Part One

class Robot {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }
}

function parseRobot(line) {
  // Parse a line like 'p=x,y v=vx,vy' into a Robot object
  const [pos, vel] = line.split(" ");
  const [x, y] = pos.replace("p=", "").split(",").map(Number);
  const [vx, vy] = vel.replace("v=", "").split(",").map(Number);
  return new Robot(x, y, vx, vy);
}

function simulateStep(robot, width, height) {
  // Move robot one step, handling wrapping at boundaries
  robot.x = (((robot.x + robot.vx) % width) + width) % width; // Handle negative numbers
  robot.y = (((robot.y + robot.vy) % height) + height) % height;
}

function countRobotsInQuadrants(robots, width, height) {
  // Count robots in each quadrant, excluding those on middle lines
  const midX = Math.floor(width / 2);
  const midY = Math.floor(height / 2);
  let [q1, q2, q3, q4] = [0, 0, 0, 0];

  for (const robot of robots) {
    // Skip robots on middle lines
    if (robot.x === midX || robot.y === midY) {
      continue;
    }

    if (robot.x < midX) {
      if (robot.y < midY) {
        q1++; // Top-left
      } else {
        q3++; // Bottom-left
      }
    } else {
      if (robot.y < midY) {
        q2++; // Top-right
      } else {
        q4++; // Bottom-right
      }
    }
  }

  return [q1, q2, q3, q4];
}

function simulateRobots(inputData, width, height, steps) {
  // Parse input
  const robots = inputData.trim().split("\n").map(parseRobot);

  // Simulate movement
  for (let i = 0; i < steps; i++) {
    for (const robot of robots) {
      simulateStep(robot, width, height);
    }
  }

  // Count robots in quadrants
  const [q1, q2, q3, q4] = countRobotsInQuadrants(robots, width, height);

  // Calculate safety factor
  return q1 * q2 * q3 * q4;
}

export function part1(input: string): number {
  return simulateRobots(input, 101, 103, 100);
}
