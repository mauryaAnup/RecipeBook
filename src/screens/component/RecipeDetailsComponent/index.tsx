import { FC } from "react";
import { ActivityIndicator, FlatList, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { COLORS } from "../../../utils/constants/colors";
import { Images } from "../../../utils/constants/assets";

type RecipeDetailsComponentProps = {
    recipe: any,
    step: number,
    setStep: any,
    isFavorite: boolean,
    addFavorites: () => void,
}
const RecipeDetailsComponent: FC<RecipeDetailsComponentProps> = (props) => {
    const { recipe, step, setStep, isFavorite, addFavorites } = props;

    const renderIngredientList = ({ item, index }: any) => {
        return (
            <View
                testID={`ingredient-${index}`}
                style={{
                    flex: 1,
                    flexDirection: "row",
                    padding: 10
                }}>
                <View
                    style={{
                        width: 60,
                        height: 60,
                        backgroundColor: COLORS.white,
                        elevation: 5,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 5
                    }}
                >
                    <Image
                        testID={`ingredient-image-${index}`}
                        source={{ uri: `https://www.themealdb.com/images/ingredients/${item.name}-Small.png` }}
                        style={{
                            height: 50,
                            width: 50
                        }}
                        resizeMode="center"
                    />

                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "space-evenly",
                        marginLeft: 15
                    }}
                >
                    <Text
                        testID={`ingredient-qty-${index}`}
                        style={{
                            fontSize: 18,
                            fontWeight: "500",
                            color: COLORS.black
                        }}
                    >
                        {item.qty}
                    </Text>
                    <Text
                        testID={`ingredient-name-${index}`}
                        style={{
                            fontSize: 14,
                            color: COLORS.black
                        }}
                    >
                        {item.name}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <View testID="recipe-main-view" style={styles.container}>
            <ImageBackground
                testID="recipe-image"
                source={{ uri: recipe.meal.strMealThumb }}
                style={styles.backgroundImg}
            >
                <View style={styles.detailsView}>
                    <View>
                        <Text
                            testID="recipe-name"
                            style={styles.mealName}
                            ellipsizeMode="tail"
                            numberOfLines={2}
                        >
                            {recipe.meal.strMeal}
                        </Text>
                        <Text
                            style={styles.mealArea}
                        >
                            {`${recipe.meal.strArea} Dish`}
                        </Text>
                    </View>
                    <TouchableOpacity
                        testID="add-to-fav"
                        onPress={() => {
                            addFavorites();
                        }}
                    >
                        {
                            isFavorite ? (
                                <Image
                                    testID="liked-image"
                                    source={Images.like1}
                                    style={[styles.like, {
                                        tintColor: COLORS.app_theme
                                    }]}

                                />
                            ) : (
                                <Image
                                    testID="not-liked-image"
                                    source={Images.like}
                                    style={[styles.like, {
                                        tintColor: COLORS.white
                                    }]}
                                />
                            )
                        }
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <View style={styles.optionsView}>
                <View
                    style={{
                        alignItems: "center"
                    }}
                >
                    <Text
                        testID="ingredients"
                        style={{
                            fontSize: 14,
                            color: step === 0 ? COLORS.app_theme : COLORS.black,
                            fontWeight: step === 0 ? "500" : "400",
                        }}
                        onPress={() => {
                            setStep(0)
                        }}
                    >
                        INGREDIENTS
                    </Text>
                    {
                        step === 0 ? (
                            <View
                                style={styles.dot}
                            />
                        ) : null
                    }
                </View>

                <View
                    style={{
                        alignItems: "center"
                    }}
                >
                    <Text
                        testID="directions"
                        style={{
                            fontSize: 14,
                            color: step === 1 ? COLORS.app_theme : COLORS.black,
                            fontWeight: step === 1 ? "500" : "400"
                        }}
                        onPress={() => {
                            setStep(1)
                        }}
                    >
                        DIRECTIONS
                    </Text>
                    {
                        step === 1 ? (
                            <View
                                style={styles.dot}
                            />
                        ) : null
                    }
                </View>

            </View>
            <View style={styles.flatListView}>
                {
                    step === 0 ? (
                        <FlatList
                            testID="ingredients-list"
                            data={recipe.meal.ingredientsData}
                            renderItem={renderIngredientList}
                            ItemSeparatorComponent={() => {
                                return (
                                    <View style={styles.separator} />
                                )
                            }}
                            showsVerticalScrollIndicator={false}
                            numColumns={1}
                            contentContainerStyle={{
                                paddingBottom: 30
                            }}
                        />
                    ) : (
                        <ScrollView
                            testID="directions-list"
                            contentContainerStyle={styles.scrollViewStyle}
                            showsVerticalScrollIndicator={false}
                        >
                            <Text
                                testID="direction-steps"
                                style={styles.directions}
                            >
                                {recipe.meal.strInstructions}
                            </Text>
                        </ScrollView>
                    )
                }
            </View>
        </View>
    )
}

export default RecipeDetailsComponent;