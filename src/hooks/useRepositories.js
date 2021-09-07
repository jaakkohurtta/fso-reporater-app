import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const reposQuery = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
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
  }, [reposQuery.loading]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
