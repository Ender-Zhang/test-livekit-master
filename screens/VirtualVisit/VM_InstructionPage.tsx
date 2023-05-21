/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-31 13:49:34
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-05-21 09:19:00
 * @FilePath: \interaction-app\screens\Excercise_config.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component, useCallback, useState, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, ScrollView, NativeBaseProvider, Box, View, Button, Center, ZStack } from 'native-base';
import TFComponent from '../../components/TFComponent';
import TableComponent from '../../components/TableComponent'
import configData from '../../assets/data/exercise_config.json';
import Main_ProtococlSetting from '../../components/Main_ProtococlSetting';
import Data from '../../assets/data/instruction.json';
import { WebView } from 'react-native-webview';
import { Alert, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {CustomHeader} from '../../components/VideoCofference';

function VM_InstructionPage({ navigation, route } : any) {
  const task_id = route.params.task_id;
  const uncompleted = route.params.uncompleted;
  const practiceSet = route.params.practiceSet;
  const task_name = route.params.task_name;

  console.log("task_name:", task_name);

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Instruction Page' });
  }, [navigation]);
  

  // choose the video to play
  var videoId = "";
  if (task_name == "Internal / External Rotation") {
    videoId = "KvsPJhrtLMM";
  } else if (task_name == "Protraction / retraction") {
    videoId = "ry88osk3YLo";
  } else if (task_name == "IsometricS") {
    videoId = "9fNghrikpsw";
  } else if (task_name == "Passive Forward Elevation") {
    videoId = "gkIFrnLsknQ";
  } else if (task_name == "Passive Abduction") {
    videoId = "75FcBJ83XpM";
  }

  // for video
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state:any) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

    return (
        <NativeBaseProvider>
          {/* <CustomHeader /> */}
            <Text fontSize="2xl" bold>{task_name} Instructions</Text>
            {/* <ZStack h={20} alignItems="center" justifyContent="center">
            <Center w="90%" h="20" bg="black" rounded="md" shadow={3} />
            <Text color={"white"}>Video</Text>
            </ZStack> */}
            <YoutubePlayer
              height={300}
              play={playing}
              videoId={videoId}
              onChangeState={onStateChange}
            />
            {/* <Text fontSize="2xl" bold>Auto Populated from SSS setting API</Text> */}
            <Main_ProtococlSetting data={Data} />
            {/* <Button onPress={() => navigation.navigate('VM_PracticeRunningPage', { task_id: task_id, uncompleted: uncompleted, practiceSet:practiceSet, task_name: task_name })}>Start Exercise</Button> */}
            <Button onPress={() => navigation.navigate('VideoMeetingPage', { pageName:"VM_PracticeRunningPage",task_id: task_id, uncompleted: uncompleted, practiceSet:practiceSet, task_name: task_name })}>Start Exercise</Button>
        </NativeBaseProvider>
      );
}

export default VM_InstructionPage;