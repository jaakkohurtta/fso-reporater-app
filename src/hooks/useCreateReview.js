import { useMutation } from "@apollo/client";

import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [createReview, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const newReview = async ({ ownerName, repositoryName, rating, text }) => {
    return await createReview({
      variables: {
        review: { ownerName, repositoryName, rating: parseInt(rating), text },
      },
    });
  };

  return [newReview, result];
};

export default useCreateReview;
