import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Text, View } from "react-native";

// Make sure that both the query and the component are exported
export const GET_DOG_QUERY = gql`
  query GetDog($name: String) {
    dog(name: $name) {
      id
      name
      breed
    }
  }
`;

export function Dog({ name }) {
  const { loading, error, data } = useQuery(GET_DOG_QUERY, {
    variables: { name },
  });

  console.log("printing loading", loading);

  if (loading)
    return (
      <View>
        <Text testID="my-dog-loading"> Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View>
        <Text> Error</Text>
      </View>
    );

  return (
    <View>
      <Text testID="my-dog">
        {data.dog.name} is a {data.dog.breed}
      </Text>
    </View>
  );
}
