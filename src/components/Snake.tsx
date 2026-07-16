import { Fragment, JSX } from "react";
import { Coordinate } from "../types/types";
import { StyleSheet, View } from "react-native";
import { Colors } from "../style/colors";

/*componente de snake 
este componente resive como parametro el arreglo de coordenadas que actualizan su posicion actual
*/
interface SnakeProps {
  snake: Coordinate[];
}
// -- Pendiente a investigar
export default function Snake({ snake }: SnakeProps): JSX.Element {
  return (
    <Fragment>
      {snake.map((segment, index) => {
        const segmentStyle = {
          left: segment.x * 10,
          top: segment.y * 10,
        };
        return <View key={index} style={[styles.segment, segmentStyle]} />;
      })}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  segment: {
    position: "absolute",
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: Colors.primary,
  },
});
