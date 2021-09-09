import React from "react";
import { View, Pressable, StyleSheet } from "react-native";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
  },
});

const Button = ({ onPress, label, testID }) => {
  return (
    <Pressable style={styles.button} onPress={onPress} testID={testID}>
      <View>
        <Text color="white" fontSize="heading" fontWeight="bold">
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;
