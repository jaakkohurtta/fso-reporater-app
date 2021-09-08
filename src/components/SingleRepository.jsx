import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useParams } from "react-router-native";

import RepositoryCard from "./RepositoryList/RepositoryCard";
import Text from "./Text";
import useRepository from "../hooks/useRepository";
import { formatDate } from "../utils/formatDate";

import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
  container: {
    flexShrink: 1,
    flexGrow: 1,
  },
  reviewContainer: {
    padding: 5,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  reviewHeaderContainer: {
    flexDirection: "row",
  },
  reviewRatingContainer: {
    flexGrow: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginRight: 12,
  },
  reviewInfoContainer: {
    flexGrow: 1,
    flex: 1,
  },
  reviewRating: {
    paddingTop: 6,
  },
  reviewHeader: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.backgroundSecondary,
  },
  reviewDate: {
    marginTop: 5,
  },
  reviewText: {
    marginLeft: 60,
  },
});

const Separator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  const date = formatDate(review.createdAt);

  console.log(date);

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeaderContainer}>
        <View style={styles.reviewRatingContainer}>
          <Text color="primary" fontSize="heading" style={styles.reviewRating}>
            {review.rating}
          </Text>
        </View>
        <View style={styles.reviewInfoContainer}>
          <Text
            style={styles.reviewHeader}
            fontSize="subheading"
            fontWeight="bold"
          >
            {review.user.username}
          </Text>
          <Text fontSize="subhading">{date}</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  );
};

const SingleRepository = () => {
  const id = useParams().id;
  const { repository, loading } = useRepository(id);

  if (loading) {
    return null;
  }

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  console.log(reviews);

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => (
          <View>
            <RepositoryCard repository={repository} />
            <Separator />
          </View>
        )}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

export default SingleRepository;
