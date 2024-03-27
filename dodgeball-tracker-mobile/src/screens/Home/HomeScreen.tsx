import { Fragment, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { gql, useLazyQuery, useMutation } from "@apollo/client";

import type Player from "../../types/Player";

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
  // TODO: Switch to useReducer
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showHitOrCatchButtons, setShowHitOrCatchButtons] =
    useState<boolean>(true);
  const [showActiveOrPassiveButtons, setShowActiveOrPassiveButtons] =
    useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [passiveId, setPassiveId] = useState<number | null>(null);
  const [isCatch, setIsCatch] = useState<boolean | null>(null);

  const [searchPlayers, { data }] = useLazyQuery(SEARCH_PLAYERS);
  const [createCatch /*, { data, loading, error } */] =
    useMutation(CREATE_CATCH);
  const [createHit /*, { data, loading, error } */] = useMutation(CREATE_HIT);

  useEffect(() => {
    searchPlayers({ variables: { searchTerm } });
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {showHitOrCatchButtons && (
          <Fragment>
            <Pressable
              style={styles.button}
              onPress={() => {
                setShowHitOrCatchButtons(false);
                setShowActiveOrPassiveButtons(true);
                setIsCatch(true);
              }}
            >
              <Text style={styles.text}>Create catch</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                setShowHitOrCatchButtons(false);
                setShowActiveOrPassiveButtons(true);
                setIsCatch(false);
              }}
            >
              <Text style={styles.text}>Create hit</Text>
            </Pressable>
          </Fragment>
        )}
        {showActiveOrPassiveButtons && (
          <Fragment>
            <Pressable
              style={styles.button}
              onPress={() => {
                setShowActiveOrPassiveButtons(false);
                setShowSearch(true);
                setActiveId(1);
              }}
            >
              <Text style={styles.text}>I caught or hit the other person</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                setShowActiveOrPassiveButtons(false);
                setShowSearch(true);
                setPassiveId(1);
              }}
            >
              <Text style={styles.text}>
                I was caught or hit by the other person
              </Text>
            </Pressable>
          </Fragment>
        )}
        {showSearch && (
          <Fragment>
            <TextInput
              value={searchTerm}
              placeholder="Enter player's name"
              onChangeText={(text) => setSearchTerm(text)}
            />
            <View>
              {searchTerm &&
                data?.players?.map((player: Player) => (
                  <Pressable
                    key={player.id}
                    onPress={() => {
                      const activePlayerId = activeId ? activeId : player.id;
                      const passivePlayerId = passiveId ? passiveId : player.id;
                      isCatch
                        ? createCatch({
                            variables: {
                              catcherId: activePlayerId,
                              catcheeId: passivePlayerId,
                            },
                          })
                        : createHit({
                            variables: {
                              hitterId: activePlayerId,
                              hitteeId: passivePlayerId,
                            },
                          });
                      setIsCatch(null);
                      setActiveId(null);
                      setPassiveId(null);
                      setSearchTerm("");
                      setShowSearch(false);
                      setShowHitOrCatchButtons(true);
                    }}
                  >
                    <Text>{`${player.firstName} ${player.lastName}`}</Text>
                  </Pressable>
                ))}
            </View>
          </Fragment>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "lightgreen",
    borderRadius: 20,
    padding: 40,
    width: 300,
  },
  buttonContainer: {
    height: 400,
    justifyContent: "space-around",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default HomeScreen;
