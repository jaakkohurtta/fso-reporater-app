import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import * as Linking from "expo-linking";

import CardHeader from "./CardHeader";
import CardDataItem from "./CardDataItem";
import Button from "../Button";

import theme from "../../theme";

const styles = StyleSheet.create({
  cardContainer: {
    padding: 5,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  cardDataContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexGrow: 1,
  },
});

const RepositoryCard = ({ repository, onPress }) => {
  const handleClick = () => {
    if (repository.url) {
      Linking.openURL(`${repository.url}`);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <Pressable onPress={onPress}>
        <CardHeader repo={repository} />
        <View style={styles.cardDataContainer}>
          <CardDataItem label="Stars" data={repository.stargazersCount} />
          <CardDataItem label="Forks" data={repository.forksCount} />
          <CardDataItem label="Reviews" data={repository.reviewCount} />
          <CardDataItem label="Rating" data={repository.ratingAverage} />
        </View>
      </Pressable>
      {repository.url && (
        <Button onPress={() => handleClick()} label="View on Github" />
      )}
    </View>
  );
};

export default RepositoryCard;
