import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, ScrollView, NativeBaseProvider, Box, View, Button } from 'native-base';
import TFComponent from '../components/TFComponent';
import TableComponent from '../components/TableComponent'
import configData from '../assets/data/exercise_config.json';


function ConfigScreen({ type, route, navigation } : any) {
  const task_id = route.params.task_id;
    return (
        <NativeBaseProvider>
            <Text>exercise Config</Text>
            <ScrollView>
          {/* <TFComponent title="General Protocol Repair: " generalProtocolRepair={configData['IR/ER PROM']} />
          <TFComponent title="StartShoulderSSSPostOpDay: " generalProtocolRepair={surveyData.StartShoulderSSSPostOpDay} />
          <TFComponent title="LengthOfNeedInWeeks: " generalProtocolRepair={surveyData.LengthOfNeedInWeeks} /> */}
          {/* <TableComponent title="IR/ER PROM: " generalProtocolRepair={configData['IR/ER PROM']} /> */}
          <Box>
            {Object.entries(configData).map(([key, value]) => (
              <View key={key}>
                <TableComponent title={key} generalProtocolRepair={value} />
              </View>
            ))}
          </Box>
        </ScrollView>
            <Button onPress={() => navigation.navigate('Exercise', {task_id:task_id})}>Go_Exercise</Button>
        </NativeBaseProvider>
      );
}

export default ConfigScreen;