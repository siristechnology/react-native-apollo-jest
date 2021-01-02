import React from "react";
import { Text, View } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const PROFILE_QUERY = gql`
  query ProfileQuery {
    currentUser {
      id
      username
      postsCount
    }
  }
`;

export default function Profile() {
  const { data, loading, error } = useQuery(PROFILE_QUERY);

  if (error) {
    throw error;
  }

  if (loading) {
    return "Loading";
  }

  if (!(data && data.currentUser)) {
    throw new Error("Cannot fetch data");
  }

  const { currentUser } = data;

  return (
    <View>
      <Text testID="userName">Username: {currentUser.username}</Text>
      <Text>Posts count: {currentUser.postsCount}</Text>
    </View>
  );
}
