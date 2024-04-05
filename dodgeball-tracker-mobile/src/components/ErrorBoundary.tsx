import { Component, ErrorInfo } from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "./Button";

type Props = {
  children?: React.ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleRetryButtonClick(): void {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Sorry... Something went wrong.</Text>
          <Button onPress={() => this.handleRetryButtonClick()} title="Retry" />
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  retryButton: {
    alignItems: "center",
    borderColor: "lightgreen",
    borderRadius: 20,
    borderWidth: 2,
    padding: 15,
    width: 140,
  },
  retryButtonText: {
    fontSize: 18,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
  },
});

export default ErrorBoundary;
