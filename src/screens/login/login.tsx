import React, { ReactElement } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { GradientBackground } from '@components';
import styles from "./login.styles";
import { colors } from "@utils";

export default function login(): ReactElement {
  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.contianer}>
        <TextInput
            placeholder="Username"
            placeholderTextColor="#5d5379"
            style={{
              height: 50,
              width: "100%",
              borderBottomColor: 1,
              borderColor: colors.lightGreen,
              backgroundColor: colors.purple,
              padding: 10,
              color: colors.lightGreen,
              fontFamily:"DeliusUnicase_400Regular"
            }}
        />
      </ScrollView>
    </GradientBackground>
  )
}
