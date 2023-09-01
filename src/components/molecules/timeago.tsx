import React from 'react';
import {View} from 'react-native';
import moment from 'moment';
import {Text} from '../atoms/Text';

interface TimeAgoProps {
  timestamp: string; // Gelen zaman damgası stringi
  fontSize?: number; // Yazı boyutu
}

const TimeAgo: React.FC<TimeAgoProps> = ({timestamp,fontSize}) => {
  // moment.js kullanarak zaman döngüsü hesaplaması
  const timeAgo = moment(timestamp).fromNow();

  return (
    <View>
      <Text style={{fontSize: fontSize, color: 'gray'}}>{timeAgo}</Text>
    </View>
  );
};

export default TimeAgo;
