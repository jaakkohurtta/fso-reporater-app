import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useHistory } from "react-router-native";

import RepositoryCard from "./RepositoryCard";
import Separator from "../Separator";

import useRepositories from "../../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
  container: {
    flexShrink: 1,
    flexGrow: 1,
  },
});

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handlePress = (id) => {
    history.push(`/${id}`);
  };

  return (
    <View testID="repoList" style={styles.container}>
      <FlatList
        data={repositoryNodes}
        renderItem={({ item }) => (
          <RepositoryCard
            key={item.id}
            repository={item}
            onPress={() => handlePress(item.id)}
          />
        )}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
