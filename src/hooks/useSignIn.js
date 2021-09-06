import { useMutation, useApolloClient } from "@apollo/client";

import useAuthStorage from "./useAuthStorage";
import { AUTHORIZE } from "../graphql/mutations";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const [authorizeUser, result] = useMutation(AUTHORIZE, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const signIn = async ({ username, password }) => {
    const result = await authorizeUser({
      variables: { credentials: { username, password } },
    });

    if (result.data) {
      await authStorage.setAccessToken(result.data.authorize.accessToken);
      apolloClient.resetStore();
    }

    return result;
  };

  return [signIn, result];
};

export default useSignIn;
