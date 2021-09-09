import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const [repository, setRepository] = useState();
  const [loading, setLoading] = useState(true);

  const repoQuery = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  const fetchRepository = () => {
    if (repoQuery.error) {
      console.log(repoQuery.error);
      return;
    }

    if (repoQuery.loading) {
      setLoading(true);
      return;
    }

    setLoading(false);
    setRepository(repoQuery.data.repository);
  };

  useEffect(() => {
    fetchRepository();
  }, [repoQuery.loading]);

  return { repository, loading, refetch: fetchRepository };
};

export default useRepository;
