import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from '../components/atoms/Text';

import { ActivityIndicator, FAB } from 'react-native-paper';
import { ArticleSeparator } from '../components/atoms/ArticleSeperator';
import ArticleCard from '../components/molecules/articlecard';
import ScrollableTexts from '../components/molecules/sticky';
import { RootStackParams } from '../navigators/Main';
import { fetchNews, setPageNumber } from '../store/features/NewsSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { height, width } from '../utils/hw';
type Props = NativeStackScreenProps<RootStackParams, 'HomeScreen'>;
const HomeScreen: React.FC<Props> = ({route, navigation}) => {
  const dispatch = useAppDispatch();
  const {news, pageNumber, pageSize, loading, error, isListEnd} =
    useAppSelector(state => state.NewsSlice);
  useEffect(() => {
    // Fetch news data when the component is mounted
    dispatch(
      fetchNews({
        pageNumber: pageNumber,
        pageSize: pageSize,
      }),
    );
  }, [dispatch, pageNumber, pageSize]);
  const loadMoreNews = () => {
    !isListEnd ? dispatch(setPageNumber(pageNumber + 1)) : {};
  };
  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        {loading ? <ActivityIndicator size="large" /> : null}
      </View>
    );
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {/* TODO: ScrollTableTexts component must be sticky*/}
      <FlatList
        ListHeaderComponent={() => (
          <View>
            <HomeContainer />
            <ScrollableTexts />
          </View>
        )}
        data={news}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <ArticleSeparator />}
        renderItem={({item}) => <ArticleCard article={item} />}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreNews}
        ListFooterComponent={renderFooter}
      />
      <FAB
        icon="plus"
        color="white"
        style={styles.fab}
        onPress={() => {
          navigation.navigate(
            'PostNewsScreen',
            // {
            //   // onGoBack: () => fetchData()
            // },
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    height: height * 0.15,
  },
  header: {
    paddingLeft: 20,
    fontSize: 20,
    marginBottom: 20,
  },
  stickyHeaderContainer: {
    height: height * 0.05,
    width: width,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'green',
    borderRadius: 50,
  },
});

export default HomeScreen;
const HomeContainer = () => {
  return (
    <View style={styles.headerContainer}>
      <Text fontFam="bold" style={styles.header}>
        Home
      </Text>
    </View>
  );
};
