// NewsComponent.js
import React from 'react';
import {View, Text} from 'react-native';
import CImage from '../atoms/CircleImage';

const NewsComponent = ({news}:{news:any}) => {
  return (
    <View>
      <Text>{news.title}</Text>
      <CImage uri={news.image} size={50} isImage={true} />
    </View>
  );
};

export default NewsComponent;
