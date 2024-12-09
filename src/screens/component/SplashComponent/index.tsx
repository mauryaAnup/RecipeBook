import { FC } from "react";
import { Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { Lottie } from "../../../utils/constants/assets";
import styles from "./styles";

const SplashComponent: FC = () => {
    return (
        <View testID="splash-screen-view" style={styles.container}>
            <View>
                <LottieView
                    testID="splash-animation"
                    source={Lottie.splash}
                    autoPlay
                    loop
                    style={styles.lottieStyle}
                />
                <Text
                    testID="app-name"
                    style={styles.appName}
                >
                    Recipe App
                </Text>
            </View>
        </View>
    );
}

export default SplashComponent;