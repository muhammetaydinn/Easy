import { View } from "react-native";
import { Text } from "../../components/atoms/Text";

export const TextContent = (text: string) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          lineHeight: 30,
          fontFamily: 'SourceSerif4-Regular',
        }}>
        {text}
      </Text>
    </View>
  );
};
