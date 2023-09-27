import { Platform } from 'react-native';

function generateCode(platform) {
  let result = "";
  let characters;

  if(platform === "ios") {
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  } else {
    characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  }

  var charactersLength = characters.length;
  for (var i = 0; i < 30; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const deviceId = () => {
  if (Platform.OS === "android") {
    return generateCode("android");
  } else {
    return generateCode("ios");
  }
}