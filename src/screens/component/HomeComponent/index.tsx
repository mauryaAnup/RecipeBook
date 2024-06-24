import { FC } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import MainView from "../../../commonComponent/mainView";
import Header from "../../../commonComponent/header";
import { COLORS } from "../../../utils/constants/colors";
import { Images } from "../../../utils/constants/assets";

type HomeComponentProps = {
    isLoading: boolean,
    recipeData: any,
    navigateToRecipeDetails: (val: any) => void,
    navigateToSearchScreen: () => void,
}
const HomeComponent: FC<HomeComponentProps> = (props) => {
    const { isLoading, recipeData, navigateToRecipeDetails, navigateToSearchScreen } = props;

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
                                <View
                                    style={styles.favView}
                                >
                                    <Image
                                        source={Images.like1}
                                        style={styles.likeImg}

                                    />
                                </View>
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

    return (
        <MainView isLoading={isLoading}>
            <View style={styles.container}>
                <Header />
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: 10
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableOpacity
                        style={styles.searchView}
                        activeOpacity={0.8}
                        onPress={() => {
                            navigateToSearchScreen();
                        }}
                    >
                        <Text
                            style={styles.searchText}
                        >
                            Search Recipe...
                        </Text>
                        <Image
                            source={Images.search}
                            style={styles.searchIcon}
                        />
                    </TouchableOpacity>
                    <View style={{
                        paddingLeft: 4
                    }}>
                        <FlatList
                            scrollEnabled={false}
                            data={recipeData}
                            renderItem={renderRecipeList}
                            numColumns={2}
                            contentContainerStyle={{
                                paddingBottom: 10
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </ScrollView>
            </View>
        </MainView>
    );
}

export default HomeComponent;