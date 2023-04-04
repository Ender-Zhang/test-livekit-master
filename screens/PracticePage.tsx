/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-28 12:56:09
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-04-03 23:15:34
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
import { VStack, Center, NativeBaseProvider, Button, Text, HStack } from 'native-base';
// import Form_item from '../components/Form_item';
import { View } from 'react-native';


function PracticeScreen( {navigation, route}: any) {
  const task_id = route.params && route.params.task_id ? route.params.task_id : 0;
  return (
    <NativeBaseProvider>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <VStack>
        <Text>Practice will start</Text>
        <Button  onPress={() => navigation.navigate('Survey', { type:"pre", task_id:task_id})}>'Start'</Button>
        {/* <Button onPress={() => navigation.navigate('Test')}>'Start'</Button> */}
    </VStack>
    </View>
    </NativeBaseProvider>
  )
}

export default PracticeScreen;