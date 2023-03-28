/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-24 15:59:09
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-03-28 00:56:05
 * @FilePath: \mobile-end\interaction\screens\PracticePage.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VStack, Center, NativeBaseProvider, Button, Text, HStack } from 'native-base';
// import Form_item from '../components/Form_item';
import { View } from 'react-native';


function PracticeScreen( {navigation, route}: any) {
  const task_id = route.params.task_id;
  return (
    <NativeBaseProvider>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <VStack>
        <Text>Practice will start</Text>
        <Button  onPress={() => navigation.navigate('Survey', { type:"pre", task_id:task_id})}>'Start'</Button>
        {/* <Button title='Start' onPress={() => navigation.navigate('Test')}/>  */}
    </VStack>
    </View>
    </NativeBaseProvider>
  )
}

export default PracticeScreen;