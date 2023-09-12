import AsyncStorage from '@react-native-async-storage/async-storage';

// Storing data
export const storeDataJSON = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error storing data:' + key, error);
  }
};

// Retrieving data
export const getDataJSON = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error retrieving data:' + key, error);
    return null;
  }
};

export const getAllKeys = async () => {
  try {
    var keys = await AsyncStorage.getAllKeys();
    console.log('keys', keys);
  } catch (e) {}

  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
};
