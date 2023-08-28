import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Button} from 'react-native';
import {Text} from '../../components/atoms/Text/Text';
import {height, width} from '../../utils/hw';
import ArticleCard from '../../components/molecules/articlecard';
import ScrollableTexts from '../../components/molecules/sticky';
import {fetchNewsArticles} from '../../services/news/fetch_news'; // Dizin doğru şekilde güncellenmeli
import { Article } from '../../models/article';

const HomeScreen: React.FC = () => {
  // const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [newsArticles, setNewsArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await fetchNewsArticles();
        setNewsArticles(articles);
      } catch (error) {
        console.error('Error fetching news articles:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      /> */}
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
    </View>
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
