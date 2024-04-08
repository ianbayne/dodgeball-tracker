import { ScrollView, Text } from "react-native";

import { gql, useQuery } from "@apollo/client";

import type Player from "../../types/Player";

const GET_PLAYER = gql`
  query GetPlayer($id: ID!) {
    player(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

function ProfileScreen() {
  const { data, error, loading } = useQuery(GET_PLAYER, {
    variables: { id: 1 }, // Hardcoded for the time being. TODO: Make getMe query
  });

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error : {error.message}</Text>;

  const { firstName, lastName }: Player = data.player;

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

export default ProfileScreen;
