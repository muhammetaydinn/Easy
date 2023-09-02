import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./Main";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { DetailsScreen } from "../screens/detailsscreen";

export type TabParamList = {
  HomeStack: any;
  Details: any;
  Details2: any;
  Details3: any;
};
const Tab = createBottomTabNavigator<TabParamList>();
function Tabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size, focused}) => (
              <MaterialCommunityIcons
                name="home"
                size={size * 1.2}
                color={focused ? 'black' : color}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({color, size, focused}) => (
              <MaterialCommunityIcons
                name="magnify"
                size={size * 1.2}
                color={focused ? 'black' : color}
              />
            ),
          }}
          name="Details"
          component={DetailsScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({color, size, focused}) => (
              <MaterialCommunityIcons
                name={
                  focused ? 'bookmark-multiple' : 'bookmark-multiple-outline'
                }
                size={size}
                color={focused ? 'black' : color}
              />
            ),
          }}
          name="Details2"
          component={DetailsScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({color, size, focused}) => (
              <MaterialCommunityIcons
                name={focused ? 'account-circle' : 'account-circle-outline'}
                size={size * 1.2}
                color={focused ? 'black' : color}
              />
            ),
          }}
          name="Details3"
          component={DetailsScreen}
        />
      </Tab.Navigator>
    );
}
export default Tabs;