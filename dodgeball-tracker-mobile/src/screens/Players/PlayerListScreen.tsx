import { ScrollView, StyleSheet, Text } from "react-native";

import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

import type Player from "../../types/Player";

const GET_PLAYERS = gql`
  query GetPlayers {
    players {
      id
      firstName
      lastName
    }
  }
`;

function PlayerListScreen() {
  const navigation = useNavigation();

  const { loading, error, data } = useQuery(GET_PLAYERS);

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.players.map(({ id, firstName, lastName }: Player) => (
        <Text
          key={id}
          onPress={() => {
            navigation.navigate("PlayerScreen", {
              id,
            });
          }}
        >
          {firstName} {lastName}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PlayerListScreen;
