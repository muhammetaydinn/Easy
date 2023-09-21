import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import PaginationScreen from '../../components/Pagination/PaginationComponent';
import {TabParamList} from '../../navigators/Tabs';
import {Text} from '../../components/atoms/Text';
import {TabNavigator} from '../../navigators/SearchTab';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PaginationSlice from '../../store/features/PaginationSlice';

type Props = NativeStackScreenProps<TabParamList, 'SearchScreen'>;
const SearchScreen: React.FC<Props> = ({route, navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setSearchFocused] = useState(false);

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setSearchFocused(false);
    //unfocus keyboard
    Keyboard.dismiss();
  };

  const clearSearchText = () => {
    setSearchText('');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        {/* {isSearchFocused && (
          <TouchableOpacity onPress={handleSearchBlur}>
            <Text>Back</Text>
          </TouchableOpacity>
        )} */}

        {isSearchFocused && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
            }}>
            <Icon name="arrow-left" size={30} onPress={handleSearchBlur} />
          </View>
        )}
        <View style={{paddingHorizontal: 10, flex: 1, height: 50}}>
          <TouchableOpacity
            onPress={() => handleSearchFocus()}
            style={{
              borderRadius: 50,
              flex: 1,
              height: 50,
              backgroundColor: '#F4F4F4',
            }}>
            <TextInput
              left={<TextInput.Icon icon="magnify" />}
              right={
                searchText.length > 0 && (
                  <TextInput.Icon icon="close" onPress={clearSearchText} />
                )
              }
              textAlign={'center'}
              style={{flex: 1, backgroundColor: 'transparent', fontSize: 20}}
              placeholder="Search..."
              value={searchText}
              onChangeText={setSearchText}
              onFocus={handleSearchFocus}
              //hide underline
              underlineColor="transparent"
              underlineStyle={{borderWidth: 0}}
              underlineColorAndroid={'transparent'}
              activeUnderlineColor="transparent"
              cursorColor="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      {isSearchFocused ? (
        <View style={{flex: 1}}>
          <TabNavigator />
        </View>
      ) : (
        <PaginationScreen apiUrl="/news" stateName="SearchTrending" />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
