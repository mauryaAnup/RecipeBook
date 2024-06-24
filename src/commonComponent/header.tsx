import { FC } from "react";
import { Text, View } from "react-native";
import { COLORS } from "../utils/constants/colors";

const Header: FC = () => {
    return (
        <View style={{
            height: 50,
            backgroundColor: COLORS.white_shade1,
            alignItems: "center",
            justifyContent: "center",
            elevation: 5
        }}>
            <Text style={{
                color: COLORS.black,
                fontSize: 20,
                fontWeight: 500
            }}>
                Recipe Book
            </Text>
        </View>
    )
}

export default Header;