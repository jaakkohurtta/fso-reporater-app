import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
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
      <ScrollView horizontal>
        <AppBarTab
          text="Repositories"
          route="/repositories"
          onPress={() => console.log("Repos pressed!")}
        />
        <AppBarTab
          text="Sign In"
          route="/signin"
          onPress={() => console.log("Sign In pressed")}
        />
      </ScrollView>
    </View>
  );
};

export default AppBar;
