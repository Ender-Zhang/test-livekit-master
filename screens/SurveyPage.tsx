/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-24 17:30:58
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-05-16 08:34:42
 * @FilePath: \mobile-end\interaction\screens\SurveyPage.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEo
 */
import React, { Component,useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VStack, Center, NativeBaseProvider, Text, Button, HStack, Flex, Spacer } from 'native-base';
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
  const practice = route.params.practiceSet;
  // console.log("1This is task id:", task_id);

  if (type == "pre") {

    useLayoutEffect(() => {
      navigation.setOptions({ title: 'Pre-Survey' });
    }, [navigation]);

    return (
        <NativeBaseProvider >
            <SurveyList/>

            {/* <Button onPress={() => navigation.navigate('Protocol',{ task_id:task_id})}>Go_Protocol</Button> */}
            <Flex direction="row" alignItems="center" justifyContent="flex-end">
              <Button rounded={'none'} onPress={() => navigation.navigate('MainScreen',{ task_id:task_id})} size="lg" flex={1} >Cancel</Button>
              <Button rounded={'none'} onPress={() => navigation.navigate('PracticeDetailPage',{ task_id:task_id, uncompleted:-1, practiceSet:practice})} size="lg" flex={1}>Exercise</Button>
            </Flex>
        </NativeBaseProvider>
      );
  }

  if (type == "pre_vcs") {
    useLayoutEffect(() => {
      navigation.setOptions({ title: 'Pre-Survey' });
    }, [navigation]);
    return (
        <NativeBaseProvider >
            {/* <Text>Pre-Survey</Text>
            <SurveyList/>
          
            <Flex direction="row" alignItems="center" justifyContent="center">
              <Spacer />
              <Button onPress={() => navigation.navigate('MainScreen',{ task_id:task_id})} size="lg" flex={1}>Cancel</Button>
              <Spacer />
              <Button onPress={() => navigation.navigate('VideoMeetingPage',{ task_id:task_id, practiceSet:practice})} size="lg" flex={1}>Exercise</Button>
              <Spacer />
            </Flex> */}
            
            {/* uncomment will cause RNSVGPath not found */}
            {/* <SurveyList/> */}

            {/* <Button onPress={() => navigation.navigate('Protocol',{ task_id:task_id})}>Go_Protocol</Button> */}
            <Flex direction="row" alignItems="center" justifyContent="flex-end">
              <Button rounded={'none'} onPress={() => navigation.navigate('MainScreen',{ task_id:task_id})} size="lg" flex={1} >Cancel</Button>
              <Button rounded={'none'} onPress={() => navigation.navigate('VideoMeetingPage',{ task_id:task_id, practiceSet:practice})} size="lg" flex={1}>Exercise</Button>
            </Flex>
        </NativeBaseProvider>
      );
  }

  else {
    useLayoutEffect(() => {
      navigation.setOptions({ title: 'Post-Survey' });
    }, [navigation]);
    return (
        <NativeBaseProvider >
            <SurveyList/>
            <Button onPress={() => {
              // listdata[0].data.filter(item => item.title === "Practice 1")[0].status = "completed";
              // readJsonFile(task_id);
              console.log("This is task id:", task_id.task_id1);
              // only the last post survey will complete the task
              if (practice == 2){
                readJsonFile(task_id.task_id);
              }
              // readJsonFile(task_id.task_id1);
            // navigation.navigate('Event_list',{
            // navigation.push('Event_list',{
            navigation.push('MainScreen',{
          userId: value
        })}}>Finish</Button>
        </NativeBaseProvider >
      );
  }
}

export default SurveyScreen;




