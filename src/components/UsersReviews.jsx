import React from "react";
import { FlatList, Alert } from "react-native";
import { useQuery, useMutation } from "@apollo/client";

import ReviewCard from "./ReviewCard";
import Separator from "./Separator";

import { IS_USER_AUTHORIZED } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";

const UsersReviews = () => {
  const { data, loading, refetch } = useQuery(IS_USER_AUTHORIZED, {
    variables: { includeReviews: true },
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  if (loading) {
    return null;
  }

  const deleteAlert = (id, repoId) =>
    Alert.alert(
      "Delete review",
      `Are you sure you want to delete your review for ${repoId}?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete cancelled."),
          style: "cancel",
        },
        { text: "OK", onPress: () => handleDeleteReview(id) },
      ]
    );

  const handleDeleteReview = async (id) => {
    const result = await deleteReview({ variables: { id } });
    if (result.data.deleteReview) {
      refetch();
    }
  };

  const reviews = data
    ? data.authorizedUser.reviews.edges.map((edge) => edge.node)
    : [];

  // console.log(reviews);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewCard
          actionButtons={true}
          handleDeleteReview={deleteAlert}
          review={item}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={Separator}
    />
  );
};

export default UsersReviews;
