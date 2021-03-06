import React from "react";
import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorTextWhite: {
    color: theme.colors.textWhite,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  backgroundColorPrimary: {
    backgroundColor: theme.colors.primary,
  },
  fontSizesSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizesHeading: {
    fontSize: theme.fontSizes.heading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({
  color,
  fontSize,
  fontWeight,
  style,
  backgroundColor,
  ...props
}) => {
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "white" && styles.colorTextWhite,
    color === "primary" && styles.colorPrimary,
    backgroundColor === "primary" && styles.backgroundColorPrimary,
    fontSize === "subheading" && styles.fontSizesSubheading,
    fontSize === "heading" && styles.fontSizesHeading,
    fontWeight === "bold" && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
