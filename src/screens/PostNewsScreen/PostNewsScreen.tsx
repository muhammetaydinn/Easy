import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Alert, TextInput, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Button} from 'react-native-paper';
import {Text} from '../../components/atoms/Text';
import {Categories} from '../../models/categories';
import {RootStackParams} from '../../navigators/Main';
import {getAllCategories} from '../../services/category/getAllCategories';
import {getAllCategoriesHiearachy} from '../../services/category/getAllCategoriesHiearcy';
import {postNew} from '../../services/news/postNews';
import CImage from '../../components/atoms/CircleImage';
import {width} from '../../utils/hw';

type Props = NativeStackScreenProps<RootStackParams, 'PostNewsScreen'>;
const PostNewsScreen: React.FC<Props> = ({route, navigation}) => {
  const [title, onChangeTitle] = React.useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(
      options as CameraOptions,
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image picker error: ', response.errorMessage);
        } else {
          let imageUri =
            response.assets && response.assets[0]
              ? response.assets[0].uri
              : undefined;
          setSelectedImage(imageUri ?? null); // Use null as a default value
        }
      },
    );
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      cropping: true, // Enable cropping
      croppingStyle: 'square', // Set cropping style to square
      maxHeight: 2000,
      maxWidth: 2000,
    } as ImageLibraryOptions;

    launchCamera(options as CameraOptions, (response: ImagePickerResponse) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        // Process the captured image
        let imageUri =
          response.assets && response.assets[0]
            ? response.assets[0].uri
            : undefined;
        setSelectedImage(imageUri ?? null); // Use null as a default value
        console.log(imageUri);
      }
    });
  };
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
      {
        <View style={{justifyContent: "center",flexDirection:"row"}}>
            <CImage
          uri={selectedImage ?? ''}
          size={width * 0.5}
          isImage={true}
          whratio={1.3}
          radius={15}
          />
          </View>
      }
      <Button
        onPress={() => {
          return Alert.alert(
            'Choose Profile Picture',

            'Select a profile picture',
            [
              {
                text: 'Camera',
                onPress: () => {
                  handleCameraLaunch();
                },
              },
              {
                text: 'Gallery',
                onPress: () => {
                  openImagePicker();
                },
              },
            ],
          );
        }}>
        Change New Picture
      </Button>
      {/* <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 10}}
        // onChangeText={text => onChangeImage(text)}
        value={image}
      /> */}
      <Text fontFam="bold" style={{fontSize: 20, margin: 10}}>
        Text
      </Text>
      <TextInput
        multiline={true}
        style={{height: 100, borderColor: 'gray', borderWidth: 1, margin: 10}}
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
        items={
          categories?.map(category => {
            return {label: category.name, value: category.name};
          }) ?? []
        }
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />

      <Button
        onPress={() => {
          // //post news
          // postNew(
          //   title,
          //   text,

          //   value ? value : 1,

          //   image,
          // );
          postNew(selectedImage, value ? value : '1', title, text);
        }}>
        "Post"
      </Button>
    </View>
  );
};
export default PostNewsScreen;
