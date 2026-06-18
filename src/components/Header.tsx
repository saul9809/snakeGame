import React, { JSX } from "react";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../style/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

// -- Paramers has Props
interface HeaderProp {
  reloadGame: () => void;
  pauseGame: () => void;
  children: JSX.Element;
  isPause: boolean;
}

export default function Header({
  children,
  reloadGame,
  pauseGame,
  isPause,
}: HeaderProp): JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={reloadGame}>
        <Ionicons name="reload-circle" size={35} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={pauseGame}>
        <FontAwesome
          name={isPause ? "play-circle" : "pause-circle"}
          size={35}
          color={Colors.primary}
        />
      </TouchableOpacity>
      {children}
    </View>
  );
}
// -- Styles
const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderColor: Colors.primary,
    borderWidth: 12,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    backgroundColor: Colors.background,
  },
});
