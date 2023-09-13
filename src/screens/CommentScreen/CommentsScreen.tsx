import {FlatList, View} from 'react-native';
import {Text} from '../../components/atoms/Text';
import {CustomAppBar} from '../../components/molecules/customAppBar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigators/Main';
import {Comment} from '../../models/news';
import {Button, TextInput} from 'react-native-paper';
import React from 'react';
import {commentToNew} from '../../services/news/comment_to_news';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {addCommentToNews} from '../../store/features/NewsSlice';
import CommentCard from './comcard';
type Props = NativeStackScreenProps<RootStackParams, 'CommentsScreen'>;

const CommentsScreen: React.FC<Props> = ({route, navigation}) => {
  const dispatch = useAppDispatch();
  //TODO: get comments from redux cok fazla render yapıyo yoksa
  const [comment, setComment] = React.useState('');

  // get commments from redux
  const aNew = useAppSelector(state => state.NewsSlice.news);
  const commentCount =
    aNew.find(item => item.newsId === route.params.newsId)?.comments.length ??
    '0';
  console.log('aNew', aNew.length);

  return (
    <View
      style={{
        flex: 1,
        alignContent: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
      <View
        style={{
          height: 50,
        }}>
        {CustomAppBar('Responses(' + commentCount + ')', [], [], navigation)}
        <View style={{height: 1, backgroundColor: 'gray'}}></View>
      </View>
      <FlatList
        data={aNew?.find(item => item.newsId === route.params.newsId)?.comments}
        renderItem={({item}) => <CommentCard comment={item} />}
        ItemSeparatorComponent={() => (
          <View
            style={{height: 1, backgroundColor: '#rgb(220, 220, 255)'}}></View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <View
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          margin: 10,
        }}>
        <TextInput
          placeholder="Write a comment"
          value={comment}
          onChangeText={text => {
            setComment(text);
          }}
          style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 10}}
          onSubmitEditing={async text => {
            console.log(text.nativeEvent.text);
          }}
        />

        <Button
          style={{
            elevation: 8,

            backgroundColor: '#44A028',
            borderRadius: 0,
            margin: 5,
            borderWidth: 1,
            borderColor: 'gray',
          }}
          onPress={async () => {
            console.log('comment', comment);
            console.log('route.params.newsId', route.params.newsId);
            await commentToNew(comment, route.params.newsId);
            dispatch(
              addCommentToNews({comment: comment, newsId: route.params.newsId}),
            ).then(() => {
              setComment('');
            }
            );
          }}>
          <Text>Post</Text>
        </Button>
      </View>
    </View>
  );
};
export default CommentsScreen;
