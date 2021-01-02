import React from "react";
import { render, act } from "@testing-library/react-native";
import { MockedProvider } from "@apollo/client/testing";
import { GET_DOG_QUERY, Dog } from "./dog";

async function wait(ms = 0) {
  await act(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
}

it("should render dog", async () => {
  const dogMock = {
    request: {
      query: GET_DOG_QUERY,
      variables: { name: "Buck" },
    },
    result: {
      data: { dog: { id: 1, name: "Buck", breed: "poodle" } },
    },
  };

  const { getByTestId, getByText, queryByTestId, toJSON } = render(
    <MockedProvider mocks={[dogMock]} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>
  );

  await wait();

  expect(queryByTestId("my-dog")).toBeTruthy();
});
