import * as React from "react";
import { JSX } from "react";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "../style/colors";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Coordinate, Direction, GestureEventType } from "../types/types";
import Snake from "./Snake";
import { checkGameOver } from "../utils/checkGameOver";
import Food from "./Food";
import { checkEatsFood } from "../utils/checkEatsFood";
import { randomFoodPosition } from "../utils/randomFoodPosition";
import Header from "./Header";

// -- Constants for the game
const SNAKE_INITIAL_POSITION = [{ x: 10, y: 10 }];
const FOOD_INITIAL_POSITION = { x: 20, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 30, yMin: 0, yMax: 71 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

export default function Game(): JSX.Element {
  // -- Game state variables
  const [direction, setDirection] = React.useState<Direction>(Direction.Right);
  const [snake, setSnake] = React.useState<Coordinate[]>(
    SNAKE_INITIAL_POSITION,
  );
  const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
  const [isPause, setIsPaused] = React.useState<boolean>(false);
  const [score, setScore] = React.useState<number>(0);

  // -- Update movemnet every 50s
  React.useEffect(() => {
    if (!isPause && !isGameOver) {
      const interval = setInterval(() => {
        moveSnake();
      }, MOVE_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [isPause, isGameOver]);

  // -- Move the snake in the current direction
  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead };
    // -- Check if the snake has hit the boundaries
    if (checkGameOver(newHead, GAME_BOUNDS)) {
      setIsGameOver((prev) => !prev);
      return;
    }
    // -- Move the snake based on the current direction
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
    // -- Check if the snake has eaten the food
    if (checkEatsFood(newHead, food, 2)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setSnake([newHead, ...snake]);
      setScore(score + SCORE_INCREMENT);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };
  // -- Manage screen gesture
  const panGesture = Gesture.Pan().onUpdate((event: GestureEventType) => {
    const { translationX, translationY } = event;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        setDirection(Direction.Right);
      } else {
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        setDirection(Direction.Down);
      } else {
        setDirection(Direction.Up);
      }
    }
  });
  const pauseGame = () => {
    setIsPaused(!isPause);
  };
  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setIsGameOver(false);
    setIsPaused(false);
    setScore(0);
    setDirection(Direction.Right);
  };
  // -- Handle the pan gesture
  return (
    <GestureDetector gesture={panGesture}>
      <SafeAreaProvider style={styles.container}>
        <Header isPause={isPause} pauseGame={pauseGame} reloadGame={reloadGame}>
          <Text style={styles.score}>{score}</Text>
        </Header>
        <View style={styles.bundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
      </SafeAreaProvider>
    </GestureDetector>
  );
}
// -- Styles for the game container and boundaries
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  bundaries: {
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
