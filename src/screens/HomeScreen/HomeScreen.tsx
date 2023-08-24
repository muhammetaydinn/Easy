import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {baseUrl} from '../../constants';

interface Article {
  image: string | null;
  newsCategories: string | null;
  newsUUID: string;
  text: string | null;
  title: string | null;
}
function getImage(image: string | null) {
  if (image === null) {
    return (
      <Image
        style={{width: 50, height: 50}}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
    );
  } else {
    return (
      <Image
        style={{width: 50, height: 50}}
        source={{
          uri: image,
        }}
      />
    );
  }
}

const ArticleCard: React.FC<{article: Article}> = ({article}) => {
  return (
    <TouchableOpacity style={styles.articleCard}>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.description}>{article.image}</Text>
      <Text style={styles.description}>{article.text}</Text>
      {getImage(article.image)}
    </TouchableOpacity>
  );
};

const HomeScreen: React.FC = () => {
  const [newsArticles, setNewsArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchNewsArticles();
  }, []);

  const fetchNewsArticles = async () => {
    try {
      const response = await axios.get(baseUrl + '/api/news');
      setNewsArticles(response.data);
      console.log('newsarticles', newsArticles);
    } catch (error) {
      console.error('Error fetching news articles:', error);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.header}>News App</Text>

      <FlatList
        data={newsArticles}
        renderItem={({item}) => <ArticleCard article={item} />}
        keyExtractor={item => item['newsUUID'] }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red',
  },
  articleCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
  },
});

export default HomeScreen;
