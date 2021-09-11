import React from "react";
import { StyleSheet, View } from "react-native";
import { useHistory } from "react-router-native";
import { Formik } from "formik";
import * as yup from "yup";

import Button from "./Button";
import FormikTextInput from "./FormikTextInput";
import Separator from "./Separator";

import theme from "../theme";
import useCreateReview from "../hooks/useCreateReview";

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
  ownerName: yup.string().required("Repository owner is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .positive()
    .integer()
    .min(0)
    .max(100)
    .required("Rating is required (number between 0 and 100)")
    .typeError("Invalid rating - enter a number between 0 and 100"),
});

const ReviewForm = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        ownerName: "",
        repositoryName: "",
        rating: "",
        text: "",
      }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.formContainer}>
          <FormikTextInput
            name="ownerName"
            placeholder="Repository owner"
            style={styles.textInput}
          />
          <Separator />
          <FormikTextInput
            name="repositoryName"
            placeholder="Repository name"
            style={styles.textInput}
          />
          <Separator />
          <FormikTextInput
            name="rating"
            placeholder="Rating"
            style={styles.textInput}
          />
          <Separator />
          <FormikTextInput
            name="text"
            placeholder="Write a review.."
            multiline
            style={styles.textInput}
          />
          <Separator />
          <Button
            style={styles.buttonPrimary}
            onPress={handleSubmit}
            label="Create a review"
            testID="reviewSubmit"
          />
        </View>
      )}
    </Formik>
  );
};

const Review = () => {
  const [newReview] = useCreateReview();
  const history = useHistory();

  const handleSubmit = async ({ ownerName, repositoryName, rating, text }) => {
    try {
      const response = await newReview({
        ownerName,
        repositoryName,
        rating,
        text,
      });
      if (!response.errors) {
        history.push(`/${response.data.createReview.repositoryId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <ReviewForm handleSubmit={handleSubmit} />;
};

export default Review;
