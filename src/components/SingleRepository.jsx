import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useParams } from "react-router-native";

import RepositoryCard from "./RepositoryList/RepositoryCard";
import ReviewCard from "./ReviewCard";
import useRepository from "../hooks/useRepository";

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
  container: {
    flexShrink: 1,
    flexGrow: 1,
  },
});

const Separator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const id = useParams().id;
  const { repository, fetchMore } = useRepository({ id, first: 5 });

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  // console.log(reviews);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewCard actionButtons={false} review={item} />
      )}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <RepositoryCard repository={repository} />
          <Separator />
        </View>
      )}
      ItemSeparatorComponent={Separator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
