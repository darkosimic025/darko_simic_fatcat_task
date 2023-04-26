import { Coordinate } from '/types/common';

export function parseCoordinate(coordStr: string): Coordinate {
  const [xStr, yStr] = coordStr.split(',');
  const x = parseInt(xStr.trim(), 10);
  const y = parseInt(yStr.trim(), 10);
  return [x, y];
}
