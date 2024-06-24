import { FC, useState } from "react";
import RecipeDetailsComponent from "../../component/RecipeDetailsComponent";
import { MMKV } from 'react-native-mmkv'
import { STORAGE_KEY } from "../../../utils/constants/strings.";
import { ToastAndroid } from "react-native";


const RecipeDetailsContainer: FC = (props: any) => {

    const [step, setStep] = useState(0);
    const [recipe, setRecipe] = useState(props.route.params);
    const [isFavorite, setIsFavorite] = useState(props.route.params.meal.isFavorite);

    const storage = new MMKV();

    const addFavorites = () => {
        let jsonFavoritesData = storage.getString(STORAGE_KEY.FAVORITES);
        let favoritesData = jsonFavoritesData === undefined ? [] : JSON.parse(jsonFavoritesData);

        if (!isFavorite) {
            props.route.params.meal.isFavorite = true
            let newData = [...favoritesData, props.route.params.meal]

            storage.set(STORAGE_KEY.FAVORITES, JSON.stringify(newData));
            console.log("Added to local storgae");
            
        } else {
            props.route.params.meal.isFavorite = false
            let newData = favoritesData.filter((item: any) => item.idMeal !== props.route.params.meal.idMeal);
            storage.set(STORAGE_KEY.FAVORITES, JSON.stringify(newData));
            console.log("Removed from local storgae");
        }

        setIsFavorite(!isFavorite);

        let msg = !isFavorite ? "Favorite Marked" : "Favorite Removed"
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    }

    return (
        <RecipeDetailsComponent
            recipe={recipe}
            step={step}
            isFavorite={isFavorite}
            setStep={(val: number) => setStep(val)}
            addFavorites={addFavorites}
        />
    )
}

export default RecipeDetailsContainer;