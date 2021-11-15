import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  contianer: {
    paddingHorizontal: 30,
    paddingVertical: 40
  },
  borderStyleBase: {
    width: 30,
    height: 45,
    borderColor: "#03DAC6",
    borderWidth: 1,
    borderBottomWidth: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    marginTop: 10
  },
  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});

export default styles;
