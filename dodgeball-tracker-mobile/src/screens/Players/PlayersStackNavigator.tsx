import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PlayerListScreen from "./PlayerListScreen";
import PlayerScreen from "./PlayerScreen";

export type PlayersStackParamList = {
  PlayerListScreen: undefined;
  PlayerScreen: { id: string };
};

const PlayersStack = createNativeStackNavigator<PlayersStackParamList>();

function PlayersStackNavigator() {
  return (
    <PlayersStack.Navigator
      initialRouteName="PlayerListScreen"
      screenOptions={() => ({
        headerTitle: "",
      })}
    >
      <PlayersStack.Screen
        name="PlayerListScreen"
        component={PlayerListScreen}
        options={{ headerShown: false }}
      />
      <PlayersStack.Screen
        name="PlayerScreen"
        component={PlayerScreen}
        options={{ headerBackVisible: true, headerBackTitle: "Back" }}
      />
    </PlayersStack.Navigator>
  );
}

export default PlayersStackNavigator;
