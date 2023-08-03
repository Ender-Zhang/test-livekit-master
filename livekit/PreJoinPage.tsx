// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import type { NativeStackScreenProps } from '@react-navigation/native-stack';



// import { StyleSheet as RNStyleSheet, View as RNView, TextInput as RNTextInput, Text as RNText, Button as RNButton } from 'react-native';
// import type { RootStackParamList } from './App';
// import { useTheme } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const DEFAULT_URL = 'wss://www.example.com';
// const DEFAULT_TOKEN = '';

// const URL_KEY = 'url';
// const TOKEN_KEY = 'token';

// export const PreJoinPage = () => {
//   const [url, setUrl] = useState(DEFAULT_URL);
//   const [token, setToken] = useState(DEFAULT_TOKEN);

//   useEffect(() => {
//     AsyncStorage.getItem(URL_KEY).then((value) => {
//       if (value) {
//         setUrl(value);
//       }
//     });

//     AsyncStorage.getItem(TOKEN_KEY).then((value) => {
//       if (value) {
//         setToken(value);
//       }
//     });
//   }, []);

//   const { colors } = useTheme();

//   let saveValues = (saveUrl: string, saveToken: string) => {
//     AsyncStorage.setItem(URL_KEY, saveUrl);
//     AsyncStorage.setItem(TOKEN_KEY, saveToken);
//   };
//   return (
//     <RNView>
//         <RNText>URL</RNText>
//       <RNTextInput
//         onChangeText={setUrl}
//         value={url}
//       />

//       <RNText>Token</RNText>
//       <RNTextInput
//         onChangeText={setToken}
//         value={token}
//       />

//       {/* <RNButton
//         title="Connect"
//         onPress={() => {
//           navigation.push('RoomPage', { url: url, token: token });
//         }}
//       /> */}

//       <RNView />

//       <RNButton
//         title="Save Values"
//         onPress={() => {
//           saveValues(url, token);
//         }}
//       />

//       <RNView/>

//       <RNButton
//         title="Reset Values"
//         onPress={() => {
//           saveValues(DEFAULT_URL, DEFAULT_TOKEN);
//           setUrl(DEFAULT_URL);
//           setToken(DEFAULT_TOKEN);
//         }}
//       />
//     </RNView>
//   );
// };


import { Text as RNText } from 'react-native';

export const PreJoinPage = () => {
  return (
    <RNText>hwllo</RNText>
  )
}