import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (queryVariables) => {
  // console.log(queryVariables);

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: { ...queryVariables },
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  // console.log(data?.repositories);

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        ...queryVariables,
        after: data.repositories.pageInfo.endCursor,
      },
    });
  };

  // console.log(data?.repositories.pageInfo);

  return {
    repositories: data?.repositories,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;
