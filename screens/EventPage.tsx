/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-24 11:36:37
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-03-29 17:32:22
 * @FilePath: \mobile-end\interaction\screens\EventPage.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VStack, Center, NativeBaseProvider, Box, Actionsheet, useDisclose, Button, Text, View, HStack } from 'native-base';
import {Form_item} from '../components/Form_item';
import userdata from '../assets/data/user.json';
import listdata from '../assets/data/list.json';
import * as FileSystem from 'expo-file-system';


var id = 0;

function ActionSheet({ navigation } : any) {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  return <Center>
      <Button onPress={onOpen}>More</Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {/* <Box w="100%" h={60} px={4} justifyContent="center">
            <Text fontSize="16" color="gray.500" _dark={{
            color: "gray.300"
          }}>
              asdfas
            </Text>
          </Box> */}
          <Actionsheet.Item onPress={()=>{
            navigation.navigate('UCEventPage',{
            userId: id
          })
          // navigation.push('Event_list',{
          //   userId: "12312312"
          // })
          }}>completed</Actionsheet.Item>
          <Actionsheet.Item isDisabled>uncompleted</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>;
}



function DetailsScreen({ route, navigation } : any) {
  const { userId } = route.params;
  userdata["user"].id = userId;
  id = userId;
  const [timer, setTimer] = React.useState(0);

  if (timer == 0) {
  writeUserData();
  setTimer(1);
  }

  function writeUserData() {
    const fileUri = FileSystem.documentDirectory + 'test.json';
    FileSystem.writeAsStringAsync(fileUri, JSON.stringify(listdata));
    // console.log(FileSystem.documentDirectory);
    console.log("writeUserData success");
  }
  
  return (
    <NativeBaseProvider >
    <View style={{ width:"100%", height:"100%", alignItems: 'center', justifyContent: 'center' }}>
      <VStack space={2} alignItems="center">
      <Text>Welcome, User: { userId }</Text>
      {/* <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text> */}
      {/* <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} /> */}

      <Form_item navigation={ navigation } status="uncompleted"/>
      <ActionSheet navigation={ navigation }/>
      </VStack>
    </View>
    </NativeBaseProvider>
  );
}

export default DetailsScreen;




