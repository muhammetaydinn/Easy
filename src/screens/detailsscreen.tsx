import {View} from 'react-native';
import {Text} from '../components/atoms/Text';

export const DetailsScreen: React.FC = () => {
  var detailScreen = 'Details Screen';
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text fontFam="regular">{detailScreen}</Text>
    </View>
  );
};
