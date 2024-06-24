import { FC, useEffect, useState } from "react";
import SearchComponent from "../../component/SearchComponent";
import Service from "../../../service/service";
import { ToastAndroid } from "react-native";

const SearchContainer: FC = (props: any) => {

    const [isLoading, setLoading] = useState<boolean>(false);
    const [searchRecipe, setSearchRecipe] = useState<string>("");
    const [recipeData, setRecipeData] = useState([]);

    useEffect(() => {
        searchRecipe !== "" ? searchRecipeByName() : null
    }, [searchRecipe])

    const searchRecipeByName = () => {
        console.log("inside", searchRecipe);

        setLoading(true);
        Service.GET(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchRecipe}`, "")
            .then((res: any) => {
                if (res.status === 200) {
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
                                        qty: measure.trim()
                                    });
                                }
                            }
                            return { ...meal, ingredientsData };
                        });
                    }

                    setRecipeData(updatedMeals);
                    setLoading(false)
                } else {
                    ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    return (
        <SearchComponent
            navigation={props.navigation}
            searchRecipe={searchRecipe}
            setSearchRecipe={(val: string) => setSearchRecipe(val)}
            recipeData={recipeData}
            isLoading={isLoading}
        />
    )
}

export default SearchContainer;