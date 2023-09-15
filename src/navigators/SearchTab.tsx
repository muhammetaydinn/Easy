import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import { Text } from '../components/atoms/Text';
export type TabParamList = {
  StoriesScreen: any;
  PeopleScreen: any;
  TopicsScreen: any;
  ListScreen: any;
};
const Tab = createMaterialTopTabNavigator(); // or createMaterialTopTabNavigator

export function TabNavigator() {
  return (
    <View style={{flex: 1, backgroundColor: 'pink'}}>
      <Tab.Navigator
        screenOptions={{
          tabBarPressColor: 'transparent',

          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          tabBarIndicatorStyle: {
            backgroundColor: 'black',
            height: 2,
          },
        }}>
        <Tab.Screen name="Stories" component={StoriesScreen} />
        <Tab.Screen name="People" component={PeopleScreen} />
        <Tab.Screen name="Topics" component={TopicsScreen} />
        <Tab.Screen name="ListScreen" component={ListScreen} />
      </Tab.Navigator>
    </View>
  );
}

const StoriesScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text>Stories</Text>
    </View>
  );
};

const PeopleScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'gray'}}>
      <Text>PeopleScreen</Text>
      <Text>PeopleScreen</Text>
    </View>
  );
};
const TopicsScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'blue'}}>
      <Text>TopicsScreen</Text>
    </View>
  );
};
const ListScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text>ListScreen</Text>
    </View>
  );
};
