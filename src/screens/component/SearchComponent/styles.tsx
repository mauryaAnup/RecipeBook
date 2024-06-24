import { StyleSheet } from "react-native";
import { COLORS } from "../../../utils/constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: COLORS.white_shade1
    },
    backBtnView: {
        width: 30,
        height: 30,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    backBtn: {
        height: 18,
        width: 18,
    },
    flatListView: {
        flex: 1,
        paddingHorizontal: 10
    },
    separator: {
        flex: 1,
        borderTopWidth: 1,
        borderColor: COLORS.white_shade1
    },
    loaderContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20
    },
    loadingTxt: {
        fontSize: 20,
        color: COLORS.black,
    },
    emptyListContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50%"
    },
    noDataTxt: {
        fontSize: 20,
        fontWeight: "500",
        color: COLORS.gray_shade1,
    },
    searchListContainer: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        backgroundColor: COLORS.white
    },
    detailsView: {
        width: 60,
        height: 60,
        backgroundColor: COLORS.white,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4
    },
    thumbnailImg: {
        height: 55,
        width: 55,
        borderRadius: 2
    },
    mealDetailsView: {
        flex: 1,
        justifyContent: "center",
        marginLeft: 15
    },
    mealName: {
        fontSize: 18,
        fontWeight: "500",
        color: COLORS.black
    },
    mealArea: {
        fontSize: 14,
        color: COLORS.black
    }

});

export default styles;