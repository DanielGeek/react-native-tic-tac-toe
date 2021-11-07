import { StyleSheet } from "react-native";
import { colors } from '@utils';

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 120
    },
    logo: {
        height: 150,
        maxWidth: "60%",
        resizeMode: "contain"
    },
    buttons: {
        // TODO: change to 80
        marginTop: 10
    },
    button: {
        marginBottom: 20
    },
    loggedInText: {
        color: colors.lightGreen,
        textAlign: "center",
        fontSize: 12
    }
});

export default styles;
