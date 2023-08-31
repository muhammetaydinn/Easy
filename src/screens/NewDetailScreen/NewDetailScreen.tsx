import React from 'react';
import {View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Appbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Author, Content} from '../../models/news';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigators/Main';
import {Text} from '../../components/atoms/Text';
import {height, width} from '../../utils/hw';
import CImage from '../../components/atoms/CircleImage';
type Props = NativeStackScreenProps<RootStackParams, 'NewDetailScreen'>;

export const NewDetailScreen: React.FC<Props> = ({navigation, route}) => {
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
        }}>
        <Title title={route.params.content.title} />
        <FirstSpace />
        <AuthorContainer author={route.params.content.author} />
        {ImageContainer(route.params.content.image ?? '')}
      </View>
    </ScrollView>
  );
};

export const Title = ({title}: {title: string}) => {
  return <Text style={{fontSize: 33, fontWeight: 'bold'}}>{title}</Text>;
};

export const AuthorContainer = (author: {author: Author}) => {
  return (
    <View style={{height: height * 0.1, flexDirection: 'row'}}>
      <CImage
        size={width * 0.1}
        radius={width * 0.1}
        uri={author.author.image ?? ''}
      />

      <Text style={{fontSize: 33, fontWeight: 'bold'}}>
        {author.author.image}
      </Text>
    </View>
  );
};
export const FirstSpace: React.FC = () => {
  return <View style={{height: 20}} />;
};
export const ImageContainer = (image: string) => {
  return (
    image && (
      <View style={{width: width * 0.9}}>
        <Image
          source={{uri: image}}
          width={width * 0.9}
          style={{aspectRatio: 1.6}}
        />
      </View>
    )
  );
};
