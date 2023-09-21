import {View} from 'react-native';
import {Text} from '../components/atoms/Text';
import PaginationScreen from '../components/Pagination/PaginationComponent';
import { stateEnums } from '../utils/getState';

export const DetailsScreen: React.FC = () => {
  var detailScreen = 'Details Screen';
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <PaginationScreen apiUrl={'/news'}
        stateName={stateEnums.PaginationSlice}
      
      />
    </View>
  );
};
