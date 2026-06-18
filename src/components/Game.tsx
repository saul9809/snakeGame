import * as React from "react";
import { JSX } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "../style/colors";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Coordinate, Direction, GestureEventType } from "../types/types";

// -- Const games rules
const SNAKE_INITIAL_POSITION = [{ x: 10, y: 10 }];
const FOOD_INITIAL_POSITION = { x: 20, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 30, yMin: 0, yMax: 63 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

export default function Game(): JSX.Element {
  // -- Variables for game state
  const [direction, setDirection] = React.useState<Direction>(Direction.Right);
  const [snake, setSnake] = React.useState<Coordinate[]>(
    SNAKE_INITIAL_POSITION,
  );
  const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
  const [isPause, setIsPaused] = React.useState<boolean>(false);
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
  return (
    <GestureDetector gesture={panGesture}>
      <SafeAreaProvider style={styles.container}></SafeAreaProvider>
    </GestureDetector>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
