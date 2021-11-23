import { colors } from "@utils";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40
  },
  otpInputBox: {
    color: colors.lightGreen,
    fontFamily: "DeliusUnicase_400Regular",
    fontSize: 20,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: colors.purple,
    borderBottomWidth: 1,
    borderColor: colors.lightGreen,
  },
  optText: {
    color: colors.lightGreen,
    marginBottom: 10
  },
  resendLink: {
    color: colors.lightGreen,
    textAlign: "center",
    textDecorationLine: "underline"
  }
  // otpActiveInputBox: {
  //   borderWidth: 1,
  //   borderColor: colors.lightPurple
  // },
  // borderStyleBase: {
  //   width: 30,
  //   height: 45
  // },

  // borderStyleHighLighted: {
  //   borderColor: "#03DAC6",
  // },

  // underlineStyleBase: {
  //   width: 30,
  //   height: 45,
  //   borderWidth: 0,
  //   borderBottomWidth: 1,
  // },

  // underlineStyleHighLighted: {
  //   borderColor: "#03DAC6",
  // },
});

export default styles;
