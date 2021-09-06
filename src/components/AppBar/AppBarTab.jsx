import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Link } from "react-router-native";

import Text from "../Text";

const styles = StyleSheet.create({
  tab: {
    padding: 10,
  },
});

const AppBarTab = ({ text, route, onPress }) => {
  return (
    <Pressable style={styles.tab} onPress={onPress}>
      <Link to={route}>
        <Text color="white" fontSize="heading" fontWeight="bold">
          {text}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
