import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  StatusBar,
  Button,
} from 'react-native';
import axios from 'axios';
import {baseUrl} from '../../constants';
import {Text} from '../../components/atoms/Text/Text';
import {height, width} from '../../utils/hw';
import ArticleCard, {Article} from '../../components/molecules/articlecard';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ScrollableTexts from '../../components/molecules/sticky';

const HomeScreen: React.FC = () => {
  const [newsArticles, setNewsArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchNewsArticles();
  }, []);

  const fetchNewsArticles = async () => {
    try {
      const response = await axios.get(baseUrl + '/api/news');
      console.log(response.data);
      setNewsArticles(response.data);
    } catch (error) {
      console.error('Error fetching news articles:', error);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <ScrollView stickyHeaderIndices={[1]}>
        <View style={styles.headerContainer}>
          <Text fontFam="bold" style={styles.header}>
            Home
          </Text>
        </View>
        <ScrollableTexts />
        <View>
          {newsArticles.map(article => {
            return <ArticleCard article={article} key={article.newsUUID} />;
          })}
        </View>
        {/* <FlatList
          data={newsArticles}
          renderItem={({item}) => <ArticleCard article={item} />}
          keyExtractor={item => item['newsUUID']}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    height: height * 0.15,
  },
  header: {
    paddingLeft: 20,
    fontSize: 20,
    marginBottom: 20,
  },
  stickyHeaderContainer: {
    height: height * 0.05,
    width: width,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});

export default HomeScreen;
