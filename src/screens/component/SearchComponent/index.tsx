import { FC } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import MainView from "../../../commonComponent/mainView";
import styles from "./styles";
import SearchBar from "../../../commonComponent/searchBar";
import { Images } from "../../../utils/constants/assets";
import { COLORS } from "../../../utils/constants/colors";
import { NAVIGATION_KEY } from "../../../utils/constants/strings.";

type SearchComponentProps = {
    navigation: any,
    searchRecipe: string,
    setSearchRecipe: any,
    recipeData: any,
    isLoading: boolean
}

const SearchComponent: FC<SearchComponentProps> = (props: any) => {
    const { navigation, searchRecipe, setSearchRecipe, recipeData, isLoading } = props;

    const renderSearchList = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                style={styles.searchListContainer}
                activeOpacity={0.7}
                onPress={() => {
                    navigation.navigate(NAVIGATION_KEY.RECIPE, { meal: item })
                }}
            >
                <View
                    style={styles.detailsView}
                >
                    <Image
                        source={{ uri: item.strMealThumb }}
                        style={styles.thumbnailImg}
                        resizeMode="center"
                    />
                </View>
                <View
                    style={styles.mealDetailsView}
                >
                    <Text
                        style={styles.mealName}
                    >
                        {item.strMeal}
                    </Text>
                    <Text
                        style={styles.mealArea}
                    >
                        {item.strArea}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    const emptyListView = () => {
        return (
            <View style={styles.emptyListContainer}>
                <Text style={styles.noDataTxt}>
                    No Search Data
                </Text>
            </View>
        )
    }

    const laodingView = () => {
        return (
            <View style={styles.loaderContainer}>
                <Text style={styles.loadingTxt}>
                    Loading...
                </Text>
            </View>
        )
    }

    return (
        <MainView isLoading={false}>
            <View style={styles.container}>
                <View
                    style={styles.header}
                >
                    <TouchableOpacity
                        style={styles.backBtnView}
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Image
                            source={Images.back_arrow}
                            style={styles.backBtn}
                        />
                    </TouchableOpacity>
                    <View style={{
                        flex: 1
                    }}>
                        <SearchBar
                            text={searchRecipe}
                            setText={setSearchRecipe}
                        />
                    </View>
                </View>

                {
                    isLoading ? laodingView() : null
                }

                <View style={styles.flatListView}>
                    <FlatList
                        scrollEnabled
                        data={isLoading || searchRecipe === "" ? [] : recipeData}
                        renderItem={renderSearchList}
                        numColumns={1}
                        contentContainerStyle={{
                            paddingBottom: 30
                        }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => {
                            return (
                                isLoading ? null : emptyListView()
                            )
                        }}
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={styles.separator} />
                            )
                        }}
                    />
                </View>
            </View>
        </MainView>
    )
}

export default SearchComponent;