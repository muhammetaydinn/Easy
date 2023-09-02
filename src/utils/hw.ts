import { Dimensions, StatusBar } from "react-native";

export var width = Dimensions.get('window').width;
export var height = Dimensions.get('window').height;
 export const screenHeight = Dimensions.get('screen').height;
 export const windowHeight = Dimensions.get('window').height;
 export const navbarHeight =
   screenHeight - windowHeight + StatusBar!.currentHeight! ?? 0;