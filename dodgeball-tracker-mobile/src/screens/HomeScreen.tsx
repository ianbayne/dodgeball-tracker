import { Button, View } from "react-native";

import { gql, useMutation } from "@apollo/client";

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
    </View>
  );
}

export default HomeScreen;
