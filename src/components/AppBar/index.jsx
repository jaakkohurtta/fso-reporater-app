import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useHistory } from "react-router-native";
import { useQuery, useApolloClient } from "@apollo/client";
import Constants from "expo-constants";

import AppBarTab from "./AppBarTab";
import useAuthStorage from "../../hooks/useAuthStorage";

import { IS_USER_AUTHORIZED } from "../../graphql/queries";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
    height: 100,
    backgroundColor: "black",
    opacity: 0.8,
  },
});

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const history = useHistory();

  const { data, loading } = useQuery(IS_USER_AUTHORIZED, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const handleSignOut = async () => {
    history.push("/");
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  if (loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab
          text="Repositories"
          route="/"
          onPress={() => history.push("/")}
        />
        {!data.authorizedUser ? (
          <AppBarTab
            text="Sign In"
            route="/signin"
            onPress={() => history.push("/signin")}
          />
        ) : (
          <AppBarTab
            text="Sign Out"
            route="/"
            onPress={() => handleSignOut()}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
