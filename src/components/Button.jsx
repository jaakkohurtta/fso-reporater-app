import React from "react";
import { View, Pressable, StyleSheet } from "react-native";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
});

const Button = ({ onPress, label }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View>
        <Text color="white" fontSize="subheading">
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;
