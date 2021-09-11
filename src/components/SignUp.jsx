import React from "react";
import { View, StyleSheet } from "react-native";
import { useHistory } from "react-router-native";
import { Formik } from "formik";
import * as yup from "yup";

import FormikTextInput from "./FormikTextInput";
import Separator from "./Separator";
import Button from "./Button";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

import theme from "../theme";

const styles = StyleSheet.create({
  formContainer: {
    margin: 10,
  },
  textInput: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, "Username too short")
    .max(30, "Username too long")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password too short")
    .max(50, "Password too long")
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords dont match")
    .required("Password confirm is required"),
});

const SignUpForm = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        passwordConfirm: "",
      }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.formContainer}>
          <FormikTextInput
            name="username"
            placeholder="Username"
            style={styles.textInput}
          />
          <Separator />
          <FormikTextInput
            name="password"
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry
          />
          <Separator />
          <FormikTextInput
            name="passwordConfirm"
            placeholder="Confirm password"
            style={styles.textInput}
            secureTextEntry
          />
          <Separator />
          <Button
            style={styles.buttonPrimary}
            onPress={handleSubmit}
            label="Sign up"
          />
        </View>
      )}
    </Formik>
  );
};

const SignUp = () => {
  const [SignUp] = useSignUp();
  const [SignIn] = useSignIn();
  const history = useHistory();

  const handleSubmit = async ({ username, password }) => {
    try {
      await SignUp({ username, password });
      const response = await SignIn({ username, password });
      if (!response.errors) {
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <SignUpForm handleSubmit={handleSubmit} />;
};

export default SignUp;
