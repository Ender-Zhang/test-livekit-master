/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-24 11:36:37
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-03-31 14:27:20
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

var id = 0;

function DetailsScreen({ route, navigation } : any) {
  const { userId } = route.params;
  userdata["user"].id = userId;
  id = userId;
  const [timer, setTimer] = React.useState(0);

  if (timer == 0) {
  writeUserData();
  setTimer(1);
  }

  function writeUserData() {
    const fileUri = FileSystem.documentDirectory + 'test.json';
    FileSystem.writeAsStringAsync(fileUri, JSON.stringify(listdata));
    // console.log(FileSystem.documentDirectory);
    console.log("writeUserData success");
  }
  
  return (
    <NativeBaseProvider >
      {/* add picture to demonstarte user data and date */}
      <ScrollView nestedScrollEnabled={true}>
        <Center>
          <Image source={
            require("../assets/test_pic/patient_info.png")
          } alt="Alternate Text" size="2xl" />
          <Image source={
            require("../assets/test_pic/date.png")
          } alt="Alternate Text" size="2xl" />
        </Center>
        {/* show the pressible list */}
        {/* <View style={{ width: "100%", height: "100%", alignItems: 'center', justifyContent: 'center' }}>
          <VStack space={2} alignItems="center">
            <Text>Welcome, User: {userId}</Text>
            <Form_item navigation={navigation} status="uncompleted" />
          </VStack>
        </View> */}
        <View style={{ width: "100%", height: "100%", alignItems: 'center', justifyContent: 'center' }}>
          <Portocol_Setting />
        </View>
      </ScrollView>
      <ActionSheet navigation={navigation} id={id} />
    </NativeBaseProvider>
  );
}

export default DetailsScreen;




