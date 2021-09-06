import React from "react";
import { StyleSheet } from "react-native";
import { Link } from "react-router-native";

import Text from "../Text";

const styles = StyleSheet.create({
  tab: {
    padding: 20,
  },
});

const AppBarTab = ({ text, route, onPress }) => {
  return (
    <Link style={styles.tab} onPress={onPress} to={route}>
      <Text color="white" fontSize="heading" fontWeight="bold">
        {text}
      </Text>
    </Link>
  );
};

export default AppBarTab;
