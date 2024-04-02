import { Fragment, useEffect, useReducer } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { gql, useLazyQuery, useMutation } from "@apollo/client";

import type Player from "../../types/Player";
import Button from "../../components/Button";

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

type State = {
  showHitOrCatchButtons: boolean;
  showActiveOrPassiveButtons: boolean;
  showSearch: boolean;
  activeId: number | null;
  passiveId: number | null;
  isCatch: boolean | null;
  searchTerm: string | undefined;
};

type Action = {
  type:
    | "initial"
    | "is_catch"
    | "is_hit"
    | "user_is_active"
    | "user_is_passive"
    | "set_search_term";
  searchTerm?: string | undefined;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "initial":
      return {
        ...state,
        showHitOrCatchButtons: true,
        showActiveOrPassiveButtons: false,
        showSearch: false,
        activeId: null,
        passiveId: null,
        isCatch: null,
        searchTerm: undefined,
      };
    case "is_catch":
      return {
        ...state,
        showHitOrCatchButtons: false,
        showActiveOrPassiveButtons: true,
        isCatch: true,
      };
    case "is_hit":
      return {
        ...state,
        showHitOrCatchButtons: false,
        showActiveOrPassiveButtons: true,
        isCatch: false,
      };
    case "user_is_active": // TODO: refactor 'user_is_active' and 'user_is_passive' to one action.type
      return {
        ...state,
        showActiveOrPassiveButtons: false,
        showSearch: true,
        activeId: 1,
      };
    case "user_is_passive":
      return {
        ...state,
        showActiveOrPassiveButtons: false,
        showSearch: true,
        passiveId: 1,
      };
    case "set_search_term":
      return {
        ...state,
        searchTerm: action.searchTerm,
      };

    default:
      throw Error(`Unknown type: ${action.type}`);
  }
}

function HomeScreen() {
  const [state, dispatch] = useReducer(reducer, {
    showHitOrCatchButtons: true,
    showActiveOrPassiveButtons: false,
    showSearch: false,
    activeId: null,
    passiveId: null,
    isCatch: null,
    searchTerm: undefined,
  });

  const [searchPlayers, { data }] = useLazyQuery(SEARCH_PLAYERS);
  const [createCatch /*, { data, loading, error } */] =
    useMutation(CREATE_CATCH);
  const [createHit /*, { data, loading, error } */] = useMutation(CREATE_HIT);

  useEffect(() => {
    searchPlayers({ variables: { searchTerm: state.searchTerm } });
  }, [state.searchTerm]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {state.showHitOrCatchButtons && (
          <Fragment>
            <Button
              onPress={() => dispatch({ type: "is_catch" })}
              title="Create catch"
            />
            <Button
              onPress={() => dispatch({ type: "is_hit" })}
              title="Create hit"
            />
          </Fragment>
        )}
        {state.showActiveOrPassiveButtons && (
          <Fragment>
            <Button
              onPress={() => dispatch({ type: "user_is_active" })}
              title="I caught or hit the other person"
            />
            <Button
              onPress={() => dispatch({ type: "user_is_passive" })}
              title="I was caught or hit by the other person"
            />
          </Fragment>
        )}
        {state.showSearch && (
          <Fragment>
            <TextInput
              value={state.searchTerm}
              placeholder="Enter player's name"
              onChangeText={(text) =>
                dispatch({ type: "set_search_term", searchTerm: text })
              }
            />
            <View>
              {state.searchTerm &&
                data?.players?.map((player: Player) => (
                  <Pressable
                    key={player.id}
                    onPress={() => {
                      const activePlayerId = state.activeId
                        ? state.activeId
                        : player.id;
                      const passivePlayerId = state.passiveId
                        ? state.passiveId
                        : player.id;
                      state.isCatch
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
                      dispatch({ type: "initial" });
                    }}
                  >
                    <Text>{`${player.firstName} ${player.lastName}`}</Text>
                  </Pressable>
                ))}
            </View>
          </Fragment>
        )}
        <Pressable
          style={styles.cancelButton}
          onPress={() => dispatch({ type: "initial" })}
        >
          <Text>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 400,
    justifyContent: "space-around",
  },
  cancelButton: {
    alignSelf: "flex-end",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default HomeScreen;
