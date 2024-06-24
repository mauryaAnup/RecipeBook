import { FC, useEffect } from "react";
import SplashComponent from "../../component/SplashComponent";
import { CommonActions } from "@react-navigation/native";
import { NAVIGATION_KEY } from "../../../utils/constants/strings.";

const SplashConatiner: FC = (props: any) => {

    useEffect(() => {
        setTimeout(() => {
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{
                        name: NAVIGATION_KEY.HOME
                    }]
                })
            )
        }, 2000)
    }, [])
    return (
        <SplashComponent />
    )
}

export default SplashConatiner;