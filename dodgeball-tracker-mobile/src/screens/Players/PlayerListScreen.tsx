import { ScrollView, StyleSheet, Text } from "react-native";

import { useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { PlayersStackParamList } from "./PlayersStackNavigator";
import { gql } from "../../__generated__";

const GET_PLAYERS = gql(`
  query GetPlayers {
    players {
      id
      firstName
      lastName
    }
  }
`);

type PlayerListScreenProp = NativeStackNavigationProp<
  PlayersStackParamList,
  "PlayerListScreen"
>;

function PlayerListScreen() {
  const navigation = useNavigation<PlayerListScreenProp>();

  const { loading, error, data } = useQuery(GET_PLAYERS);

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data?.players.map(({ id, firstName, lastName }) => (
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
