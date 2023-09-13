import AsyncStorage from '@react-native-async-storage/async-storage';

export const logoutStorage = async () => {
  try {
    //print all keys
    const keys = await AsyncStorage.getAllKeys();
    console.log('keys', keys);
    //remove all keys
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error('Error logout:', error);
  }
};
