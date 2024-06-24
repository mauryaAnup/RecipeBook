import { StyleSheet } from "react-native";
import { COLORS } from "../../../utils/constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: "center"
    },
    lottieStyle: {
        width: 250,
        height: 250,
        marginTop: '20%',
        marginBottom: 20
    },
    appName: {
        color: COLORS.app_theme,
        fontSize: 35,
        textAlign: "center",
        fontWeight: "500"
    }
});

export default styles;