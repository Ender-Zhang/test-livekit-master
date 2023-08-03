/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-31 13:49:34
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-05-21 09:26:34
 * @FilePath: \interaction-app\screens\Excercise_config.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component, useCallback, useState,useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, ScrollView, NativeBaseProvider, Box, Center, Button, ZStack } from 'native-base';
// import TFComponent from '../../components/TFComponent';
// import TableComponent from '../../components/TableComponent'
// import configData from '../../assets/data/exercise_config.json';
// import Main_ProtococlSetting from '../../components/Main_ProtococlSetting';
// import Data from '../../assets/data/instruction.json';
import Stopwatch from '../../components/Timer';
import SensorData from '../../components/SensorData';
import * as FileSystem from 'expo-file-system';
import PracticeSlider from '../../components/PracticeSlider';
import { Alert, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {CustomHeader} from '../../components/VideoCofference';

function VM_PracticeRunningPage({ navigation, route } : any) {
  const task_id = route.params.task_id;
    const uncompleted = route.params.uncompleted;
    const practiceSet = route.params.practiceSet;
    const task_name = route.params.task_name;

    useLayoutEffect(() => {
      navigation.setOptions({ title: 'Exercise Running' });
    }, [navigation]);

  async function readJsonFile(task_id: any ) {
    try {
      const fileUri = FileSystem.documentDirectory + 'practice.json';
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      const listdata = JSON.parse(fileContent);
      // console.log("This is task id:", task_id)
      listdata.data.filter((item: { title: string; status: string; }) => item.title === task_id && item.set == practiceSet)[0].status = "completed";
      console.log("change completed");
      // console.log(listdata.data); // output json data
      FileSystem.writeAsStringAsync(fileUri, JSON.stringify(listdata));
    } catch (error) {
      console.error(error);
    }
  }

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
            {/* <ZStack h={150} alignItems="center" justifyContent="center">
            <Center w="90%" h="150" bg="black" rounded="md" shadow={3} />
            <Text color={"white"}>Video</Text>
            </ZStack> */}
            <Text fontSize="2xl" bold>{ task_name } Exercise Running</Text>
            
            <ScrollView>
            <YoutubePlayer
              height={220}
              play={playing}
              videoId={videoId}
              onChangeState={onStateChange}
            />
            
            <Box>
                <Stopwatch />
            </Box>
            <Text fontSize="2xl" bold>Sensor Data</Text>
            {/* <ScrollView> */}
            <Box>
            <Text fontSize="xl" bold>ROM Progress Towards</Text>
            <PracticeSlider min={0} max={6} step={0.5} name={"Weeks"}/>
            </Box>

            <Box>
            <Text fontSize="xl" bold>Passive Internal/External Rotation</Text>
            <PracticeSlider min={0} max={90} step={5} name={"IR"}/>
            <PracticeSlider min={0} max={90} step={5} name={"ER"}/>
            </Box>

            <Box>
            <Text fontSize="xl" bold>Active Internal/External Rotation</Text>
            <PracticeSlider min={0} max={90} step={5} name={"IR"}/>
            <PracticeSlider min={0} max={90} step={5} name={"ER"}/>
            </Box>

            <Box>
            <Text fontSize="xl" bold>Protraction/Retraction</Text>
            <PracticeSlider min={0} max={90} step={5} name={"IR"}/>
            <PracticeSlider min={0} max={90} step={5} name={"ER"}/>
            </Box>

            <Box>
            <Text fontSize="xl" bold>Foward Elevation</Text>
            <PracticeSlider min={0} max={90} step={5} name={"IR"}/>
            <PracticeSlider min={0} max={90} step={5} name={"ER"}/>
            </Box>

            <Box>
            <Text fontSize="xl" bold>Abduction</Text>
            <PracticeSlider min={0} max={90} step={5} name={"IR"}/>
            <PracticeSlider min={0} max={90} step={5} name={"ER"}/>
            </Box>
            </ScrollView>

            <Button onPress={() => {
                readJsonFile(task_id);
                // navigation.navigate('PracticeDetialPage', { task_id: task_id, uncompleted: uncompleted - 1 })}}>Finish Practice</Button>
                // navigation.push('VM_PracticeDetailPage', { task_id: task_id, practiceSet: practiceSet, task_name: task_name })}}>Finish Exercise</Button>
                navigation.push('VideoMeetingPage', { pageName:"VM_PracticeDetailPage",task_id: task_id, practiceSet: practiceSet, task_name: task_name })}}>Finish Exercise</Button>
        </NativeBaseProvider>
      );
}

export default VM_PracticeRunningPage;