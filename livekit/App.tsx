/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-05-15 09:35:40
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-05-16 00:10:42
 * @FilePath: \test-livekit-master\livekit\App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as React from 'react';

import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PreJoinPage } from './PreJoinPage';
import { RoomPage } from './RoomPage';
import Toast from 'react-native-toast-message';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
    <Text>123</Text>
      <NavigationContainer theme={DarkTheme} independent={true}>
        <Stack.Navigator initialRouteName="PreJoinPage">
          <Stack.Screen name="PreJoinPage" component={PreJoinPage} />
          <Stack.Screen name="RoomPage" component={RoomPage} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export type RootStackParamList = {
  PreJoinPage: undefined;
  RoomPage: { url: string; token: string };
};
