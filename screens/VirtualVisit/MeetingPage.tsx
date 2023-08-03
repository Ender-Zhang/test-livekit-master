/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-04-03 23:01:49
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-05-15 20:11:22
 * @FilePath: \interaction-app\screens\MeetingPage.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-04-03 23:01:49
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-04-23 11:15:53
 * @FilePath: \interaction-app\screens\MeetingPage.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-31 13:49:34
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-04-10 22:02:22
 * @FilePath: \interaction-app\screens\MeetingPage.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VStack, Text, NativeBaseProvider, Center, Button, HStack, Box, Pressable } from 'native-base';
import {Form_item} from '../../components/Form_item';
import readFile from '../../function/readFile';
import { Dimensions } from 'react-native';


function MeetingScreen({navigation, route}: any) {
  const task_id = route.params && route.params.task_id ? route.params.task_id : 0;
  var myData1 = readFile('practice.json');
  const uncompletedCount = myData1.data.filter((item: { status: string; }) => item.status == 'uncompleted').length;
  const completedSet1 = myData1.data.filter(item => item.set === "1").every(item => item.status === "completed");
  const completedSet2 = myData1.data.filter(item => item.set === "2").every(item => item.status === "completed");
  

  var component1;

    // 获取屏幕宽度
  const screenWidth = Dimensions.get('window').width;

  // 计算 Pressable 组件需要设置的宽度值
  const pressableWidth = screenWidth * 0.9;
  const pressableHeight = screenWidth * 0.25;

  if (!completedSet1){
    component1 = (
      <Box>
         <Pressable style={{ width: pressableWidth, height: pressableHeight }} onPress={() => navigation.navigate('Survey', { type:"pre_vcs", practiceSet:"1"})} 
                    rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5">
          <Center alignItems="center">
            <Text fontSize="xl">Connect to your Doctor</Text>
            <Text>Tap to start!</Text>
          </Center>
         </Pressable>
      </Box>
    )
  }

  else {
    component1 = (
        <Box>
        <Pressable style={{ width: pressableWidth, height: pressableHeight, opacity: 0.5 }} 
                  rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="grey" p="5">
        <Center alignItems="center">
          <Text fontSize="xl">Connet to your Doctor</Text>
          <Text>The session is finished</Text>
        </Center>
        </Pressable>
        </Box>
    )
  }

  return (

    // <NativeBaseProvider>
    // <Center flex={1}>
    //     <Text>Meeting</Text>
    //     {/* <Form_item navigation={ navigation } status="practice"/> */}
    //     <Button onPress={() => navigation.navigate('Survey', { type:"pre"})}>Start</Button>
    // </Center>
    // </NativeBaseProvider>
    <NativeBaseProvider>
      <Center flex={1}>
        <VStack space={4} alignItems="center">
            {component1}
        </VStack>
      </Center>
    </NativeBaseProvider>
  )
}

export default MeetingScreen;