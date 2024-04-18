import { TextInput, View } from "react-native";

import Button from "../../components/Button";

function LoginScreen() {
  return (
    <View>
      <TextInput placeholder="email" inputMode="email" />
      <TextInput
        passwordRules="minLength: 8"
        placeholder="password"
        secureTextEntry={true}
      />
      <Button title="Login" onPress={() => {}} />
    </View>
  );
}

export default LoginScreen;
