import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import HomeContainer from '../screens/container/HomeContainer';
import { NAVIGATION_KEY } from '../utils/constants/strings.';
import FavoritesContainer from '../screens/container/FavoritesContainer';
import { COLORS } from '../utils/constants/colors';
import { Image } from 'react-native';
import { Images } from '../utils/constants/assets';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            testID='bottom-tabs'
            barStyle={{
                height: 68,
                backgroundColor: COLORS.white_shade1,
                elevation: 5,
            }}
            activeColor={COLORS.app_theme}
        >
            <Tab.Screen
                name={NAVIGATION_KEY.HOME1}
                component={HomeContainer}
                options={{
                    title: "Home",
                    tabBarButtonTestID: "home-button",
                    tabBarIcon: (({ color }) => (
                        <Image
                            testID='tab-home-icon'
                            source={Images.home}
                            style={{
                                height: 25,
                                width: 25,
                                tintColor: color
                            }}
                        />
                    ))
                }}
            />
            <Tab.Screen
                name={NAVIGATION_KEY.FAVORITES}
                component={FavoritesContainer}
                options={{
                    title: "Favorites",
                    tabBarButtonTestID: "fav-button",
                    tabBarIcon: (({ color, focused }) => (
                        <Image
                            testID='tab-fav-icon'
                            source={Images.like}
                            style={{
                                height: 25,
                                width: 25,
                                tintColor: color
                            }}
                        />
                    ))
                }}
            />
        </Tab.Navigator>
    );
}

export default MyTabs;