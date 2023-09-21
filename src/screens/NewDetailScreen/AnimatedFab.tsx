import {Animated, Dimensions, StatusBar, StyleSheet} from 'react-native';
import {height} from '../../utils/hw';
import {FAB} from 'react-native-paper';
import {RootStackParams} from '../../navigators/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {likeNews} from '../../services/interactions/like_news';
import React from 'react';
import {bookmarkNews} from '../../services/interactions/bookmark_news';
interface Props {
  translateYe: any;
  newsId: string;
  likes: number;
  bookmarks: number;
}
export const AnimatedFab: React.FC<Props> = ({
  translateYe,
  newsId,
  likes,
  bookmarks,
}) => {
  const [likeCount, setLikeCount] = React.useState(likes);
  const [bookmarksCount, setBookmarksCount] = React.useState(bookmarks);
  const screenHeight = Dimensions.get('screen').height;
  const windowHeight = Dimensions.get('window').height;
  const statusbar = StatusBar!.currentHeight;
  const navbarHeight = screenHeight - windowHeight + statusbar! ?? 0;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  // const like = async () => {
  //   const response = await likeNews(newsId, true);
  //   if (response.newsId.length > 0) {
  //     setLikeCount(response.likes);
  //   }
  // };
  // const bookmark = async () => {
  //   const response = await bookmarkNews(newsId, true);
  //   if (response.newsId.length > 0) {
  //     setBookmarksCount(response.bookmarks);
  //   }
  // };

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
        label={likeCount.toString()}
        icon="hand-clap"
        color="white"
        style={styles.fab}
        onPress={() => {
          // like();
        }}
      />
      <FAB
        icon="comment-multiple-outline"
        color="white"
        style={styles.fab}
        onPress={() => {
          navigation.navigate('CommentsScreen', {
            newsId: newsId,
          });
        }}
      />
      <FAB
        label={bookmarksCount.toString()}
        icon="bookmark-plus-outline"
        color="white"
        style={styles.fab}
        onPress={() => {
          // bookmark();
        }}
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
