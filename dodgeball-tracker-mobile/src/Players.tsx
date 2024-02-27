import { Text, View } from "react-native";

import { gql, useQuery } from "@apollo/client";

const GET_PLAYERS = gql`
  query GetPlayers {
    players {
      id
      firstName
      lastName
    }
  }
`;

function Players() {
  const { loading, error, data } = useQuery(GET_PLAYERS);

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <View>
      {data.players.map(
        ({
          id,
          firstName,
          lastName,
        }: {
          id: number;
          firstName: string;
          lastName: string;
        }) => (
          <View key={id}>
            <Text>{firstName}</Text>
            <Text>{lastName}</Text>
          </View>
        )
      )}
    </View>
  );
}

export default Players;
