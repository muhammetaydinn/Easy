import { TouchableOpacity } from "react-native";
import { Text } from "../../components/atoms/Text";

export const CategoriesView: React.FC = (catH: any, route) => {
    
    return (
        Object.keys(catH).map((key,index) => {
            return (
                <TouchableOpacity  key={index}
                    onPress={() => {
                        return CategoriesView(catH[key]);
                    }}>
                    <Text>{key}</Text>
                </TouchableOpacity>
            );
        })
    )
}
