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
                        {
                            item.isFavorite ? (
                                <TouchableOpacity
                                    style={styles.favView}
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        removeFavorites(item);
                                    }}
                                >
                                    <Image
                                        source={Images.like1}
                                        style={styles.likeImg}

                                    />
                                </TouchableOpacity>
                            ) : null
                        }
                    </View>
                </View>

                <View style={styles.detailsView}>
                    <Text
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
                    source={Images.like}
                    style={{
                        height: 50,
                        width: 50
                    }}
                />
                <Text style={styles.noDataMsg}>
                    No Favorites
                </Text>
            </View>
        )
    }

    return (
        <MainView isLoading={false}>
            <View style={styles.container}>
                <Header />
                <View style={styles.flatListView}>
                    <FlatList
                        scrollEnabled={true}
                        data={favoritesData}
                        renderItem={renderRecipeList}
                        numColumns={2}
                        contentContainerStyle={{
                            paddingBottom: 70
                        }}
                        ListEmptyComponent={() => {
                            return (
                                emptyListView()
                            )
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </MainView>
    )
}

export default FavoritesComponent;