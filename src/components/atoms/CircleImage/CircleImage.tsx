import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

interface CircleImageProps {
  source: {uri: string};
  size: number;
  whratio?: number;
  radius?: number;
}

const CImage: React.FC<CircleImageProps> = ({ source, size, radius = 0, whratio = 1 }) => {
  

  return (
    <View
      style={[
        styles.circle,
        {width: size * whratio, height: size/whratio, borderRadius: radius},
      ]}>
      <Image source={source} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CImage;
