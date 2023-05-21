/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-31 13:49:34
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-05-21 09:16:03
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
import {CustomHeader} from '../../components/VideoCofference';

function VM_ConfigScreen({ route, navigation } : any) {
  const task_id = route.params.task_id;
  const uncompleted = route.params.uncompleted;
  const practiceSet = route.params.practiceSet;
  const task_name = route.params.task_name;

  // useLayoutEffect(() => {
  //   navigation.setOptions({ title: `${task_name} Setting Form` });
  // }, [navigation, task_name]);
  
    return (
        <NativeBaseProvider>
          {/* <CustomHeader /> */}
            {/* <Text>Auto Populated from SSS setting API</Text> */}
            <Main_ProtococlSetting data={Data}/>
            {/* <Button onPress={() => navigation.navigate('VM_InstructionPage', { task_id: task_id, uncompleted: uncompleted, practiceSet: practiceSet, task_name: task_name })}>Finish Setting</Button> */}
            <Button onPress={() => navigation.navigate('VideoMeetingPage', { pageName:"VM_InstructorScreen", task_id: task_id, uncompleted: uncompleted, practiceSet: practiceSet, task_name: task_name })}>Finish Setting</Button>
        </NativeBaseProvider>
        // <Text>asdfasd</Text>
      );
}

export default VM_ConfigScreen;