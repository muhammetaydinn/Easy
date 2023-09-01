import React from 'react';
import {View, Image, ScrollView, StyleSheet} from 'react-native';
import {Author, Content} from '../../models/news';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigators/Main';
import {Text} from '../../components/atoms/Text';
import {height, width} from '../../utils/hw';
import CImage from '../../components/atoms/CircleImage';
import {CustomAppBar} from '../../components/molecules/customAppBar';
import TimeAgo from '../../components/molecules/timeago';
import {timeRead} from '../../utils/timeread';
import {AuthorInfoCard} from '../../components/molecules/authorInfoCard';
import {ImageContainer} from '../../components/atoms/newImage';
type Props = NativeStackScreenProps<RootStackParams, 'NewDetailScreen'>;

export const NewDetailScreen: React.FC<Props> = ({navigation, route}) => {
  return (
    <ScrollView style={styles.container}>
      {CustomAppBar(
        '',
        ['play-circle-outline', 'share-variant-outline', 'dots-vertical'],
        [],
        navigation,
      )}

      <View style={styles.scrollContent}>
        <View >
          <Title title={route.params.content.title} />
          {AuthorInfoCard(route.params.content.author, route.params.content)}

          {ImageContainer(route.params.content.image ?? '')}
          {TextContent(route.params.content.text)}
        </View>
      </View>
    </ScrollView>
  );
};

export const Title = ({title}: {title: string}) => {
  return (
    <View >
      <Text style={{fontSize: 33, fontWeight: 'bold', paddingVertical: 20}}>
        {title}
      </Text>
    </View>
  );
};
export const TextContent = (text: string) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          lineHeight: 30,
          fontFamily: 'SourceSerif4-Regular',
        }}>
        {text}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
