import { ScrollView, Text } from "react-native";

import { useQuery } from "@apollo/client";

import { gql } from "../../__generated__";

const GET_ME = gql(`
  query GetMe {
    me {
      id
      firstName
      lastName
    }
  }
`);

function ProfileScreen() {
  const { data, error, loading } = useQuery(GET_ME, {
    variables: { id: "1" }, // Hardcoded for the time being. TODO: Make getMe query
  });

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error : {error.message}</Text>;

  if (data) {
    const { firstName, lastName } = data.player;

    return (
      <ScrollView
      // contentContainerStyle={styles.container}
      >
        <Text>
          {firstName} {lastName}
        </Text>
      </ScrollView>
    );
  }
}

export default ProfileScreen;
