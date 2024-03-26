import { ScrollView, StyleSheet, Text } from "react-native";

import { gql, useQuery } from "@apollo/client";

const GET_PLAYER = gql`
  query GetPlayer($id: ID!) {
    player(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

type Props = {
  route: {
    params: {
      id: number;
    };
  };
};

function PlayerScreen({ route }: Props) {
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <Button title="Back" onPress={() => navigation.goBack()} />
  //     ),
  //   });
  // }, [navigation]);

  const { id } = route.params;
  const { loading, error, data } = useQuery(GET_PLAYER, {
    variables: { id },
  });

  if (loading) return <Text>Loading...</Text>;

  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>
        {data.player.firstName} {data.player.lastName}
      </Text>
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

export default PlayerScreen;
