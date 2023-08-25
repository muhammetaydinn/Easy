import { View } from "react-native/Libraries/Components/View/View";
import { Text } from "../components/atoms/CText/CText";

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
      <Text>Settings!</Text>
  );
}

export {HomeScreen, SettingsScreen};