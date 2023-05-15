import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, ScrollView, NativeBaseProvider, Box, View, Button, VStack } from 'native-base';
import TFComponent from '../../components/TFComponent';
import TableComponent from '../../components/TableComponent'
import surveyData from '../../assets/data/protocol.json';


function ProtocolScreen({ type, route, navigation } : any) {
  const task_id = route.params.task_id;
  return (

    <NativeBaseProvider>
        <Text>exercise protocol</Text>
        <ScrollView>
          <VStack space={4} alignItems="center">
          <TFComponent title="General Protocol Repair: " generalProtocolRepair={surveyData.generalProtocolRepair} />
          <TFComponent title="StartShoulderSSSPostOpDay: " generalProtocolRepair={surveyData.StartShoulderSSSPostOpDay} />
          <TFComponent title="LengthOfNeedInWeeks: " generalProtocolRepair={surveyData.LengthOfNeedInWeeks} />
          <TableComponent title="IRPROM: " generalProtocolRepair={surveyData.Exercise['2Sets15Reps2xDaily'].IRPROM} />

            {Object.entries(surveyData.Exercise['2Sets15Reps2xDaily']).map(([key, value]) => (
              <View key={key} >
                <TableComponent title={key} generalProtocolRepair={value} />
              </View>
            ))}
          </VStack>
        </ScrollView>
        <Button onPress={() => navigation.navigate('Config', {task_id:task_id})} >Go_Config</Button>
    </NativeBaseProvider>
  );

}

export default ProtocolScreen;