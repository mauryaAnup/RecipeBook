import { FC } from "react";
import { TextInput, View } from "react-native";
import { COLORS } from "../utils/constants/colors";

type SearchBarProps = {
    text?: string,
    setText?: any
}
const SearchBar: FC<SearchBarProps> = (props) => {

    return (
        <View
            style={{
                height: 35,
                backgroundColor: COLORS.white,
                marginHorizontal: 10,
                borderRadius: 20,
                paddingHorizontal: 12,
                elevation: 2,
                justifyContent: "center",
            }}
        >
            <TextInput
                testID="search-input"
                value={props.text}
                placeholder="Search Recipe..."
                placeholderTextColor={COLORS.gray_shade1}
                autoFocus
                onChangeText={(text) => {
                    props.setText(text.trimStart());
                }}
                style={{
                    backgroundColor: COLORS.white,
                    padding: 5,
                    paddingRight: 10,
                    borderRadius: 20,
                    color: COLORS.black
                }}
            />
        </View>
    )
}

export default SearchBar;