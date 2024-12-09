import { FC } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import MainView from "../../../commonComponent/mainView";
import Header from "../../../commonComponent/header";
import styles from "./styles";
import { COLORS } from "../../../utils/constants/colors";
import { Images } from "../../../utils/constants/assets";

type FavoritesComponentProps = {
    favoritesData: any,
    navigateToRecipeDetails: any,
    removeFavorites: (val: any) => void
}

const FavoritesComponent: FC<FavoritesComponentProps> = (props) => {

    const { favoritesData, navigateToRecipeDetails, removeFavorites } = props;

    const renderRecipeList = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                testID={`fav-item-${index}`}
                style={styles.recipeListContainer}
                activeOpacity={0.7}
                onPress={() => navigateToRecipeDetails(item)}
            >
                <View>
                    <Image
                        source={{ uri: item.strMealThumb }}
                        style={styles.thumbnailImg}
                    />
                    <View
                        style={styles.favContainer}
                    >
                        <TouchableOpacity
                            testID={`remove-fav-${index}`}
                            style={styles.favView}
                            activeOpacity={0.7}
                            onPress={() => {
                                removeFavorites(item);
                            }}
                        >
                            <Image
                                testID={`fav-like-image-${index}`}
                                source={Images.like1}
                                style={styles.likeImg}

                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.detailsView}>
                    <Text
                        testID={`fav-recipe-name-${index}`}
                        style={styles.mealName}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >
                        {item.strMeal}
                    </Text>
                    <Text
                        style={styles.mealSortInfo}
                        ellipsizeMode="tail"
                        numberOfLines={2}
                    >
                        {item.strInstructions.trim()}
                    </Text>
                </View>

            </TouchableOpacity>
        )
    }

    const emptyListView = () => {
        return (
            <View style={styles.emptyListContainer}>
                <Image
                    testID="empty-fav-image"
                    source={Images.like}
                    style={{
                        height: 50,
                        width: 50
                    }}
                />
                <Text testID="no-fav-text" style={styles.noDataMsg}>
                    No Favorites
                </Text>
            </View>
        )
    }

    return (
        <MainView isLoading={false}>
            <View testID="favorites-screen-view" style={styles.container}>
                <Header />
                <View style={styles.flatListView}>
                    <FlatList
                        testID="fav-list"
                        scrollEnabled={true}
                        data={favoritesData}
                        renderItem={renderRecipeList}
                        numColumns={2}
                        contentContainerStyle={{
                            paddingBottom: 70
                        }}
                        ListEmptyComponent={emptyListView}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </MainView>
    )
}

export default FavoritesComponent;