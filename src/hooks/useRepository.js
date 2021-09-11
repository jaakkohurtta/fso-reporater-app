import { useQuery } from "@apollo/client";

import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (queryVariables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables: { ...queryVariables },
    fetchPolicy: "cache-and-network",
  });

  // console.log(queryVariables);

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        ...queryVariables,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  // console.log(data?.repository.reviews.pageInfo);

  return {
    repository: data?.repository,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepository;
