import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import SplashConatiner from "../screens/container/SplashContainer";
import { NAVIGATION_KEY } from "../utils/constants/strings.";
import RecipeDetailsContainer from "../screens/container/RecipeDetailsContainer";
import SearchContainer from "../screens/container/SearchContainer";
import MyTabs from "./bottomNavigation";

const Stact = createNativeStackNavigator();

const NavigationRouter: FC = () => {
    return (
        <NavigationContainer>
            <Stact.Navigator
                screenOptions={{
                    orientation: "portrait"
                }}
            >
                <Stact.Screen
                    name={NAVIGATION_KEY.SPLASH}
                    component={SplashConatiner}
                    options={{
                        headerShown: false
                    }}
                />
                <Stact.Screen
                    name={NAVIGATION_KEY.HOME}
                    component={MyTabs}
                    options={{
                        headerShown: false
                    }}
                />
                <Stact.Screen
                    name={NAVIGATION_KEY.RECIPE}
                    component={RecipeDetailsContainer}
                    options={{
                        headerTransparent: true,
                        title: ""
                    }}
                />
                <Stact.Screen
                    name={NAVIGATION_KEY.SEARCH}
                    component={SearchContainer}
                    options={{
                        headerShown: false
                    }}
                />
            </Stact.Navigator>
        </NavigationContainer>
    )
}

export default NavigationRouter;