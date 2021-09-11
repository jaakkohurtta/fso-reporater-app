import { useMutation } from "@apollo/client";

import { CREATE_REVIEW } from "../graphql/mutations";
import { IS_USER_AUTHORIZED } from "../graphql/queries";

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
      refetchQueries: [
        { query: IS_USER_AUTHORIZED, variables: { includeReviews: true } },
      ],
    });
  };

  return [newReview, result];
};

export default useCreateReview;
