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

function TestScreen({ route, navigation } : any) {
  

  return (
    <NativeBaseProvider>
      <Text>Test</Text>
      <Portocol_Setting />
    </NativeBaseProvider>
)
};


export default TestScreen;


