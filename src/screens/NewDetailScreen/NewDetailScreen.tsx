import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Animated, ScrollView, StyleSheet, View} from 'react-native';
import {ImageContainer} from '../../components/atoms/newImage';
import {AuthorInfoCard} from '../../components/molecules/authorInfoCard';
import {RootStackParams} from '../../navigators/Main';
import {AnimtedAppBar} from './AnimatedAppbar';
import {TextContent} from './TextContent';
import {Title} from './Title';
import {AnimatedFab} from './AnimatedFab';

type Props = NativeStackScreenProps<RootStackParams, 'NewDetailScreen'>;

export const NewDetailScreen: React.FC<Props> = ({navigation, route}) => {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 64);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 64],
    outputRange: [0, -64],
  });
  const scrollYe = new Animated.Value(50);
  const diffClampe = Animated.diffClamp(scrollYe, 0, 50);
  const translateYe = diffClampe.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
  });

  return (
    <View style={{flex: 1}}>
      {AnimtedAppBar(translateY, navigation)}
      <ScrollView
        style={styles.container}
        onScrollEndDrag={
          //show fab
          () => {
            Animated.timing(scrollYe, {
              toValue: 50,
              duration: 500,
              useNativeDriver: true,
            }).start();
          }
        }
        onScroll={e => {
          //appbar
          scrollY.setValue(e.nativeEvent.contentOffset.y);
          //  fab
          scrollYe.setValue(+50 - e.nativeEvent.contentOffset.y);
        }}>
        <View style={{height: 64}}></View>
        <View style={styles.scrollContent}>
          <View>
            <Title title={route.params.content.title} />
            {AuthorInfoCard(route.params.content.author, route.params.content)}

            {ImageContainer(route.params.content.image ?? '')}
            {TextContent(route.params.content.text)}
          </View>
        </View>
      </ScrollView>

      {AnimatedFab({
        translateYe,
        newsId: route.params.content.newsId,
        bookmarks: route.params.content.bookmarks,
        likes: route.params.content.likes,
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
