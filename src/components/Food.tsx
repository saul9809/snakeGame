import React, { JSX } from "react";
import { Text, StyleSheet } from "react-native";

interface FoodProps {
  x: number;
  y: number;
  emoji: string;
}

export default function Food({ x, y, emoji }: FoodProps): JSX.Element {
  return (
    <Text style={[{ top: y * 10, left: x * 10 }, styles.food]}>{emoji}</Text>
  );
}

const styles = StyleSheet.create({
  food: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: "absolute",
  },
});
