import { View } from "react-native";
import { Text } from "../../components/atoms/Text";

export const Title = ({title}: {title: string}) => {
  return (
    <View>
      <Text style={{fontSize: 33, fontWeight: 'bold', paddingVertical: 20}}>
        {title}
      </Text>
    </View>
  );
};
