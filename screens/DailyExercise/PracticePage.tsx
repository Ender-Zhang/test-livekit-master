/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-28 12:56:09
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-04-25 10:59:24
 * @FilePath: \interaction-app\interaction-app\screens\PracticePage.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-24 15:59:09
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-03-29 17:15:43
 * @FilePath: \mobile-end\interaction\screens\PracticePage.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VStack, Center, NativeBaseProvider, Button, Text, Pressable, Box, Flex, Spacer } from 'native-base';
// import Form_item from '../components/Form_item';
import { View } from 'react-native';
import { Form_item } from '../../components/Form_item';
import readFile from '../../function/readFile';
import { Dimensions } from 'react-native';

function PracticeScreen( {navigation, route}: any) {
  const task_id = route.params && route.params.task_id ? route.params.task_id : 0;
  var myData1 = readFile('practice.json');
  const uncompletedCount = myData1.data.filter((item: { status: string; }) => item.status == 'uncompleted').length;
  const completedSet1 = myData1.data.filter(item => item.set === "1").every(item => item.status === "completed");
  const completedSet2 = myData1.data.filter(item => item.set === "2").every(item => item.status === "completed");
  
  // console.log("This is completedSet1:", completedSet1);
  // console.log("This is completedSet2:", completedSet2);

  var component1;
  var component2;

    // 获取屏幕宽度
  const screenWidth = Dimensions.get('window').width;

  // 计算 Pressable 组件需要设置的宽度值
  const pressableWidth = screenWidth * 0.9;
  const pressableHeight = screenWidth * 0.25;

  if (!completedSet1){
    component1 = (
      <Box>
         <Pressable style={{ width: pressableWidth, height: pressableHeight }} onPress={() => navigation.navigate('Survey', { type:"pre", practiceSet:"1"})} 
                    rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="coolGray.100" p="5">
          <Center alignItems="center">
            
            <Text fontSize="xl">First Daily Exercise</Text>
            {/* <Text >Please finish the First Set Pracitce First</Text> */}
          </Center>
          
         </Pressable>
        {/* <Button size="lg" justifyContent="center" alignItems="center" >
          <Flex  justifyContent="center" alignItems="center">
            <Text fontSize="xl">First Set Practice</Text>
          </Flex>
        </Button> */}
      </Box>
    )
  }

  else {
    component1 = (
    //   <Box w="80%" h ="15%">
    //   <Button size="full" justifyContent="center" alignItems="center">
    //     <Flex  justifyContent="center" alignItems="center">
    //       <Text fontSize="xl">First Set Practice</Text>
    //       <Text>Finished</Text>
    //     </Flex>
    //   </Button>
    // </Box>

        <Box>
        <Pressable style={{ width: pressableWidth, height: pressableHeight, opacity: 0.5 }} 
                  rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" maxW="96" shadow="3" bg="grey" p="5">
        <Center alignItems="center">
          <Text fontSize="xl">First Daily Exercise</Text>
          <Text>Finished</Text>
        </Center>
        </Pressable>
        </Box>
    )
  }
  console.log("This is completedSet1:", completedSet1);
  console.log("This is completedSet2:", completedSet2);
  console.log(completedSet1 && !completedSet2);
  if (completedSet1 && !completedSet2){
  component2 = (
      //       <Box w="80%" h ="15%">
      //   <Button size="full" justifyContent="center" alignItems="center" onPress={() => navigation.navigate('Survey', { type:"pre", practiceSet:"2"})}>
      //     <Flex  justifyContent="center" alignItems="center">
      //       <Text fontSize="xl">Second Set Practice</Text>
      //     </Flex>
      //   </Button>
      // </Box>
      <Box>
        
      <Pressable onPress={() => navigation.navigate('Survey', { type:"pre", practiceSet:"2"})} style={{ width: pressableWidth, height: pressableHeight}} rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" shadow="3" bg="coolGray.100" p="5">
        <Center alignItems="center">
        <Text fontSize="xl">Second Daily Exercise</Text>
          {/* <Text>Please finish the First Set Pracitce First</Text> */}
        </Center>
       </Pressable>
    </Box>
  )
  }

  else if (completedSet1 && completedSet2){
    component2 = (
    //   <Box w="80%" h ="15%">
    //   <Button size="full" justifyContent="center" alignItems="center">
    //     <Flex  justifyContent="center" alignItems="center">
    //       <Text fontSize="xl">Second Set Practice</Text>
    //       <Text>Finished</Text>
    //     </Flex>
    //   </Button>
    // </Box>

    <Box>
    <Pressable style={{ width: pressableWidth, height: pressableHeight, opacity: 0.5 }} rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" shadow="3" bg="grey" p="5" disabled>
    <Center alignItems="center">
      <Text fontSize="xl" color="white">Second Daily Exercise</Text>
        <Text>Finished</Text>
    </Center>
     </Pressable>
  </Box>
    )
  }

  else if (!completedSet1 && !completedSet2) {
    component2 = (
      <Box>
        {/* <Button size="full" justifyContent="center" alignItems="center" >
          <Flex  justifyContent="center" alignItems="center">
            <Text fontSize="xl">Second Set Practice</Text>
            <Text>Please finish the First Set Pracitce First</Text>
          </Flex>
        </Button> */}
        <Pressable style={{ width: pressableWidth, height: pressableHeight, opacity: 0.5 }} rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" shadow="3" bg="grey" p="5" disabled>
          <Text fontSize="xl" color="white">Second Daily Set Exercise</Text>
            <Text>Please finish the First Daily Set Exercise First</Text>
         </Pressable>
      </Box>
    )
  }


  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
  // });

  return (
    <NativeBaseProvider>
      {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}

    <Center flex={1}>
    <VStack space={4} alignItems="center">
        {/* <Text>Set1 全部完成：{completedSet1 ? '是' : '否'}</Text> */}
        {/* <Text>Set2 全部完成：{completedSet2 ? '是' : '否'}</Text> */}
        {/* <Box mb={4}>{component1}</Box>
        <Box>{component2}</Box> */}
        {/* <View flex={1} justifyContent= {'center'} alignItems= {'center'}>{component1}</View> */}
        {component1}
        {component2}
    </VStack>
    {/* </View> */}
    </Center>
    </NativeBaseProvider>
  )
}

export default PracticeScreen;