import { StyleSheet, Text, View } from "react-native";

import { gql, useQuery } from "@apollo/client";

import type Player from "../types/Player";

const GET_PLAYERS = gql`
  query GetPlayers {
    players {
      id
      firstName
      lastName
    }
  }
`;

function PlayersScreen() {
  const { loading, error, data } = useQuery(GET_PLAYERS);

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <View style={styles.container}>
      {data.players.map(({ id, firstName, lastName }: Player) => (
        <View key={id}>
          <Text>{firstName}</Text>
          <Text>{lastName}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PlayersScreen;
