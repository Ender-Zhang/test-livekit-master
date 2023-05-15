/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-24 11:36:37
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-04-25 10:53:18
 * @FilePath: \mobile-end\interaction\screens\EventPage.tsx
 */

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VStack, Center, NativeBaseProvider, Box, useDisclose, Button, Text, View, HStack, Image,  SectionList, Container } from 'native-base';
import {ScrollView } from 'react-native';
import {Form_item} from '../components/Form_item';
import userdata from '../assets/data/user.json';
import listdata from '../assets/data/list.json';
import * as FileSystem from 'expo-file-system';
import ActionSheet from '../components/ActionSheet';
import Portocol_Setting from '../components/Main_ProtococlSetting'
import practicedata from '../assets/data/Practice.json';

// thd data displayed on the home page is from the list.json file
var id = 0;

function DetailsScreen({ route, navigation } : any) {
  const { userId } = route.params;
  userdata["user"].id = userId;
  id = userId;

  // write json file to system
  // const [timer, setTimer] = React.useState(0);

  // if (timer == 0) {
  // writeUserData();
  // writeUserData2();
  // setTimer(1);
  // }

  // function writeUserData() {
  //   const fileUri = FileSystem.documentDirectory + 'test.json';
  //   FileSystem.writeAsStringAsync(fileUri, JSON.stringify(listdata));
  //   // console.log(FileSystem.documentDirectory);
  //   console.log("writeUserData success");
  // }

  // function writeUserData2() {
  //   const fileUri = FileSystem.documentDirectory + 'practice.json';
  //   FileSystem.writeAsStringAsync(fileUri, JSON.stringify(practicedata));
  //   // console.log(FileSystem.documentDirectory);
  //   console.log("writeUserData2 success");
  // }
  
  return (
    <NativeBaseProvider >
      {/* add picture to demonstarte user data and date */}
      <ScrollView nestedScrollEnabled={true}>
        <Center>
          <Text fontSize="4xl" bold>Hi, {userdata["user"].name}</Text>
          <Text fontSize="2xl" bold>Your Physician is {userdata["user"].physician}</Text>
          <Text fontSize="2xl" bold>The device {userdata["user"].VCS_Devices} is assigned</Text>
        </Center>
        {/* show the pressible list */}
        <View style={{ width: "100%", height: "100%", alignItems: 'center', justifyContent: 'center' }}>
          <VStack space={2} alignItems="center">
            <Form_item navigation={navigation} status="uncompleted" />

        {/* </View> */}
        {/* <View style={{ width: "100%", height: "100%", alignItems: 'center', justifyContent: 'center' }}> */}
          {/* <Portocol_Setting /> */}
            <Text fontSize="2xl" bold>Exercise History</Text>
            <Form_item navigation={ navigation } status="completed"/>
            <Text color={"white"}>asdf</Text>
            <Text fontSize={"2xl"} color={"white"}>lasd</Text>
            {/* <Text>asdf</Text> */}
          </VStack>
        </View>
      </ScrollView>
      {/* <ActionSheet navigation={navigation} id={id} /> */}
    </NativeBaseProvider>
  );
}

export default DetailsScreen;




