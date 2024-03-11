import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

import { gql, useLazyQuery, useMutation } from "@apollo/client";

import type Player from "../types/Player";

const SEARCH_PLAYERS = gql`
  query SearchPlayers($searchTerm: String) {
    players(search: $searchTerm) {
      id
      firstName
      lastName
    }
  }
`;

const CREATE_CATCH = gql`
  mutation CreateCatch($catcherId: ID!, $catcheeId: ID!) {
    createCatch(input: { catcherId: $catcherId, catcheeId: $catcheeId }) {
      catch {
        id
        catcher {
          id
        }
        catchee {
          id
        }
      }
    }
  }
`;

const CREATE_HIT = gql`
  mutation CreateHit($hitterId: ID!, $hitteeId: ID!) {
    createHit(input: { hitterId: $hitterId, hitteeId: $hitteeId }) {
      hit {
        id
        hitter {
          id
        }
        hittee {
          id
        }
      }
    }
  }
`;

function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState<string>("Enter a player's name");

  const [searchPlayers, { data }] = useLazyQuery(SEARCH_PLAYERS);
  const [createCatch /*, { data, loading, error } */] =
    useMutation(CREATE_CATCH);
  const [createHit /*, { data, loading, error } */] = useMutation(CREATE_HIT);

  return (
    <View>
      <Button
        onPress={() =>
          createCatch({ variables: { catcherId: 1, catcheeId: 2 } })
        }
        title="Create catch"
      />
      <Button
        onPress={() => createHit({ variables: { hitterId: 1, hitteeId: 2 } })}
        title="Create hit"
      />
      <TextInput
        value={searchTerm}
        onChangeText={(text) => {
          setSearchTerm(text);
          searchPlayers({ variables: { searchTerm: text } });
        }}
      />
      <View>
        {data?.players?.map((player: Player) => (
          <Text key={player.id}>
            {player.firstName} {player.lastName}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default HomeScreen;
