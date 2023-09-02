import { View } from "react-native";
import { Appbar } from "react-native-paper";


export const CustomAppBar = (
  appBarTitle: string,
  iconList: string[],
  onpressList: any[],navigation:any
) => {
  return (
    <View style={{flex:1}}>
      <Appbar.Header style={{backgroundColor: 'white'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={appBarTitle} />
        {iconList.map((iconName, index) => {
          return (
            <Appbar.Action
              key={index.toString()}
              icon={iconName}
              onPress={onpressList[index]}
            />
          );
        })}
        {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
      </Appbar.Header>
    </View>
  );
};
