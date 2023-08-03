/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-31 13:49:34
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-07-04 21:15:19
 * @FilePath: \interaction-app\screens\Excercise_config.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, ScrollView, NativeBaseProvider, Box, View, Button, Center } from 'native-base';
import TFComponent from '../../components/TFComponent';
import TableComponent from '../../components/TableComponent'
import configData from '../../assets/data/exercise_config.json';
import Main_ProtococlSetting from '../../components/Main_ProtococlSetting';
import Data from '../../assets/data/protocol_setting.json';
import ProtocolTable from '../../components/ProtocolTable';
import readUserInfo from '../../function/readUserInfo';

function ConfigScreen({ type, route, navigation } : any) {
  const task_id = route.params.task_id;
  const uncompleted = route.params.uncompleted;
  const practiceSet = route.params.practiceSet;
  const task_name = route.params.task_name;
  
  let height = 0;
  let incline = 0;
  let shuttle = 0;
  let frontBand = 0;
  let backBand = 0;
  let frontStop = 0;
  let backStop = 0;
  let irPin = 0;
  let erPin = 0;
  let wand = 0;
  let stance = 0;
  let aFrontFoot = 0;
  let uaBackFoot = 0;

  const userSetting = readUserInfo('userSetting.json')
  if (userSetting){
    height = userSetting["setsRepsIrErAaa"]["height"];
    incline = userSetting["setsRepsIrErAaa"]["incline"];
    shuttle = userSetting["setsRepsIrErAaa"]["shuttle"];
    frontBand = userSetting["setsRepsIrErAaa"]["frontBand"];
    backBand = userSetting["setsRepsIrErAaa"]["backBand"];
    frontStop = userSetting["setsRepsIrErAaa"]["frontStop"];
    backStop = userSetting["setsRepsIrErAaa"]["backStop"];
    irPin = userSetting["setsRepsIrErAaa"]["irPin"];
    erPin = userSetting["setsRepsIrErAaa"]["erPin"];
    wand = userSetting["setsRepsIrErAaa"]["wand"];
    stance = userSetting["setsRepsIrErAaa"]["stance"];
    aFrontFoot = userSetting["setsRepsIrErAaa"]["aFrontFoot"];
    uaBackFoot = userSetting["setsRepsIrErAaa"]["uaBackFoot"];
  }

  useLayoutEffect(() => {
    navigation.setOptions({ title: `${task_name} Setting Form` });
  }, [navigation, task_name]);
  

  const component1 = () => (
    <Center>
      <Text fontSize="2xl" bold>Device Setting</Text>
      <Text fontSize="xl" >Height: {height}</Text>
      <Text fontSize="xl" >Incline: {incline}</Text>
      <Text fontSize="xl" >Shuttle: {shuttle}</Text>
      <Text fontSize="xl" >Front Band: {frontBand}</Text>
      <Text fontSize="xl" >Back Band: {backBand}</Text>
      <Text fontSize="xl" >Front Stop: {frontStop}</Text>
      <Text fontSize="xl" >Back Stop: {backStop}</Text>
      <Text fontSize="xl" >IR Pin: {irPin}</Text>
      <Text fontSize="xl" >ER Pin: {erPin}</Text>
      <Text fontSize="xl" >Wand: {wand}</Text>
      <Text fontSize="xl" >Stance: {stance}</Text>
      <Text fontSize="xl" >AFrontFoot: {aFrontFoot}</Text>
      <Text fontSize="xl" >UABackFoot: {uaBackFoot}</Text>
    </Center>
    );
    return (
        <NativeBaseProvider>
            {/* <Text>Auto Populated from SSS setting API</Text> */}
            <Main_ProtococlSetting data={Data}/>
            <ScrollView>
            {component1()}
            <ProtocolTable />
            </ScrollView>
            <Button onPress={() => navigation.navigate('InstructionPage', { task_id: task_id, uncompleted: uncompleted, practiceSet: practiceSet, task_name: task_name })}>Finish Setting</Button>
        </NativeBaseProvider>
      );
}

export default ConfigScreen;