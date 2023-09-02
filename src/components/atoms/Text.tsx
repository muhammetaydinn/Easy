import {Text as RNText} from 'react-native';

type CustomTextProps = {
  fontFam?:'light' | 'regular' | 'bold';
  style?: any;
  children?: any;
  props?: any;
};

export const Text : React.FC<CustomTextProps>= ({children,fontFam,style,props}) => {
  const typo: {[key: string]: string} = {
    light: 'HelveticaNeue Light',
    regular: 'HelveticaNeue Medium',
    bold: 'Helvetica Neu Bold',
  };
  return (
    <RNText
    {...props}
      style={[{fontFamily: typo[fontFam??"regular"], color: 'black', ...style}]}>
      {children ?? ''}
    </RNText>
  );
};
