import React, { ReactElement, useRef, useState } from 'react';
import { View, Alert, ScrollView, TextInput as NativeTextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { GradientBackground, TextInput, Button } from '@components';
import { StackNavigationProp, useHeaderHeight } from "@react-navigation/stack";
import { StackNavigatorParams } from "@config/navigator";
import { Auth } from "aws-amplify";
import OTPInputView from '@twotalltotems/react-native-otp-input';
import styles from "./signup.styles";

type SignUpProps = {
  navigation: StackNavigationProp<StackNavigatorParams, "SignUp">;
};

export default function SignUp({navigation}: SignUpProps): ReactElement {
  const headerHeight = useHeaderHeight();
  const passwordRef = useRef<NativeTextInput | null>(null);
  const emailRef = useRef<NativeTextInput | null>(null);
  const nameRef = useRef<NativeTextInput | null>(null);
  const [form, setForm] = useState({
    username: "test",
    email:"marlene2@cchancesg.com",
    name: "Test Name",
    password: "12345678"
  });
  const [loading, setLoading] = useState(false);

  const setFormInput = (key: keyof typeof form, value: string) => {
    setForm({...form, [key]: value});
  };

  const signUp = async () => {
    setLoading(true);
    const { username, password, email, name } = form;
    try {
        const res = await Auth.signUp({
          username,
          password,
          attributes: {
            email,
            name
          }
        });
        console.log(res);
    } catch (error) {
        Alert.alert("Error!", error.message || "An error has occurred!");
    }
    setLoading(false);
  }
  return (
    <GradientBackground>
      <KeyboardAvoidingView keyboardVerticalOffset={headerHeight} behavior={ Platform.OS === "ios" ? "padding": "height" } style={{ flex: 1 }}>
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
                nameRef.current?.focus();
              }}
          />
          <OTPInputView pinCount={4} />
          <TextInput
              ref={nameRef}
              value={form.name}
              onChangeText={(value) => {
                setFormInput("name", value)
              }}
              returnKeyType="next"
              placeholder="Name"
              style={{
                marginBottom: 20
              }}
              onSubmitEditing={() => {
                emailRef.current?.focus();
              }}
          />
          <TextInput
              keyboardType="email-address"
              ref={emailRef}
              value={form.email}
              onChangeText={(value) => {
                setFormInput("email", value)
              }}
              returnKeyType="next"
              placeholder="Email"
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
          <Button loading={loading} title="Sign-Up" onPress={signUp} />
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  )
}
