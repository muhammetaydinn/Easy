import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Content } from '../models/news';
import CommentsScreen from '../screens/CommentScreen/CommentsScreen';
import HomeScreen from '../screens/HomeScreen';
import { NewDetailScreen } from '../screens/NewDetailScreen/NewDetailScreen';
import PostNewsScreen from '../screens/PostNewsScreen/PostNewsScreen';

export type RootStackParams = {
  HomeScreen: any;
  NewDetailScreen: {content: Content};
  CommentsScreen: { newsId: string};
  PostNewsScreen: any;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

function HomeStack() {
  return (
    <RootStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="HomeScreen" component={HomeScreen} />
      <RootStack.Screen name="NewDetailScreen" component={NewDetailScreen} />
      <RootStack.Screen name="CommentsScreen" component={CommentsScreen} />
      <RootStack.Screen name="PostNewsScreen" component={PostNewsScreen} />
    </RootStack.Navigator>
  );
}
export default HomeStack;
