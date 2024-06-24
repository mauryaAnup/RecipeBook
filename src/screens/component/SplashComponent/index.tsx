import { FC } from "react";
import { Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { Lottie } from "../../../utils/constants/assets";
import styles from "./styles";

const SplashComponent: FC = () => {
    return (
        <View style={styles.container}>
            <View>
                <LottieView
                    source={Lottie.splash}
                    autoPlay
                    loop
                    style={styles.lottieStyle}
                />
                <Text
                    style={styles.appName}
                >
                    Recipe App
                </Text>
            </View>
        </View>
    );
}

export default SplashComponent;