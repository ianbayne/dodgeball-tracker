import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
};

function Button({ onPress, title, disabled }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "lightgreen" : "white",
        },
        styles.button,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {({ pressed }) => (
        <Text
          style={[{ color: pressed ? "white" : "lightgreen" }, styles.text]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderColor: "lightgreen",
    borderRadius: 20,
    borderWidth: 2,
    padding: 40,
    width: 300,
  },
  text: {
    fontSize: 24, // TODO: What's the baseline?
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default Button;
