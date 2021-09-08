import React from "react";
import { StyleSheet, Pressable } from "react-native";

import Text from "../Text";

const styles = StyleSheet.create({
  tab: {
    padding: 20,
  },
});

const AppBarTab = ({ text, onPress }) => {
  return (
    <Pressable style={styles.tab} onPress={onPress}>
      <Text color="white" fontSize="heading" fontWeight="bold">
        {text}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
