import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/SearchScreen/SearchScreen";

const Stack = createStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
}
