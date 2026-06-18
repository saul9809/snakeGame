import React, { JSX } from "react";
import { Coordinate } from "../types/types";
import { View, Text, StyleSheet } from "react-native";

function getRandomFruitEmoji() {
  const fruitsEmojis = ["🍎", "🍊", "🍋", "🍇", "🍓", "🍆", "🥑"];
  const randomIndex = Math.floor(Math.random() * fruitsEmojis.length);
  fruitsEmojis[Math.floor(Math.random() * fruitsEmojis.length)];
  return fruitsEmojis[randomIndex];
}

export default function Food({ x, y }: Coordinate): JSX.Element {
  return (
    <Text style={[{ top: y * 10, left: x * 10 }, styles.food]}>
      {getRandomFruitEmoji()}
    </Text>
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
