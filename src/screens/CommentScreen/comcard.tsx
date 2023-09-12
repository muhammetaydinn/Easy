import {View, Image, StyleSheet} from 'react-native';
import {Text} from '../../components/atoms/Text';
import CImage from '../../components/atoms/CircleImage';
import {Comment} from '../../models/news';
import TimeAgo from '../../components/molecules/timeago';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({comment}) => {
  return (
    <View style={{flexDirection: 'column', padding: 16}}>
      <View style={styles.container}>
        <CImage
          isProfile={true}
          uri={comment.author.image ?? ''}
          size={30}
          radius={50}
        />
        <View style={{width: 10}} />
        <View style={styles.commentContainer}>
          <Text style={styles.username}>{comment.author.name}</Text>

          <TimeAgo fontSize={10} timestamp={comment.creationTime} />
          <View style={{height: 15}} />
        </View>
      </View>
      <Text style={styles.commentText}>{comment.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  commentContainer: {
    flex: 1,
  },
  username: {
    fontSize: 16,
  },
  commentText: {
    fontSize: 14,
  },
  commentDate: {
    fontSize: 12,
    color: 'gray',
  },
});

export default CommentCard;
