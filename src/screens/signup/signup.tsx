import React, { ReactElement, useRef, useState } from 'react';
import { Alert, ScrollView, TextInput as NativeTextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { GradientBackground, TextInput, Button, Text } from '@components';
import { StackNavigationProp, useHeaderHeight } from "@react-navigation/stack";
import { StackNavigatorParams } from "@config/navigator";
import { Auth } from "aws-amplify";
import OtpInputs from 'react-native-otp-inputs';
// import OTPInput from '@twotalltotems/react-native-otp-input'
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
  const [step, setStep] = useState<"signUp" | "otp">("otp");

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
    };

    const confirmCode = async (code: string) => {
      try {
        await Auth.confirmSignUp(form.username, code);
        navigation.navigate("Login");
        Alert.alert("Success!", "You can now login with your account!");
      } catch (error) {
        Alert.alert("Error!", error.message || "An error has occurred!");
    }
  }
  return (
    <GradientBackground>
      <KeyboardAvoidingView keyboardVerticalOffset={headerHeight} behavior={ Platform.OS === "ios" ? "padding": "height" } style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          {
            step === "otp"
            &&
              // <OTPInput
              //   placeholderCharacter="0"
              //   placeholderTextColor="#5d5379"
              //   pinCount={6}
              //   codeInputFieldStyle={styles.underlineStyleBase}
              //   autoFocusOnLoad
              //   codeInputHighlightStyle={styles.underlineStyleHighLighted}
              //   // codeInputHighlightStyle={styles.otpActiveInputBox}
              //   onCodeFilled = {(code => {
              //       console.log(`Code is ${code}, you are good to go!`)
              //   })}
              // />
              <>
                <Text>Enter the code that you received via email.</Text>
                <OtpInputs
                  placeholderTextColor="#5d5379"
                  onChange = {code => {
                    confirmCode(code);
                  }}
                  style={styles.otpInputBox}
                  numberOfInputs={6}
                />
              </>
          }
          {
            step === "signUp" &&
            (
              <>
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
              </>
            )
          }
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  )
}
