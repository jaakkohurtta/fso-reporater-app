import React from "react";
import { Pressable } from "react-native";

import Text from "./Text";

const AppBarTab = ({ text, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text color="white" fontWeight="bold">
        {text}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
