import React, { ReactElement, useRef, useState } from 'react';
import { Alert, ScrollView, TextInput as NativeTextInput } from 'react-native';
import { GradientBackground, TextInput, Button } from '@components';
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "@config/navigator";
import { Auth } from "aws-amplify";
import styles from "./signup.styles";

type SignUpProps = {
  navigation: StackNavigationProp<StackNavigatorParams, "SignUp">;
};

export default function SignUp({navigation}: SignUpProps): ReactElement {
  const passwordRef = useRef<NativeTextInput | null>(null);
  const [form, setForm] = useState({
    username: "test",
    password: "12345678"
  });
  const [loading, setLoading] = useState(false);

  const setFormInput = (key: keyof typeof form, value: string) => {
    setForm({...form, [key]: value});
  };

  // const signup = async () => {
  //   try {
  //     const res = await Auth.signUp({
  //       username: "test",
  //       password: "12345678",
  //       attributes: {
  //         email: "test@test.com",
  //         name: "Test Test"
  //       }
  //     })
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const login = async () => {
    setLoading(true);
    const {username, password} = form;
    try {
        await Auth.signIn(username, password);
        navigation.navigate("Home");
    } catch (error) {
        Alert.alert("Error!", error.message || "An error has occurred!");
    }
    setLoading(false);
  }
  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.contianer}>
        <TextInput
            value={form.username}
            onChangeText={(value) => {
              setFormInput("username", value)
            }}
            returnKeyType="next"
            placeholder="Username"
            style={{
              marginBottom: 20
            }}
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
        />
        <TextInput
            value={form.password}
            onChangeText={(value) => {
              setFormInput("password", value)
            }}
            style={{ marginBottom: 30 }}
            ref={passwordRef}
            returnKeyType="done"
            secureTextEntry
            placeholder="Password"
        />
        <Button loading={loading} title="Login" onPress={login} />
      </ScrollView>
    </GradientBackground>
  )
}
