import { FC, useEffect, useState } from "react";
import HomeComponent from "../../component/HomeComponent";
import Service from "../../../service/service";
import { Alert } from "react-native";
import { NAVIGATION_KEY, STORAGE_KEY } from "../../../utils/constants/strings.";
import { MMKV } from "react-native-mmkv";
import { useIsFocused } from "@react-navigation/native";
import NetInfo from '@react-native-community/netinfo';

const HomeContainer: FC = (props: any) => {

    const [isLoading, setLoading] = useState<boolean>(true);
    const [recipeData, setRecipeData] = useState([]);
    const [isConnected, setConnected] = useState<boolean>(false);

    const storage = new MMKV()
    let isFocused = useIsFocused();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setConnected(state.isConnected!);
        });

        if (isFocused && isConnected) {
            getRecipeData();
        }

        return () => {
            unsubscribe();
        };
    }, [isFocused, isConnected]);

    const getRecipeData = () => {
        setLoading(true);
        Service.GET(`https://www.themealdb.com/api/json/v1/1/search.php?s=`, "")
            .then((res: any) => {
                if (res.status === 200) {

                    let favJson = storage.getString(STORAGE_KEY.FAVORITES);
                    let favData = favJson === undefined ? [] : JSON.parse(favJson);

                    let updatedMeals = [];
                    if (res.data.meals !== null) {
                        updatedMeals = res.data.meals.map((meal: any) => {
                            const ingredientsData = [];
                            for (let i = 1; i <= 20; i++) {
                                const ingredient = meal[`strIngredient${i}`];
                                const measure = meal[`strMeasure${i}`];
                                if (ingredient && ingredient.trim() !== "") {
                                    ingredientsData.push({
                                        name: ingredient,
                                        qty: measure.trim(),
                                        isLoading: true
                                    });
                                }
                            }

                            const isFavData = favData.filter((i: any) => i.idMeal === meal.idMeal);
                            let isFavorite = false;
                            if (isFavData.length > 0) {
                                isFavorite = true;
                            }
                            return { ...meal, ingredientsData, isFavorite };
                        });
                    }

                    setRecipeData(updatedMeals);
                    setLoading(false)
                } else {
                    Alert.alert("Alert", "Something went wrong!",
                        [
                            {
                                text: "Try Again",
                                onPress: () => {
                                    getRecipeData()
                                }
                            }
                        ]
                    )
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    const navigateToRecipeDetails = (data: any) => {
        props.navigation.navigate(NAVIGATION_KEY.RECIPE, { meal: data })
    }

    const navigateToSearchScreen = () => {
        props.navigation.navigate(NAVIGATION_KEY.SEARCH);
    }

    return (
        <HomeComponent
            isLoading={isLoading}
            recipeData={recipeData}
            navigateToRecipeDetails={(val) => navigateToRecipeDetails(val)}
            navigateToSearchScreen={navigateToSearchScreen}
        />
    );
}

export default HomeContainer;