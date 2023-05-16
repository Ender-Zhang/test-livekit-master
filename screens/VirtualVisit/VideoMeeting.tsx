/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-04-23 15:53:59
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-05-16 00:12:57
 * @FilePath: \interaction-app\screens\VideoMeeting.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ZStack, Text, NativeBaseProvider, Center, Button, HStack, Box, View } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { PreJoinPage } from '../../livekit/PreJoinPage';
import { RoomPage } from '../../livekit/RoomPage';
import Livekit from '../../livekit';


function VideoMeetingPage({navigation, route}: any) {
    const task_id = route.params && route.params.task_id ? route.params.task_id : 0;
    const practice = route.params && route.params.practiceSet ? route.params.practiceSet : 0;

    return (
        <NativeBaseProvider>

            
            <Center>
            {/* <Text fontSize="xl">Start Meeting with doctor</Text>
            <ZStack h={650} alignItems="center" justifyContent="center">
                <Center w="90%" h="650" bg="black" rounded="md" shadow={3} />
                <Text color={"white"}>Video</Text>
            </ZStack> */}
            {/* <PreJoinPage /> */}
            <RoomPage />
            {/* <Livekit/> */}
            <Button onPress={() => navigation.navigate('VM_PracticeDetailPage',{ task_id:task_id, uncompleted:-1, practiceSet:practice})}>Start</Button>
            </Center>
        </NativeBaseProvider>
    )
}

export default VideoMeetingPage;