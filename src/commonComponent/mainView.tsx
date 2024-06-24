import LottieView from "lottie-react-native";
import { FC, useEffect, useState } from "react";
import { Modal, Text, View } from "react-native";
import { Lottie } from "../utils/constants/assets";
import { COLORS } from "../utils/constants/colors";
import NetInfo from '@react-native-community/netinfo';

type MianViewProps = {
    children: any,
    isLoading: boolean
}

const MainView: FC<MianViewProps> = (props: MianViewProps) => {

    const { isLoading, children } = props;

    const [isConnected, setConnected] = useState(true);


    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setConnected(state.isConnected!);
        });

        return () => {
            unsubscribe();
        };
    }, [isConnected]);

    return (
        <View style={{
            flex: 1
        }}>
            <Modal
                transparent={true}
                visible={isLoading}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <View style={{
                        backgroundColor: COLORS.white,
                        alignItems: "center",
                        borderRadius: 10,
                        elevation: 10,
                    }}>
                        <LottieView
                            source={Lottie.loader}
                            autoPlay
                            loop
                            style={{
                                height: 80,
                                width: 80,
                                transform: [{ scaleX: 2 }, { scaleY: 2 }]
                            }}
                        />
                    </View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                visible={!isConnected}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <View style={{
                        backgroundColor: COLORS.white,
                        alignItems: "center",
                        borderRadius: 10,
                        elevation: 10,
                        paddingHorizontal: 20,
                        paddingVertical: 15,
                        justifyContent: "center"
                    }}>
                        <Text
                            style={{
                                color: COLORS.app_theme,
                                fontSize: 30,
                                textAlign: "center",
                                fontWeight: "bold",
                                marginBottom: 10,
                            }}
                        >
                            {"Oops!!\n"}
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 16,
                                textAlign: "center",
                                fontWeight: "400"
                            }}>
                                {"No Internet Connection Available"}
                            </Text>
                        </Text>
                    </View>
                </View>
            </Modal>

            {
                children
            }
        </View>
    )
};

export default MainView;