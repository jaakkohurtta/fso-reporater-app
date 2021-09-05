import React from "react";
import { TextInput as NativeTextInput, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  error: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];

  if (error) {
    textInputStyle.push(styles.error);
  }

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
