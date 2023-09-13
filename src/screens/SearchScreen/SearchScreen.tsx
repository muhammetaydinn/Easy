import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../components/atoms/Text';
import { TabParamList } from '../../navigators/Tabs';

type Props = NativeStackScreenProps<TabParamList, 'SearchScreen'>;
const SearchScreen: React.FC<Props> = ({route, navigation}) => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Text>Search Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
