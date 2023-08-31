import {Text as RNText} from 'react-native';

export const Text = ({fontFam = 'regular', ...props}) => {
  const typo: {[key: string]: any} = {
    light: 'HelveticaNeue Light',
    regular: 'HelveticaNeue Medium',
    bold: 'Helvetica Neu Bold',
  };
  return (
    <RNText {...props} style={[{fontFamily: typo[fontFam],color:"black", ...props.style}]}>
      {props.children??""}
    </RNText>
  );
};
