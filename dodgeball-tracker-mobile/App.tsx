import { StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";

import client from "./src/apolloClient";
import Players from "./src/Players";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text>Is it working?</Text>
        <Players />
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
