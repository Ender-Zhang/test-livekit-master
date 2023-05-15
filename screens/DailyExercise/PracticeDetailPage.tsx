/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-04-07 13:43:17
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-04-24 22:11:48
 * @FilePath: \interaction-app\screens\PracticeDetialPage.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component, useEffect, useState,useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VStack, Center, NativeBaseProvider, Button, Text, HStack, Box, Flex, Spacer, AlertDialog, ScrollView } from 'native-base';
// import Form_item from '../components/Form_item';
import { View } from 'react-native';
import { PracticeForm } from '../../components/PracticeForm';
import CacenelButton from '../../components/CancelButton';
import * as FileSystem from 'expo-file-system';
import Textt from '../../components/Textt';
import _, { List } from 'lodash';

function PracticeDetailScreen({ navigation, route }: any) {
    const task_id = route.params && route.params.task_id ? route.params.task_id : 0;
    const uncompleted1 = route.params && route.params.uncompleted ? route.params.uncompleted : 0;
    const practice = route.params && route.params.practiceSet ? route.params.practiceSet : 0;
    const [count, setCount] = useState(0);
    
    useLayoutEffect(() => {
      navigation.setOptions({ title: 'Exercise Detail Page' });
    }, [navigation]);
  

    // get uncompleted from json
    interface MyData {
        title: string;
        data: {
          title: string;
          type: string;
          description: string;
          status: string;
          date: string;
        }[];
        updateUserData: (newData: MyData) => void;
      }
    
      function readJsonFile(): Promise<any> {
        const fileUri = FileSystem.documentDirectory + 'practice.json';
        return FileSystem.getInfoAsync(fileUri)
          .then((fileInfo: { exists: any; }) => {
            if (fileInfo.exists) {
              return FileSystem.readAsStringAsync(fileUri);
            } else {
              console.log('File does not exist');
            }
          })
          .then(fileContent => {
            const jsonData = JSON.parse(fileContent!);
            setMyData(jsonData);
            return jsonData;
          })
          .catch(error => {
            console.error(error);
          });
      }
    
      function myFunction() {
        readJsonFile().then(jsonData => {
          // data = jsonData; // 在异步函数加载完后进行操作
          setTimer(1);
        });
      }
    
      const [myData1, setMyData] = useState<MyData>({ title: '', data: [], updateUserData: () => { } });
      const [timer, setTimer] = useState(0);
      // selet the proper set of practice
      myData1.data = myData1.data.filter(item => item.set == practice);
      console.log("This is practice",practice);
      const uncompletedCount = myData1.data.filter((item: { status: string; }) => item.status == 'uncompleted').length;
      
      myData1.data = _.sortBy(myData1.data, 'date');
      const task_id1 = myData1.data[0]?myData1.data[0].title:0;
      console.log(task_id1);

        if (timer != 1){
            myFunction();
        }

    if (uncompletedCount == 0){

        return (
            <NativeBaseProvider>
            <Flex direction="column" height="100%">
                <Flex flexGrow={1}>
                  <ScrollView>
                    <Text fontSize="xl" bold>All exercise are finished!</Text>
                    <PracticeForm navigation={navigation} practiceSet={practice}/>
                  </ScrollView>
                </Flex>
                <Spacer marginBottom="auto" />
                {/* <Button onPress={() => navigation.navigate('MainScreen', { task_id: 'Practice 1' })}>
                    Cancel
                </Button> */}
                <Button onPress={() => navigation.navigate('Survey', { task_id:{task_id1},type:"post"})}>Finish Session</Button>
            </Flex>
        </NativeBaseProvider>
        )
    }
    return (
        // <NativeBaseProvider>
        //     <Text>This is DetailsScreen</Text>
        //     {/* <Center flex={1}> */}
        //     <PracticeForm navigation={ navigation }/>
        //     <Button onPress={() => navigation.navigate('MainScreen',{ task_id:"Practice 1"})}>Cancel</Button>
        //     {/* </Center> */}
        // </NativeBaseProvider>
        <NativeBaseProvider>
            <Flex direction="column" height="100%">
                <Flex flexGrow={1}>
                    <Text fontSize="xl" bold>There are {uncompletedCount} exercises remain.</Text>
                    <ScrollView>
                    <PracticeForm navigation={navigation} practiceSet={practice}/>
                    </ScrollView>
                </Flex>
                <Spacer marginBottom="auto" />
                {/* <Button onPress={() => navigation.navigate('MainScreen', { task_id: 'Practice 1' })}>
                    Cancel
                </Button> */}
                <CacenelButton navigation={navigation} route={route}/>
            </Flex>
        </NativeBaseProvider>

    )
}

export default PracticeDetailScreen;


