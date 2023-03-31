/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-24 17:30:58
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-03-28 10:20:07
 * @FilePath: \mobile-end\interaction\screens\SurveyPage.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEo
 */
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VStack, Center, NativeBaseProvider, Text, Button, HStack } from 'native-base';
import SurveyList from '../components/SurveyList';
import userdata from '../assets/data/user.json';
// import listdata from '../assets/data/list.json';
import * as FileSystem from 'expo-file-system';


async function readJsonFile(task_id: any ) {
  try {
    const fileUri = FileSystem.documentDirectory + 'test.json';
    const fileContent = await FileSystem.readAsStringAsync(fileUri);
    const listdata = JSON.parse(fileContent);
    // console.log("This is task id:", task_id)
    listdata.data.filter((item: { title: string; status: string; }) => item.title === task_id)[0].status = "completed";
    // console.log("change completed");
    // console.log(listdata.data); // output json data
    FileSystem.writeAsStringAsync(fileUri, JSON.stringify(listdata));
  } catch (error) {
    console.error(error);
  }
}


function SurveyScreen({ route, navigation } : any) {
  const { type } = route.params;
  const value = userdata["user"].id;
  const task_id = route.params.task_id;

  if (type == "pre") {
    return (
        <NativeBaseProvider >
            <Text>Pre-Survey</Text>
            <SurveyList/>
            <Button onPress={() => navigation.navigate('Protocol',{ task_id:task_id})}>Go_Protocol</Button>
        </NativeBaseProvider>
      );
  }

  if (type == "pre_vcs") {
    return (
        <NativeBaseProvider >
            <Text>Pre-Survey</Text>
            <SurveyList/>
            <Button onPress={() => navigation.navigate('Connect_VCS',{ task_id:task_id})}>Go_Connect_VCS</Button>
        </NativeBaseProvider>
      );
  }

  else {
    return (
        <NativeBaseProvider >
            <Text>Post-Survey</Text>
            <SurveyList/>
            <Button onPress={() => {
              // listdata[0].data.filter(item => item.title === "Practice 1")[0].status = "completed";
              readJsonFile(task_id);
            // navigation.navigate('Event_list',{
            navigation.push('Event_list',{
          userId: value
        })}}>Go_List</Button>
        </NativeBaseProvider >
      );
  }
}

export default SurveyScreen;




