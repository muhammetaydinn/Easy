import {FlatList, View} from 'react-native';
import {Text} from '../../components/atoms/Text';
import {CustomAppBar} from '../../components/molecules/customAppBar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigators/Main';
import CommentCard from './CommentCard';
import {Comment} from '../../models/news';
import {Button, TextInput} from 'react-native-paper';
import React from 'react';
import {commentToNew} from '../../services/news/comment_to_news';
type Props = NativeStackScreenProps<RootStackParams, 'CommentsScreen'>;

const CommentsScreen: React.FC<Props> = ({route, navigation}) => {
  const [comment, setComment] = React.useState('');
  const commentCount = route.params.comment.length;
  return (
    <View style={{flex: 1}}>
      {CustomAppBar('Responses(' + commentCount + ')', [], [], navigation)}
      <FlatList
        data={route.params.comment}
        renderItem={({item}) => <CommentCard comment={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{height: 64}}></View>
      <Text fontFam="bold" style={{fontSize: 20, margin: 10}}>
        Title
      </Text>
      <TextInput
        value={comment}
        onChangeText={text => {
          setComment(text);
        }}
        style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 10}}
        onSubmitEditing={async text => {
          console.log(text.nativeEvent.text);
          //
        }}
      />

      <Button
        onPress={async () => {
           await commentToNew(
             comment,
             route.params.newsId,
             'fdb3181c-2ba7-438c-aff7-6885f094b6cd',
           );
        }}>
        <Text>Post</Text>
      </Button>
    </View>
  );
};
export default CommentsScreen;
