import {StyleSheet, View} from 'react-native';
import {Text} from '../../components/atoms/Text';
import {Comment} from '../../models/news';

const CommentCard = ({comment}: {comment: Comment}) => {
  return (
    <View style={styles.container}>
      <View style={styles.commentContainer}>
        <View style={styles.commentHeader}>
          <Text>{comment.author.name}</Text>
          <Text>{comment.creationTime}</Text>
        </View>
        <Text style={styles.commentText}>{comment.text}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
        height: 100,
    width: '100%',
  },
  commentContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "pink",
    borderRadius: 25,
    padding: 10,
  },
  commentHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentAuthor: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  commentDate: {
    fontSize: 12,
    color: 'black',
  },
  commentText: {
    fontSize: 14,
    marginTop: 10,
    color: 'black',
  },
});
export default CommentCard;
