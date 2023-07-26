/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-04-23 15:53:59
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-07-26 00:55:01
 * @FilePath: \interaction-app\screens\VideoMeeting.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component, Suspense, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ZStack, Text, NativeBaseProvider, Center, Button, HStack, Box, View } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { PreJoinPage } from '../../livekit/PreJoinPage';
import { RoomPage } from '../../livekit/RoomPage';
import Livekit from '../../livekit';
import readUserInfo from '../../function/readUserInfo';
import readFileP from '../../function/readFileP';

// import VM_PracticeDetailScreen from './VM_PracticeDetailPage';
// import VM_ConfigScreen from './VM_Excercise_config';
// import VM_InstructionPage from './VM_InstructionPage';
// import VM_PracticeRunningPage from './VM_PracticeRunningPage';
const VM_PracticeDetailScreen = React.lazy(() => import('./VM_PracticeDetailPage'));
const VM_ConfigScreen = React.lazy(() => import('./VM_Excercise_config'));
const VM_InstructionPage = React.lazy(() => import('./VM_InstructionPage'));
const VM_PracticeRunningPage = React.lazy(() => import('./VM_PracticeRunningPage'));


export default function VideoMeetingPage({navigation, route}: any) {
    const task_id = route.params && route.params.task_id ? route.params.task_id : 0;
    const practice = route.params && route.params.practiceSet ? route.params.practiceSet : 0;
    var DisplayComponent = <Text>VideoMeetingPage</Text>
    if (route.params && route.params.pageName == null) {
        // DisplayComponent = <Button onPress={() => navigation.navigate('VM_PracticeDetailPage',{ task_id:task_id, uncompleted:-1, practiceSet:practice})}>Start</Button>
        DisplayComponent = <Button onPress={() => navigation.navigate('VideoMeetingPage',{ pageName:'VM_PracticeDetailPage',task_id:task_id, uncompleted:-1, practiceSet:practice})}>Start</Button>
    }
    else if (route.params && route.params.pageName == 'VM_PracticeDetailPage') {
        DisplayComponent = <VM_PracticeDetailScreen navigation={navigation} route={route} />
    }

    else if (route.params && route.params.pageName == "VM_ConfigScreen") {
        // DisplayComponent = VM_ConfigScreen({navigation, route});
        DisplayComponent = <VM_ConfigScreen navigation={navigation} route={route} />
    }

    else if (route.params && route.params.pageName == "VM_InstructorScreen") {
        // DisplayComponent = VM_InstructionPage({navigation, route});
        DisplayComponent = <VM_InstructionPage navigation={navigation} route={route} />
    }
    
    else if (route.params && route.params.pageName == "VM_PracticeRunningPage") {
        // DisplayComponent = VM_PracticeRunningPage({navigation, route});
        DisplayComponent = <VM_PracticeRunningPage navigation={navigation} route={route} />
    }

    // var token;
    // token = readUserInfo("livekit_token.json");
    // token = "123";
    // var component =<Text>Loading...</Text>
    // if (token != undefined && token != ""){
    //     console.log("token1231231",token);
    //     // component =  <Center><RoomPage token={token["token"]}/></Center>

    // }
    // // console.log("token1",token);
    // return (
    //     <NativeBaseProvider>
    //         {component}
    //         {DisplayComponent}
    //     </NativeBaseProvider>

    // )


    const [token, setToken] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const result = await readFileP("livekit_token.json");
        setToken(result);
      };
  
      fetchData();
    }, []);
  
    if (!token) {
      return (<Text>Loading...</Text>);
    }
  
    return (
        <NativeBaseProvider>
            <Center>
             <RoomPage token={token["token"]} />
             </Center>
             <Suspense fallback={<Text>Loading...</Text>}>
                 {DisplayComponent}
             </Suspense>

        </NativeBaseProvider>

    );
}
// export default VideoMeetingPage;