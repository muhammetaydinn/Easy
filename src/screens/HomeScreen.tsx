import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View
} from 'react-native';
import { FAB } from 'react-native-paper';
import { ArticleSeparator } from '../components/atoms/ArticleSeperator';
import { Text } from '../components/atoms/Text';
import ArticleCard from '../components/molecules/articlecard';
import ScrollableTexts from '../components/molecules/sticky';
import { Content, Root } from '../models/news';
import { RootStackParams } from '../navigators/Main';
import { fetchNewsArticles } from '../services/news/fetch_news'; // Dizin doğru şekilde güncellenmeli
import { height, width } from '../utils/hw';
type Props = NativeStackScreenProps<RootStackParams, 'HomeScreen'>;
const HomeScreen: React.FC<Props> = ({route, navigation}) => {
  // const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [newsArticles, setNewsArticles] = useState<Root>();
  const [loading, setLoading] = useState<boolean>(false);
  //TODO: INTERNET OLMADIGI DURUMDA DEFAULT  (defaultNewResponse as Root).content ya da
  const [dataSource, setDataSource] = useState<Content[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isListEnd, setIsListEnd] = useState<boolean>(false);


  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        {loading ? <ActivityIndicator size="large" /> : null}
      </View>
    );
  };
  const fetchData = async () => {
    if (!loading && !isListEnd) {
      setLoading(true);
      console.log('fetching data');
      try {
        const articles = await fetchNewsArticles(page, 5);

        if (articles.content && articles.content.length > 0) {
          setPage(page + 1);
          setDataSource([...dataSource, ...articles.content]);
          
          setLoading(false);
        } else {
          setIsListEnd(true);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching news articles:', error);
      }
    }
  };
  const HomeContainer = () => {
    return (
      <View style={styles.headerContainer}>
        <Text fontFam="bold" style={styles.header}>
          Home
        </Text>
      </View>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {/* TODO: ScrollTableTexts component must be sticky*/}
      <FlatList
        ListHeaderComponent={() => (
          <View>
            <HomeContainer />
            <ScrollableTexts />
          </View>
        )}
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <ArticleSeparator />}
        renderItem={({item}) => <ArticleCard article={item} />}
        ListFooterComponent={renderFooter}
        onEndReached={fetchData}
        onEndReachedThreshold={0.5}
      />
      <FAB
        icon="plus"
        color="white"
        style={styles.fab}
        onPress={() => {
          navigation.navigate(
            'PostNewsScreen',
            // {
            //   // onGoBack: () => fetchData()
            // },
          );
        }}
      />
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
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'green',
    borderRadius: 50,
  },
});

export default HomeScreen;
