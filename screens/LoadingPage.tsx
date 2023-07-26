/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-05-15 09:58:06
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-07-25 20:58:39
 * @FilePath: \test-livekit-master\screens\LoadingPage.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { View, Center, NativeBaseProvider, Button, Text, HStack, Box, Spinner, Heading } from 'native-base';
import React, { useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import Portocol_Setting from '../components/Main_ProtococlSetting'
import practicedata from '../assets/data/Practice.json';
import listdata from '../assets/data/list.json';
import settingData from '../assets/data/SSSSSeting.json';

export default function LoadingPage({ route, navigation } : any) {
    const { userId } = route.params;
    const [timer, setTimer] = React.useState(0);
    const [userInfo, setUserInfo] = React.useState<any>(null);


    // get user info
    //   const handoleGetUserInfo = () => {
    //   var requestOptions = {
    //     method: 'GET',
    //     redirect: 'follow'
    //   };
    //   console.log("userId",userId);
    //   fetch("http://10.0.2.2:8080/api/patient-cases/" + userId, requestOptions)
    //     .then(response => response.json())
    //     .then((result) => { 
    //       // console.log("loading result",result);
    //       writeUserData3(result);
    //     })
    //     .catch(error => console.log('error', error));
    // };

    // get user protocol
    // const handoleGetUserProtocol = () => {
    //   var requestOptions = {
    //     method: 'GET',
    //     redirect: 'follow'
    //   };
    //   console.log("userId",userId);
    //   fetch("http://10.0.2.2:8080/api/sssprotocols/" + userId, requestOptions)
    //     .then(response => response.json())
    //     .then((result) => { 
    //       // console.log("loading result",result);
    //       writeUserData4(result);
    //     })
    //     .catch(error => console.log('error', error));
    // };

    // get livekit token
    const handoleGetLivekitToken = () => {
      // console.log("token")
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      // fetch("http://10.0.2.2:8080/api/generate-token", requestOptions)
      fetch("http://192.168.1.101:8080/api/generate-token", requestOptions)
        .then(response => response.text())
        .then(result => writeUserData6(result))
        .catch(error => console.log('error for token:', error));
    }
    

    // handoleGetUserInfo();
    // handoleGetUserProtocol();
    handoleGetLivekitToken();

    if (timer == 0) {
    writeUserData();
    writeUserData2();
    writeUserData5();
    
    setTimer(1);
    }
  
    function writeUserData() {
      const fileUri = FileSystem.documentDirectory + 'test.json';
      FileSystem.writeAsStringAsync(fileUri, JSON.stringify(listdata));
      // console.log(FileSystem.documentDirectory);
      console.log("writeUserData success");
    }
  
    function writeUserData2() {
      const fileUri = FileSystem.documentDirectory + 'practice.json';
      FileSystem.writeAsStringAsync(fileUri, JSON.stringify(practicedata));
      // console.log(FileSystem.documentDirectory);
      console.log("writeUserData2 success");
    }

    function writeUserData3(userInfo: any) {
      const fileUri2 = FileSystem.documentDirectory + 'userInfo.json';
      FileSystem.writeAsStringAsync(fileUri2, JSON.stringify(userInfo));
      // console.log("userInfo",userInfo);
      console.log("writeUserInfo success");
    }

    function writeUserData4(userInfo: any) {
      const fileUri3 = FileSystem.documentDirectory + 'userProtocol.json';
      FileSystem.writeAsStringAsync(fileUri3, JSON.stringify(userInfo));
      // console.log("userInfo",userInfo);
      console.log("writeUserProtocol success");
    }

    function writeUserData5() {
      const fileUri4 = FileSystem.documentDirectory + 'userSetting.json';
      FileSystem.writeAsStringAsync(fileUri4, JSON.stringify(settingData));
      // console.log("userInfo",userInfo);
      console.log("writeUserSetting success");
    }

    function writeUserData6(result: any) {
      const token = { "token": result }
      // console.log("token11111",token);
      const fileUri5 = FileSystem.documentDirectory + 'livekit_token.json';
      FileSystem.writeAsStringAsync(fileUri5, JSON.stringify(token));
      console.log("writeUserToken success");
    }

    // auto jump to main page
    setTimeout(() => {
        navigation.navigate('MainScreen', {
            userId: userId
        });
      }, 1000); // 5000 毫秒等于 5 秒钟
      


    return (
        <NativeBaseProvider>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <HStack space={2}>
            <Spinner accessibilityLabel="Loading posts" size="lg" />
            <Heading color="primary.500" fontSize="md">
              Loading
            </Heading>
          </HStack>
        </View>
      </NativeBaseProvider>
    )
}