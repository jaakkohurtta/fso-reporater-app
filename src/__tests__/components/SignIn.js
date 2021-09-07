import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { expect } from "@jest/globals";

import { SignInForm } from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const handleSubmit = jest.fn();
      const { getByTestId } = render(
        <SignInForm handleSubmit={handleSubmit} />
      );

      fireEvent.changeText(getByTestId("usernameField"), "jaakko");
      fireEvent.changeText(getByTestId("passwordField"), "jaakko123");
      fireEvent.press(getByTestId("submitButton"));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(handleSubmit).toHaveBeenCalled();

        expect(handleSubmit.mock.calls[0][0]).toEqual({
          username: "jaakko",
          password: "jaakko123",
        });
      });
    });
  });
});
