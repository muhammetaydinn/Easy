import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import PaginationScreen from '../../components/Pagination/PaginationComponent';
import { TabParamList } from '../../navigators/Tabs';

type Props = NativeStackScreenProps<TabParamList, 'SearchScreen'>;
const SearchScreen: React.FC<Props> = ({route, navigation}) => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <PaginationScreen apiUrl={"/news"}/>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
