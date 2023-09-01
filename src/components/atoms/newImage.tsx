import {Image, View} from 'react-native';
import {height} from '../../utils/hw';
import {useState} from 'react';

export const ImageContainer = (image: string) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [whRatio, setwhRatio] = useState<number>(0);
  if (image.length > 0) {
    Image.getSize(image, (width, height) => {
    setWidth(width);
    setHeight(height);
    setwhRatio(width / height);
    });
  }

  return (
    image && (
      <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
        <Image
          source={{uri: image}}
          style={{
            width: '100%',

            aspectRatio: whRatio,
          }}
        />
      </View>
    )
  );
};
