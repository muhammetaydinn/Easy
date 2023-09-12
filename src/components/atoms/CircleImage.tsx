import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

interface CircleImageProps {
  uri: string;
  size: number;
  whratio?: number;
  radius?: number;
  isProfile?: boolean;
  isImage?: boolean;
}

const CImage: React.FC<CircleImageProps> = ({
  uri,
  size,
  radius = 0,
  whratio = 1,
  isProfile = false,
  isImage = false,
}) => {
  return (
    <View
      style={[
        styles.circle,
        {width: size * whratio, height: size / whratio, borderRadius: radius},
      ]}>
      {uri !== '' && uri != null ? (
        <Image source={{uri: uri}} style={styles.image} />
      ) : isImage ? (
        <Image
          source={require('../../../assets/images/default_image.png')}
          style={styles.image}
        />
      ) : isProfile ? (
        <Image
          source={require('../../../assets/images/default_profile.jpg')}
          style={styles.image}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    overflow: 'hidden',
    backgroundColor: 'lightgrey',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CImage;
