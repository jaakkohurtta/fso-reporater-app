import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
    height: 80,
    backgroundColor: "black",
    opacity: 0.8,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab
        text="Repositories"
        onPress={() => console.log("Repos pressed!")}
      />
    </View>
  );
};

export default AppBar;
