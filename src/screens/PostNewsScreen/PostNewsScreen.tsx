import {Button, StyleSheet, TextInput, Touchable, View} from 'react-native';
import React, {useEffect} from 'react';
import {Text} from '../../components/atoms/Text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigators/Main';
import {Menu} from 'react-native-paper';
import {getAllCategories} from '../../services/category/getAllCategories';
import {Categories} from '../../models/categories';
import {CategoryMenu} from './CategoryMenu';
import {getAllCategoriesHiearachy} from '../../services/category/getAllCategoriesHiearcy';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {postNew} from '../../services/news/postNews';
import DropDownPicker from 'react-native-dropdown-picker';

type Props = NativeStackScreenProps<RootStackParams, 'PostNewsScreen'>;
const PostNewsScreen: React.FC<Props> = ({route, navigation}) => {
  const [title, onChangeTitle] = React.useState('');
  const [image, onChangeImage] = React.useState(
    'https://www.tutofox.com/wp-content/uploads/2020/03/spring-react-1024x608.png',
  );
  const [text, onChangeText] = React.useState('');
  const [category, onChangeCategory] = React.useState('');
  const [categories, setCategories] = React.useState<Categories>([]);
  const [catHierarchy, setCatHierarchy] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState(categories);
  const fetchData = async () => {
    //fetch categories
    try {
      const categories = await getAllCategories();
      console.log(categories);
      setCategories(categories);

      const catHierarchy = await getAllCategoriesHiearachy();
      console.log(catHierarchy);
      setCatHierarchy(catHierarchy);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{flex: 1}}>
      {
        //add title , image, text and category
      }
      <Text fontFam="bold" style={{fontSize: 20, margin: 10}}>
        Title
      </Text>
      <TextInput
        maxLength={50}
        style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 10}}
        onChangeText={text => onChangeTitle(text)}
        value={title}
      />
      <Text fontFam="bold" style={{fontSize: 20, margin: 10}}>
        Image
      </Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 10}}
        // onChangeText={text => onChangeImage(text)}
        value={image}
      />
      <Text fontFam="bold" style={{fontSize: 20, margin: 10}}>
        Text
      </Text>
      <TextInput
        multiline={true}
        style={{height: 200, borderColor: 'gray', borderWidth: 1, margin: 10}}
        onChangeText={text => onChangeText(text)}
        value={text}
      />
      <Text fontFam="bold" style={{fontSize: 20, margin: 10}}>
        Category
      </Text>
      <DropDownPicker
        badgeColors={['#ffffff']}
        addCustomItem={true}
        searchable={true}
        placeholder="Select a category"
        open={open}
        value={value}
        items={categories.map(category => {
          return {label: category.name, value: category.categoryId};
        })}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />


      <Button
        title="Post"
        onPress={() => {
          //post news
          postNew(
            title,
            text,

            '33804b0c-af1f-4668-b592-b47709b427ec',
            value ? value : 0,

            image,
          );
        }}
      />
    </View>
  );
};
export default PostNewsScreen;
