import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, TextInput as NativeTextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { GradientBackground, TextInput, Button, Text } from '@components';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp, useHeaderHeight } from "@react-navigation/stack";
import { StackNavigatorParams } from "@config/navigator";
import { Auth } from "aws-amplify";
// import OTPInput from '@twotalltotems/react-native-otp-input'
import styles from "./signup.styles";
import { colors } from '@utils';
import { TouchableOpacity } from "react-native-gesture-handler";


type SignUpProps = {
  navigation: StackNavigationProp<StackNavigatorParams, "SignUp">;
  route: RouteProp<StackNavigatorParams, "SignUp">
};

export default function SignUp({navigation, route}: SignUpProps): ReactElement {
  const unconfirmedUsername = route.params?.username;
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
  const [step, setStep] = useState<"signUp" | "otp">(unconfirmedUsername ? "otp" : "signUp");
  const [confirming, setConfirming] = useState(false);
  const [storeCode, setStoreCode] = useState<string | number>("");
  const [resending, setResending] = useState(false);

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
      console.log("codeType", codeType);
      console.log("storeCode", storeCode);
      setStoreCode(codeType)
    }

    const confirmCode = async () => {

      console.log("confirmCode storeCode length", storeCode.length);
      if(storeCode.length === 6) {
        console.log("paso");
        setConfirming(true);
        try {
          await Auth.confirmSignUp(form.username || unconfirmedUsername || "", storeCode);
          navigation.navigate("Login");
          Alert.alert("Success!", "You can now login with your account!");
        } catch (error) {
          Alert.alert("Error!", error.message || "An error has occurred!");
        }
        setConfirming(false);
      } else {
        console.log("No paso");
      }
  }

  const resendCode = async (username: string) => {
    setResending(true);
    try {
      await Auth.resendSignUp(username);
    } catch (error) {
      Alert.alert("Error!", error.message || "An error has occurred!");
    }
    setResending(false);
  }

  useEffect(() => {
    if(unconfirmedUsername) {
      resendCode(unconfirmedUsername);
    }
  }, [])
  return (
    <GradientBackground>
      <KeyboardAvoidingView keyboardVerticalOffset={headerHeight} behavior={ Platform.OS === "ios" ? "padding": "height" } style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          {
            step === "otp"
            &&
              <>
                <Text style={styles.optText}>Enter the code that you received via email.</Text>
                {confirming ? (
                  <ActivityIndicator color={colors.lightGreen} />
                ) :
                (
                  <>
                    <TextInput
                        value={storeCode}
                        onChangeText={(code) => {
                          saveCode(code);
                        }}
                        style={{ marginTop: 10, marginBottom: 10 }}
                        placeholder="OTP Code"
                        placeholderTextColor="#5d5379"
                    />
                    {resending ? (
                      <ActivityIndicator color={colors.lightGreen} />
                    ) : (
                        <TouchableOpacity
                            onPress={() => {
                              if(form.username) {
                                resendCode(form.username);
                              }
                              if(unconfirmedUsername) {
                                resendCode(unconfirmedUsername);
                              }
                            }}>
                          <Text style={styles.resendLink}>Resend Code</Text>
                        </TouchableOpacity>
                    )}
                  </>
                    )
                }
                <Button
                  style={{ marginTop: 30 }}
                  onPress = {confirmCode}
                  title={'Send code'}
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
