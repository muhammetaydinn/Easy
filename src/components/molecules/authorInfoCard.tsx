import {StyleSheet, View} from 'react-native';
import {Author, Content} from '../../models/news';
import CImage from '../atoms/CircleImage';
import {height, width} from '../../utils/hw';
import {Text} from '../atoms/Text';
import {timeRead} from '../../utils/timeread';
import TimeAgo from './timeago';

export const AuthorInfoCard = (author: Author, content: Content) => {
  return (
    <View style={styles.authorInfoContainer}>
      <View style={{flex: 1}}>
        {
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}>
            <CImage
              size={width * 0.1}
              radius={width * 0.1}
              uri={author.image ?? ''}
            />
            <View
              style={{
                flexDirection: 'column',
                paddingLeft: 10,
              }}>
              <Text style={{fontSize: 16}}>{author.name}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'gray', fontSize: 13}}>
                  {timeRead(content.text).concat(' • ')}
                </Text>
                <TimeAgo timestamp={content.creationTime} />
              </View>
            </View>
          </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({ 
  authorInfoContainer: {
    height: height * 0.1,
    paddingVertical: height * 0.015,
    flex: 1,
    verticalAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
