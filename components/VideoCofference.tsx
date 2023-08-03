/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-04-25 19:23:37
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-05-09 02:20:52
 * @FilePath: \interaction-app\components\VideoCofference.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component, useState } from 'react';
import { View } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ZStack, Text, Center, Button, HStack, Box} from 'native-base';



import { NativeBaseProvider, useTheme } from 'native-base';


export const CustomHeader = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <View>
      <Text style={{ fontSize: 24 }}>Count: {count}</Text>
      <Button onPress={increment}>+</Button>
      <Button onPress={decrement}>-</Button>
    </View>
  );
};