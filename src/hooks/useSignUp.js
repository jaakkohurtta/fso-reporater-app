import { useMutation } from "@apollo/client";

import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => {
  const [createUser, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const signUp = async ({ username, password }) => {
    return await createUser({
      variables: { user: { username, password } },
    });
  };

  return [signUp, result];
};

export default useSignUp;
