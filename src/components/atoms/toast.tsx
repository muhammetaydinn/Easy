import Toast from "react-native-toast-message";

export const showToast = (remoteMessage: any) => {
  Toast.show({
    type: 'success',
    text1: remoteMessage.notification.title,
    text2: remoteMessage.notification.body + '👋',
  });
};
