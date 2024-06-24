import { StyleSheet } from "react-native";
import { COLORS } from "../../../utils/constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    flatListView: {
        paddingLeft: 4,
        paddingTop: 20
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
    
    emptyListContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50%"
    },
    noDataMsg: {
        fontSize: 20,
        fontWeight: "500",
        color: COLORS.black,

    }
});

export default styles;