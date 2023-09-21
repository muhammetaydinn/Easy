import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {height, width} from '../../utils/hw';
import CImage from '../atoms/CircleImage';
import {Text} from '../atoms/Text';
import TimeAgo from './timeago';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Content} from '../../models/news';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigators/Main';
import {timeRead} from '../../utils/timeread';
import { readNews } from '../../services/interactions/read_news';

const ArticleCard: React.FC<{ article: Content }> = ({ article }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('touchable opacity');
        //TODO: HATALI GOZUKUYOR OLABILIR TYPE DAN DOLAYI
        readNews(article.newsId );
        navigation.navigate('NewDetailScreen', {content: article});
      }}
      activeOpacity={1}
      style={styles.articleCard}>
      {/* 1 */}
      <View style={{padding: 20}}>
        {/* pp ve isim */}
        <View style={{flexDirection: 'row'}}>
          <CImage isProfile={true} radius={20} size={20} uri={article.author?.image??""} />
          <Text style={{marginLeft: 10}}>{article.author?.name}</Text>
        </View>
        {/* 2 */}
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          {/* sol tarafta başlık ve tarih altında da kısa metin  sağ tarafta kucuk resim  */}
          <View
            style={{flex: 3, paddingRight: 15, justifyContent: 'space-around'}}>
            <Text fontFam="bold" style={styles.title}>
              {article.title}
            </Text>
            {/* <Text style={{marginTop: 10, color: 'grey'}}>
            
              {article.creationTime}</Text> */}
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'gray', fontSize: 13}}>
                {timeRead(article.text).concat(' • ')}
              </Text>
              <TimeAgo fontSize={13} timestamp={article.creationTime} />
            </View>
          </View>
          <View style={{flex: 1}}>
            <CImage
              radius={5}
              size={70}
              whratio={1.3}
              uri={article.image as string}
              isImage={true}
            />
          </View>
        </View>
        <View style={{height: 10}}></View>
        {/* 3 */}
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{paddingTop: 15, fontSize: 10, color: 'grey'}}>
            Selected for you
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Icon
              style={{paddingTop: 10, paddingRight: 25}}
              name="bookmark-o"
              size={20}
              color="black"
              onPress={() => {
                console.log('Bookmark pressed');
              }}
            />
            <Icon
              style={{paddingTop: 10, paddingRight: 25}}
              name="minus-circle"
              size={20}
              color="black"
            />
            <Icon
              style={{paddingTop: 10}}
              name="ellipsis-v"
              aria-label="More options"
              size={20}
              color="black"
            />
          </View>
        </View>
      </View>
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
