export interface Coordinate {
  x: number;
  y: number;
}
export interface FoodType extends Coordinate {
  emoji: string;
}
export enum Direction {
  Right,
  Left,
  Up,
  Down,
}
