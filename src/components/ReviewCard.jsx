import React from "react";
import { View, StyleSheet } from "react-native";
import { useHistory } from "react-router-native";
import { formatDate } from "../utils/formatDate";

import Text from "./Text";
import Button from "./Button";

import theme from "../theme";

const styles = StyleSheet.create({
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
    transform: [{ translateY: -2 }],
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
  actionButtonsContainer: {
    flexDirection: "row",
  },
  buttonPrimary: {
    flexGrow: 1,
    margin: 5,
    backgroundColor: theme.colors.primary,
  },
  buttonRed: {
    flexGrow: 1,
    margin: 5,
    backgroundColor: theme.colors.error,
  },
});

const ReviewCard = ({ actionButtons, handleDeleteReview, review }) => {
  const history = useHistory();

  const date = formatDate(review.createdAt);

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
            {review.user ? review.user.username : review.repositoryId}
          </Text>
          <Text fontSize="subhading">{date}</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
      {actionButtons && (
        <View style={styles.actionButtonsContainer}>
          <Button
            style={styles.buttonPrimary}
            onPress={() => history.push(`/${review.repositoryId}`)}
            label="View repository"
          />
          <Button
            style={styles.buttonRed}
            onPress={() => handleDeleteReview(review.id, review.repositoryId)}
            label="Delete review"
          />
        </View>
      )}
    </View>
  );
};

export default ReviewCard;
