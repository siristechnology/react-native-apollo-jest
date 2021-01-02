// import { MockedProvider } from "@apollo/react-testing";
import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { act, render } from "@testing-library/react-native";

import Profile, { PROFILE_QUERY } from "./Profile";

const MOCKS = [
  {
    request: {
      query: PROFILE_QUERY,
    },
    result: {
      data: {
        currentUser: {
          id: "1",
          username: "Johny",
          postsCount: 123,
        },
      },
    },
  },
];

async function wait(ms = 0) {
  await act(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  });
}

it("renders", async () => {
  const { getByTestId, getByText, queryByTestId, toJSON } = render(
    <MockedProvider addTypename={false} mocks={MOCKS}>
      <Profile />
    </MockedProvider>
  );

  await wait();

  const testComp = getByText("Username: Johny");
  expect(testComp).toBeTruthy();
});
