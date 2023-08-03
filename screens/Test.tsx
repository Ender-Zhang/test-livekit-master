/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-07-25 23:24:40
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-07-27 20:54:12
 * @FilePath: \test-livekit-master\screens\Test.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VStack, Center, NativeBaseProvider, Text, Spacer, HStack, Input, Radio, ScrollView } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import surveyData from '../assets/data/protocol.json';
import TFComponent from '../components/TFComponent';
import TableComponent from '../components/TableComponent'
import configData from '../assets/data/exercise_config.json';
import Portocol_Setting from '../components/Main_ProtococlSetting';

// import * as Location from 'expo-location';

// async function getLocationPermission() {
//   let { status } = await Location.requestForegroundPermissionsAsync();
//   if (status !== 'granted') {
//     alert('Permission to access location was denied');
//     return;
//   }

//   let location = await Location.getCurrentPositionAsync({});
//   console.log(location);
// }





function TestScreen({ route, navigation } : any) {
  
  // 在需要的地方调用这个函数
  // getLocationPermission();
  return (
    <NativeBaseProvider>
      <Text>Test</Text>
      
    </NativeBaseProvider>
)
};


export default TestScreen;


