import {Animated, Dimensions, StatusBar, StyleSheet} from 'react-native';
import {height} from '../../utils/hw';
import {FAB} from 'react-native-paper';
import {Comment} from '../../models/news';
import {RootStackParams} from '../../navigators/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const AnimatedFab: React.FC<{
  comments: Comment[];
  translateYe: any;
  newsId: string;
}> = ({comments, translateYe, newsId}) => {
  const screenHeight = Dimensions.get('screen').height;
  const windowHeight = Dimensions.get('window').height;
  const statusbar = StatusBar!.currentHeight;
  const navbarHeight = screenHeight - windowHeight + statusbar! ?? 0;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        // backgroundColor: 'rgba(52, 52, 52, 0)',
        width: '100%',

        //for animation
        height: 50,
        transform: [{translateY: translateYe}],
        position: 'absolute',
        top: screenHeight - 50 - navbarHeight,
        right: 0,
        left: 0,
        zIndex: 1,
        elevation: 4,
      }}>
      <FAB
        label="312"
        icon="hand-clap"
        color="white"
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
      <FAB
        icon="comment-multiple-outline"
        color="white"
        style={styles.fab}
        onPress={() => {
          navigation.navigate('CommentsScreen', {
            comment: comments,
            newsId: newsId,
          });
        }}
      />
      <FAB
        icon="bookmark-plus-outline"
        color="white"
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  fab: {
    backgroundColor: 'green',
    borderRadius: 50,
    height: 50,
  },
});
