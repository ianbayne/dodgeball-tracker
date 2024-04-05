import { SafeAreaView, StyleSheet } from "react-native";

import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";

import client from "./src/apolloClient";
import HomeScreen from "./src/screens/Home/HomeScreen";
import PlayersStackNavigator from "./src/screens/Players/PlayersStackNavigator";
import ErrorBoundary from "./src/components/ErrorBoundary";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ /* focused, */ color, size }) => {
                  if (route.name === "Home") {
                    return <Entypo name="home" size={size} color={color} />;
                  } else if (route.name === "Players") {
                    return (
                      <FontAwesome6 name="person" size={size} color={color} />
                    );
                  }
                },
                // tabBarActiveTintColor: "tomato",
                // tabBarInactiveTintColor: "gray",
              })}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Players" component={PlayersStackNavigator} />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaView>
        <StatusBar style="auto" />
      </ApolloProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
