import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VStack, Center, NativeBaseProvider, Text, Button, HStack, Input, Radio, ScrollView } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import surveyData from '../assets/data/protocol.json';
import TFComponent from '../components/TFComponent';
import TableComponent from '../components/TableComponent'
import configData from '../assets/data/exercise_config.json';

function VCSScreen({ route, navigation } : any) {
  const task_id = route.params.task_id;

  return (
    <NativeBaseProvider>
      <Text>Test</Text>
      <Button onPress={() => navigation.navigate('Protocol', {task_id: task_id})}>Go_Protocol</Button>
    </NativeBaseProvider>
)
};


export default VCSScreen;
