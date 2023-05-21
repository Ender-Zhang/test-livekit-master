/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-05-15 09:35:40
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-05-21 07:56:34
 * @FilePath: \test-livekit-master\App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import { Button, Text, View, NativeBaseProvider, Input, VStack, HStack } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './screens/EventPage';
import PracticeScreen from './screens/DailyExercise/PracticePage';
import MeetingScreen from './screens/VirtualVisit/MeetingPage';
import SurveyScreen from './screens/SurveyPage';
import ProtocolScreen from './screens/DailyExercise/ProtocolPage';
import ExerciseScreen from './screens/DailyExercise/ExcercisePage';
import ConfigScreen from './screens/DailyExercise/Excercise_config';
import ExcerciseScreen from './screens/DailyExercise/ExcercisePage';
// import TestScreen from './screens/Test';
// import VCSScreen from './screens/Connect_VCS';
import UCEventScreen from './screens/UCEventPage';
import MainScreen from './screens/MainScreen';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PracticeDetailScreen from './screens/DailyExercise/PracticeDetailPage';
import InstructionPage from './screens/DailyExercise/InstructionPage';
import PracticeRunningPage from './screens/DailyExercise/PracticeRunningPage';
import LoadingPage from './screens/LoadingPage';
import VideoMeetingPage from './screens/VirtualVisit/VideoMeeting';
import VM_PracticeDetailScreen from './screens/VirtualVisit/VM_PracticeDetailPage';
import VM_InstructionPage from './screens/VirtualVisit/VM_InstructionPage';
import VM_PracticeRunningPage from './screens/VirtualVisit/VM_PracticeRunningPage';
import VM_ConfigScreen from './screens/VirtualVisit/VM_Excercise_config';
// import MeetingScreen from './VirtualVisit/MeetingPage';

import { registerGlobals } from '@livekit/react-native';
import { LogLevel, setLogLevel } from 'livekit-client';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import Livekit from "./livekit";
import * as React from 'react';

import { PreJoinPage } from './livekit/PreJoinPage';
import { RoomPage } from './livekit/RoomPage';

// import {enableScreens} from 'react-native-screens'
// enableScreens()

setJSExceptionHandler((error) => {
  console.log('error:', error, error.stack);
}, true);

setLogLevel(LogLevel.debug);
registerGlobals();

// AppRegistry.registerComponent(appName, () => App);
// export default function App() {
//   return (
//     // <Livekit />
//   );
// }

function HomeScreen({ navigation }: any) {
  const [value, onChangeText] = React.useState('');
  return (
    <NativeBaseProvider>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <VStack space={2} alignItems="center">
          <HStack space={2} alignItems="center">
            <Text>Patient ID</Text>
            <Input mx="3" placeholder="ID" w="50%" onChange={
              (e) => {
                // console.log(e.nativeEvent.text);
                onChangeText(e.nativeEvent.text);
              }
            } />
          </HStack>
          <HStack space={2} alignItems="center">
            <Text>Password</Text>
            <Input mx="3" placeholder="ID" w="50%" onChange={
              (e) => {
                // console.log(e.nativeEvent.text);
                onChangeText(e.nativeEvent.text);
              }
            } />
          </HStack>
        </VStack>

      <Button
        onPress={() => {
          // navigation.navigate('MainScreen', {
          navigation.navigate('LoadingPage', {
            userId: value
        });
      }}
      >Login</Button>

    </View>

    </NativeBaseProvider>
  );
}



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PreJoinPage" component={PreJoinPage} />
        <Stack.Screen name="RoomPage" component={RoomPage} />
        <Stack.Screen name="Event_list" component={DetailsScreen} />
        <Stack.Screen name="Practice" component={PracticeScreen} />
        <Stack.Screen name="Meeting" component={MeetingScreen} />
        <Stack.Screen name="Survey" component={SurveyScreen} />
        <Stack.Screen name="Protocol" component={ProtocolScreen} />
        <Stack.Screen name="Exercise" component={ExerciseScreen} />
        <Stack.Screen name="Config" component={ConfigScreen} />
        <Stack.Screen name="ExcercisePage" component={ExcerciseScreen} />
        {/* <Stack.Screen name="Test" component={TestScreen} /> */}
        {/* <Stack.Screen name="Connect_VCS" component={VCSScreen} /> */}
        <Stack.Screen name="UCEventPage" component={UCEventScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="PracticeDetailPage" component={PracticeDetailScreen} />

        <Stack.Screen name="LoadingPage" component={LoadingPage} />
        <Stack.Screen name="VideoMeetingPage" component={VideoMeetingPage} ></Stack.Screen>
        {/* <Stack.Screen name="Virtual Visit" component={MeetingScreen} ></Stack.Screen> */}
        {/* if I uncomment below code the app will crush, dont know why */}
        <Stack.Screen name="InstructionPage" component={InstructionPage} />
        {/* <Stack.Screen name="PracticeRunningPage" component={PracticeRunningPage} /> */}
        <Stack.Screen name="VM_PracticeDetailPage" component={VM_PracticeDetailScreen} ></Stack.Screen>
        {/* <Stack.Screen name="VM_InstructionPage" component={VM_InstructionPage}></Stack.Screen>
        <Stack.Screen name="VM_PracticeRunningPage" component={VM_PracticeRunningPage}></Stack.Screen>
        <Stack.Screen name="VM_ConfigScreen" component={VM_ConfigScreen}></Stack.Screen> */}
      </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>

  );
}
