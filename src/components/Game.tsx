import * as React from "react";
import { JSX } from "react";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "../style/colors";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Coordinate, Direction, FoodType } from "../types/types";
import Snake from "./Snake";
import { checkGameOver } from "../utils/checkGameOver";
import Food from "./Food";
import { checkEatsFood } from "../utils/checkEatsFood";
import { randomFoodPosition } from "../utils/randomFoodPosition";
import Header from "./Header";

// -- Constantes inicializadas
const SNAKE_INITIAL_POSITION = [{ x: 10, y: 10 }];
const FOOD_INITIAL_POSITION = { x: 20, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 75 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

// -- Método fruta random
const getRandomFruitEmoji = (): string => {
  const fruits = ["🍎", "🍊", "🍋", "🍇", "🍓", "🍆", "🥑"];
  return fruits[Math.floor(Math.random() * fruits.length)];
};

export default function Game(): JSX.Element {
  // -- Variables principales de estado
  const [direction, setDirection] = React.useState<Direction>(Direction.Right);
  const [snake, setSnake] = React.useState<Coordinate[]>(
    SNAKE_INITIAL_POSITION,
  );
  const [food, setFood] = React.useState<FoodType>({
    ...FOOD_INITIAL_POSITION,
    emoji: getRandomFruitEmoji(),
  });
  const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const [score, setScore] = React.useState<number>(0);

  const checkSelfCollision = (
    head: Coordinate,
    snakeBody: Coordinate[],
  ): boolean => {
    for (let i = 1; i < snakeBody.length; i++) {
      if (snakeBody[i].x === head.x && snakeBody[i].y === head.y) {
        return true;
      }
    }
    return false;
  };

  const moveSnake = () => {
    setSnake((prevSnake) => {
      const snakeHead = prevSnake[0];
      const newHead = { ...snakeHead };

      switch (direction) {
        case Direction.Up:
          newHead.y -= 1;
          break;
        case Direction.Down:
          newHead.y += 1;
          break;
        case Direction.Left:
          newHead.x -= 1;
          break;
        case Direction.Right:
          newHead.x += 1;
          break;
        default:
          break;
      }

      if (checkGameOver(newHead, GAME_BOUNDS)) {
        setIsGameOver(true);
        return prevSnake;
      }

      if (prevSnake.length > 1 && checkSelfCollision(newHead, prevSnake)) {
        setIsGameOver(true);
        return prevSnake;
      }

      if (checkEatsFood(newHead, food, 2)) {
        const newFood = randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax, [
          newHead,
          ...prevSnake,
        ]);
        setFood(newFood);
        setScore((prev) => prev + SCORE_INCREMENT);
        return [newHead, ...prevSnake];
      } else {
        return [newHead, ...prevSnake.slice(0, -1)];
      }
    });
  };

  React.useEffect(() => {
    if (!isPaused && !isGameOver) {
      const interval = setInterval(() => moveSnake(), MOVE_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [isPaused, isGameOver, direction, food]);

  const panGesture = Gesture.Pan().onUpdate((event) => {
    const { translationX, translationY } = event;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      setDirection(translationX > 0 ? Direction.Right : Direction.Left);
    } else {
      setDirection(translationY > 0 ? Direction.Down : Direction.Up);
    }
  });

  const pauseGame = () => setIsPaused(!isPaused);
  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood({
      ...FOOD_INITIAL_POSITION,
      emoji: getRandomFruitEmoji(),
    });
    setIsGameOver(false);
    setIsPaused(false);
    setScore(0);
    setDirection(Direction.Right);
  };

  return (
    <GestureDetector gesture={panGesture}>
      <SafeAreaProvider style={styles.container}>
        <Header
          isPause={isPaused}
          pauseGame={pauseGame}
          reloadGame={reloadGame}
        >
          <Text style={styles.score}>{score}</Text>
        </Header>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} emoji={food.emoji} />
        </View>
      </SafeAreaProvider>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  boundaries: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Colors.background,
  },
  score: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
  },
});
