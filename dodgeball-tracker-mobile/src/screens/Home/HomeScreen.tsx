import { Fragment, useEffect, useReducer, useState } from "react";
import { Button, TextInput, View } from "react-native";

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
    <View>
      {showHitOrCatchButtons && (
        <Fragment>
          <Button
            onPress={() => {
              setShowHitOrCatchButtons(false);
              setShowActiveOrPassiveButtons(true);
              setIsCatch(true);
            }}
            title="Create catch"
          />
          <Button
            onPress={() => {
              setShowHitOrCatchButtons(false);
              setShowActiveOrPassiveButtons(true);
              setIsCatch(false);
            }}
            title="Create hit"
          />
        </Fragment>
      )}
      {showActiveOrPassiveButtons && (
        <Fragment>
          <Button
            onPress={() => {
              setShowActiveOrPassiveButtons(false);
              setShowSearch(true);
              setActiveId(1);
            }}
            title="I caught or hit the other person"
          />
          <Button
            onPress={() => {
              setShowActiveOrPassiveButtons(false);
              setShowSearch(true);
              setPassiveId(1);
            }}
            title="I was caught or hit by the other person"
          />
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
                <Button
                  key={player.id}
                  title={`${player.firstName} ${player.lastName}`}
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
                />
              ))}
          </View>
        </Fragment>
      )}
    </View>
  );
}

export default HomeScreen;
