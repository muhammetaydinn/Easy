import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {height, width} from '../../utils/hw';
import CImage from '../atoms/CircleImage/CircleImage';
import {Text} from '../atoms/Text/Text';
import TimeAgo from './timeago';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Article} from '../../models/article';

const ArticleCard: React.FC<{article: Article}> = ({article}) => {
  return (
    <TouchableOpacity
      onPress={() => console.log('touchable opacity')}
      activeOpacity={1}
      style={styles.articleCard}>
      {/* 1 */}
      <View style={{padding: 20, height: height * 0.2}}>
        {/* pp ve isim */}
        <View style={{flexDirection: 'row'}}>
          <CImage
            radius={20}
            size={20}
            uri= {article.image as string}
          />
          <Text style={{marginLeft: 10}}>{article.authorId}</Text>
        </View>
        {/* 2 */}
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          {/* sol tarafta başlık ve tarih altında da kısa metin  sağ tarafta kucuk resim  */}
          <View style={{flex: 3, paddingRight: 15}}>
            <Text fontFam="bold" style={styles.title}>
              {'Lorem ipsum dolor sit amet, consectetur '}
            </Text>
            {/* <Text style={{marginTop: 10, color: 'grey'}}>
            
              {article.creationTime}</Text> */}
            <TimeAgo timestamp={article.creationTime as string} />
          </View>
          <View style={{flex: 1}}>
            <CImage
              radius={5}
              size={70}
              whratio={1.3}
              uri= {article.image as string}
            />
          </View>
        </View>
        {/* 3 */}
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{paddingTop: 15, fontSize: 10, color: 'grey'}}>
            Selected for you
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Icon
              style={{padding: 10}}
              name="bookmark-o"
              size={20}
              color="black"
              onPress={() => {
                console.log('Bookmark pressed');
              }}
            />
            <Icon
              style={{padding: 10}}
              name="minus-circle"
              size={20}
              color="black"
            />
            <Icon
              style={{padding: 10}}
              name="ellipsis-v"
              aria-label="More options"
              size={20}
              color="black"
            />
          </View>
        </View>
      </View>

      <View style={{height: 2, width: width, backgroundColor: 'lightgrey'}} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  articleCard: {},
  title: {
    fontSize: 17,
    marginTop: 8,
  },
});
export default ArticleCard;
