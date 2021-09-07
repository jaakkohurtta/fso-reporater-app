import React from "react";
import { View, StyleSheet } from "react-native";

import Text from "../Text";

const styles = StyleSheet.create({
  contentItemContainer: {
    padding: 12,
    alignItems: "center",
  },
});

const RepoContentItem = ({ label, data }) => {
  return (
    <View style={styles.contentItemContainer}>
      <Text testID={`repo${label}`} fontWeight="bold">
        {data >= 1000 ? (data / 1000).toFixed(1).toString().concat("k") : data}
      </Text>
      <Text>{label}</Text>
    </View>
  );
};

export default RepoContentItem;
