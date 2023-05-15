import { View, Center, NativeBaseProvider, Button, Text, HStack, Box, Spinner, Heading } from 'native-base';
import React from 'react';
import * as FileSystem from 'expo-file-system';
import Portocol_Setting from '../components/Main_ProtococlSetting'
import practicedata from '../assets/data/Practice.json';
import listdata from '../assets/data/list.json';

export default function LoadingPage({ route, navigation } : any) {
    const { userId } = route.params;
    const [timer, setTimer] = React.useState(0);

    if (timer == 0) {
    writeUserData();
    writeUserData2();
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