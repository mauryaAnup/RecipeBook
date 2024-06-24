import { StyleSheet } from "react-native";
import { COLORS } from "../../../utils/constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    searchView: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white_shade1,
        marginVertical: 20,
        marginHorizontal: 10,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        justifyContent: "space-between"
    },
    searchText: {
        fontSize: 14,
        color: COLORS.gray_shade1,
        marginLeft: 5
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 5
    },
    recipeListContainer: {
        height: 170,
        width: '45%',
        backgroundColor: COLORS.white_shade1,
        margin: 8,
        marginTop: 3,
        borderRadius: 10,
        elevation: 8
    },
    thumbnailImg: {
        height: 100,
        borderRadius: 10,
    },
    favContainer: {
        position: "absolute",
        top: 5,
        right: -5,
    },
    favView: {
        marginRight: 8,
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center"
    },
    likeImg: {
        height: 20,
        width: 20,
        tintColor: COLORS.app_theme,
        marginTop: 2
    },
    detailsView: {
        paddingHorizontal: 5,
        marginTop: 2
    },
    mealName: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.black
    },
    mealSortInfo: {
        fontSize: 13,
        fontWeight: "400",
        color: COLORS.black
    },
});

export default styles;