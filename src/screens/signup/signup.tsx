import React, { ReactElement, useRef, useState } from 'react';
import { Alert, ScrollView, TextInput as NativeTextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { GradientBackground, TextInput, Button, Text } from '@components';
import { StackNavigationProp, useHeaderHeight } from "@react-navigation/stack";
import { StackNavigatorParams } from "@config/navigator";
import { Auth } from "aws-amplify";
import OtpInputs from 'react-native-otp-inputs';
// import OTPInput from '@twotalltotems/react-native-otp-input'
import styles from "./signup.styles";
import { colors } from '@utils';


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
  const [step, setStep] = useState<"signUp" | "otp">("signUp");
  const [confirming, setConfirming] = useState(false);
  const [storeCode, setStoreCode] = useState<number>();

  const setFormInput = (key: keyof typeof form, value: string) => {
    setForm({...form, [key]: value});
  };

  const signUp = async () => {
    setLoading(true);
    const { username, password, email, name } = form;
    try {
        await Auth.signUp({
          username,
          password,
          attributes: {
            email,
            name
          }
        });
        setStep("otp");
      } catch (error) {
        Alert.alert("Error!", error.message || "An error has occurred!");
        setStep("otp");
      }
      setLoading(false);
    };

    const saveCode = (codeType: string) => {
      let sumCode =+ codeType;
      console.log("sumCode", sumCode);
      setStoreCode(sumCode)
    }

    const confirmCode = async () => {
      
      console.log("storeCode ", storeCode.length);
      if(storeCode == "6") {
        setConfirming(true);
        try {
          await Auth.confirmSignUp(form.username, storeCode);
          navigation.navigate("Login");
          Alert.alert("Success!", "You can now login with your account!");
        } catch (error) {
          Alert.alert("Error!", error.message || "An error has occurred!");
        }
        setConfirming(false);
      }
  }
  return (
    <GradientBackground>
      <KeyboardAvoidingView keyboardVerticalOffset={headerHeight} behavior={ Platform.OS === "ios" ? "padding": "height" } style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          {
            step === "otp"
            &&
              <>
                <Text style={styles.optText}>Enter the code that you received via email.</Text>
                <Button
                  onPress = {code => {
                      confirmCode(code);
                  }}
                  title={'Send code'} />
                {confirming ? (
                  <ActivityIndicator color={colors.lightGreen} />
                ) :
                (
                  <OtpInputs
                    placeholderTextColor="#5d5379"
                    onChangeText = {code => {
                      saveCode(code);
                    }}
                    style={styles.otpInputBox}
                    numberOfInputs={6}
                    />
                    )
                }
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
