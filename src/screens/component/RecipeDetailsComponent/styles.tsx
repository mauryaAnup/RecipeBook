import { StyleSheet } from "react-native";
import { COLORS } from "../../../utils/constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    backgroundImg: {
        width: "100%",
        height: 250,
        justifyContent: "flex-end"
    },
    detailsView: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        paddingBottom: 10,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    mealName: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.white
    },
    mealArea: {
        fontSize: 16,
        color: COLORS.white,
        marginTop: -4
    },
    like: {
        height: 30,
        width: 30,
        marginRight: 10,
    },
    optionsView: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 5,
        paddingVertical: 10
    },
    dot: {
        height: 6,
        width: 6,
        backgroundColor: COLORS.app_theme,
        borderRadius: 6,
        marginTop: 2
    },
    flatListView: {
        flex: 1,
        paddingHorizontal: 10,
    },
    separator: {
        flex: 1,
        borderTopWidth: 1,
        borderColor: COLORS.white_shade1
    },
    scrollViewStyle: {
        paddingBottom: 30,
        paddingHorizontal: 5
    },
    directions: {
        color: COLORS.black,
        fontSize: 13
    }
});

export default styles;