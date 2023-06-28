/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-31 13:49:34
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-06-26 17:54:39
 * @FilePath: \interaction-app\screens\Excercise_config.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, ScrollView, NativeBaseProvider, Box, View, Button } from 'native-base';
import TFComponent from '../../components/TFComponent';
import TableComponent from '../../components/TableComponent'
import configData from '../../assets/data/exercise_config.json';
import Main_ProtococlSetting from '../../components/Main_ProtococlSetting';
import Data from '../../assets/data/protocol_setting.json';
import ProtocolTable from '../../components/ProtocolTable';

function ConfigScreen({ type, route, navigation } : any) {
  const task_id = route.params.task_id;
  const uncompleted = route.params.uncompleted;
  const practiceSet = route.params.practiceSet;
  const task_name = route.params.task_name;
  // console.log("Thissss is practiceSet:", practiceSet);

  useLayoutEffect(() => {
    navigation.setOptions({ title: `${task_name} Setting Form` });
  }, [navigation, task_name]);
  
    return (
        <NativeBaseProvider>
            {/* <Text>Auto Populated from SSS setting API</Text> */}
            <Main_ProtococlSetting data={Data}/>
            {/* <Text>123</Text> */}
            <ProtocolTable />
            <Button onPress={() => navigation.navigate('InstructionPage', { task_id: task_id, uncompleted: uncompleted, practiceSet: practiceSet, task_name: task_name })}>Finish Setting</Button>
        </NativeBaseProvider>
      );
}

export default ConfigScreen;