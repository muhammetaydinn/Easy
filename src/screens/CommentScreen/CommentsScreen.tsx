import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {Text} from '../../components/atoms/Text';
import {CustomAppBar} from '../../components/molecules/customAppBar';
import {RootStackParams} from '../../navigators/Main';
import {addCommentToNews} from '../../store/features/NewsSlice';
import {useAppDispatch} from '../../store/store';
import CommentCard from './comcard';
import {Comment} from '../../models/comments';
import {getDataJSON} from '../../services/storage/asyncStorage';
type Props = NativeStackScreenProps<RootStackParams, 'CommentsScreen'>;

const CommentsScreen: React.FC<Props> = ({route, navigation}) => {
  const dispatch = useAppDispatch();
  //TODO: get comments from redux cok fazla render yapıyo yoksa
  const [comment, setComment] = React.useState('');
  const [commentList, setCommentList] = React.useState<Comment[]>([]);
  const [user, setUser] = React.useState({
    userId: '',
  });

  useEffect(() => {
    const getUser = async () => {
      const user = await getDataJSON('user');
      setUser(user);
    };
    getUser();
  }, [commentList]);

  // get commments from redux
  const commentCount = null;
  console.log('route.params.newsId', route.params.newsId);

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
        {CustomAppBar(
          'Responses(' + (commentCount ?? '...') + ')',
          [],
          [],
          navigation,
        )}
        <View style={{height: 1, backgroundColor: 'gray'}}></View>
      </View>
      <FlatList
        data={[]}
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
            // await commentToNew(comment, route.params.newsId);
            setCommentList([
              ...commentList,
              {
                userId: user.userId,

                text: comment,
              } as Comment,
            ]);
            dispatch(
              addCommentToNews({
                newsId: route.params.newsId,
                comment: comment,
              }),
            ).then(() => {
              setComment('');
            });
          }}>
          <Text>Post</Text>
        </Button>
      </View>
    </View>
  );
};
export default CommentsScreen;
