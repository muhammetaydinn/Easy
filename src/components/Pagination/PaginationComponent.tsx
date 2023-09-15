// NewsScreen.js
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {fetchData, setPageNumber} from '../../store/features/PaginationSlice';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {Text} from '../atoms/Text';
import NewsComponent from './newcom';

const PaginationScreen = ({apiUrl}: {apiUrl: string}) => {
  const dispatch = useAppDispatch();
  const {loading, isListEnd, pageNumber, content} = useAppSelector(
    state => state.PaginationSlice,
  );

  useEffect(() => {
    dispatch(fetchData({apiUrl, page: pageNumber, pageSize: 1})); // Fetch initial page with the provided API URL
  }, [dispatch, pageNumber]);

  const loadMore = () => {
    if (!isListEnd) {
      dispatch(setPageNumber(pageNumber + 1)); // Load the next page with the provided API URL
    }
  };
  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        {loading ? <ActivityIndicator size="large" /> : null}
      </View>
    );
  };

  return (
    <View>
      <Text>News Screen</Text>
      <FlatList
        data={content}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <NewsComponent news={item} />}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default PaginationScreen;

const styles = StyleSheet.create({
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
