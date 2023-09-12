import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/Splash/SplashScreen";
import AuthStack from "./Auth";
import Tabs from "./Tabs";


export type AllStackParams = {
  SplashScreen: any;
  AuthStack: any;
  TabsStack: any;
};

const RootStack = createNativeStackNavigator<AllStackParams>();

function AllStack() {
  return (
    <RootStack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="AuthStack" component={AuthStack} />
      <RootStack.Screen name="TabsStack" component={Tabs} />
    </RootStack.Navigator>
  );
}
export default AllStack;
