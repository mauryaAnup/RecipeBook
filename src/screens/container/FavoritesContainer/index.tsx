import { FC, useEffect, useState } from "react"
import FavoritesComponent from "../../component/FavoritesComponent";
import { MMKV } from "react-native-mmkv";
import { NAVIGATION_KEY, STORAGE_KEY } from "../../../utils/constants/strings.";
import { useIsFocused } from "@react-navigation/native";
import { ToastAndroid } from "react-native";

const FavoritesContainer: FC = (props: any) => {

    const storage = new MMKV();
    let isFocused = useIsFocused();


    const [favoritesData, setFavoritesData] = useState([]);

    useEffect(() => {
        if (isFocused) {
            let favJson = storage.getString(STORAGE_KEY.FAVORITES);
            let favData = favJson === undefined ? [] : JSON.parse(favJson);

            setFavoritesData(favData);
        }
    }, [isFocused])

    const navigateToRecipeDetails = (data: any) => {
        props.navigation.navigate(NAVIGATION_KEY.RECIPE, { meal: data })
    }

    const removeFavorites = (data: any) => {
        let jsonFavoritesData = storage.getString(STORAGE_KEY.FAVORITES);
        let favoritesData = jsonFavoritesData === undefined ? [] : JSON.parse(jsonFavoritesData);

        let newData = favoritesData.filter((item: any) => item.idMeal !== data.idMeal);
        storage.set(STORAGE_KEY.FAVORITES, JSON.stringify(newData));
        setFavoritesData(newData);
        ToastAndroid.show("Favorites Removed.", ToastAndroid.SHORT);
        console.log("Removed from local storgae");
    }

    return (
        <FavoritesComponent
            favoritesData={favoritesData}
            navigateToRecipeDetails={navigateToRecipeDetails}
            removeFavorites={removeFavorites}
        />
    )
}

export default FavoritesContainer;