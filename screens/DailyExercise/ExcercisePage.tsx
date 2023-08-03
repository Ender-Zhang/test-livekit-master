/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-24 17:33:59
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-03-28 01:04:18
 * @FilePath: \mobile-end\interaction\screens\ExcercisePage.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VStack, View, NativeBaseProvider, Text, Button, HStack } from 'native-base';



function ExerciseScreen({ route, navigation } : any) {
  const task_id = route.params.task_id;
    return (
      <NativeBaseProvider>
        <View>
            <Text>exercise </Text>
            <Button onPress={() => navigation.navigate('Survey', { type:"post", task_id: task_id})}>Go_PostSurvey</Button>
        </View>
      </NativeBaseProvider>
      );

}

export default ExerciseScreen;