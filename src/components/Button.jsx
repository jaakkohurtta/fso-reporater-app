import React from "react";
import { View, Pressable, StyleSheet } from "react-native";

import Text from "./Text";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
});

const Button = ({ onPress, label, testID, style }) => {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress} testID={testID}>
      <View>
        <Text color="white" fontWeight="bold">
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;
