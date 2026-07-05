import { Coordinate, FoodType } from "../types/types";

const getRandomFruitEmoji = (): string => {
  const fruits = ["🍎", "🍊", "🍋", "🍇", "🍓", "🍆", "🥑"];
  return fruits[Math.floor(Math.random() * fruits.length)];
};

export const randomFoodPosition = (
  maxX: number,
  maxY: number,
  snake: Coordinate[] = [],
): FoodType => {
  let newFood: Coordinate;
  let isOnSnake: boolean;

  do {
    newFood = {
      x: Math.floor(Math.random() * (maxX + 1)),
      y: Math.floor(Math.random() * (maxY + 1)),
    };
    isOnSnake = snake.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y,
    );
  } while (isOnSnake);

  return {
    ...newFood,
    emoji: getRandomFruitEmoji(),
  };
};
