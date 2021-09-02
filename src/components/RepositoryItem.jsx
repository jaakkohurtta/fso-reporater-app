import React from "react";
import { View, StyleSheet } from "react-native";

import RepoHeader from "./RepoHeader";
import RepoContentItem from "./RepoContentItem";

import theme from "../theme";

const styles = StyleSheet.create({
  cardContainer: {
    padding: 5,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  cardContentContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexGrow: 1,
  },
});

const Repositoryrepo = ({ repo }) => {
  return (
    <View style={styles.cardContainer}>
      <RepoHeader repo={repo} />
      <View style={styles.cardContentContainer}>
        <RepoContentItem label="stars" data={repo.stargazersCount} />
        <RepoContentItem label="forks" data={repo.forksCount} />
        <RepoContentItem label="reviews" data={repo.reviewCount} />
        <RepoContentItem label="rating" data={repo.ratingAverage} />
      </View>
    </View>
  );
};

export default Repositoryrepo;
