import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import LoginScreen from '../screens/Auth/LoginScreen';

export type ProfileStackParams = {
  ProfileScreen: any;
  SettingsScreen: any;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParams>();

function AuthStack() {
  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
}
export default AuthStack;
