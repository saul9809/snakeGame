export interface Coordinate {
  x: number;
  y: number;
}
// -- Pendiente a investigar
export interface FoodType extends Coordinate {
  emoji: string;
}
export enum Direction {
  Right,
  Left,
  Up,
  Down,
}
