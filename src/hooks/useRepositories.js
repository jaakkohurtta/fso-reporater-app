import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (queryVariables) => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  // console.log(queryVariables);

  const reposQuery = useQuery(GET_REPOSITORIES, {
    variables: { ...queryVariables },
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const fetchRepositories = () => {
    if (reposQuery.error) {
      console.log(reposQuery.error);
      return;
    }

    if (reposQuery.loading) {
      setLoading(true);
      return;
    }

    setLoading(false);
    setRepositories(reposQuery.data.repositories);
  };

  useEffect(() => {
    fetchRepositories();
  }, [reposQuery.loading, queryVariables]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
