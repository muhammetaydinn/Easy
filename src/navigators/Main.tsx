import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import {NewDetailScreen} from '../screens/NewDetailScreen/NewDetailScreen';
import {Content} from '../models/news';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type RootStackParams = {
  HomeScreen: any;
  NewDetailScreen: {content: Content};
};

const RootStack = createNativeStackNavigator<RootStackParams>();

function HomeStack() {
  return (
    <RootStack.Navigator initialRouteName="HomeScreen">
      <RootStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen name="NewDetailScreen" component={NewDetailScreen} />
    </RootStack.Navigator>
  );
}
export default HomeStack;
