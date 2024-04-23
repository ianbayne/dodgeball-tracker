import { useState } from "react";
import { TextInput, View } from "react-native";

import Button from "../../components/Button";

function isEmailValid(email: string): boolean {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

function isPasswordValid(password: string): boolean {
  return !!password && password.length >= 8;
}

function LoginScreen() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  return (
    <View>
      <TextInput
        autoCapitalize="none"
        placeholder="email"
        inputMode="email"
        autoComplete="email"
        onChangeText={setEmail}
      />
      <TextInput
        autoCapitalize="none"
        autoComplete="password"
        passwordRules="minLength: 8"
        onChangeText={setPassword}
        placeholder="password"
        secureTextEntry={true}
      />
      <Button
        title="Login"
        onPress={() => {}}
        disabled={
          !email ||
          !isEmailValid(email) ||
          !password ||
          !isPasswordValid(password)
        }
      />
    </View>
  );
}

export default LoginScreen;
