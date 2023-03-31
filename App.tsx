
/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-24 11:09:38
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-03-31 13:56:22
 * @FilePath: \mobile-end\interaction\App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// In App.js in a new projectasdf
import * as React from 'react';
// import { Button, View, Text } from 'react-native';
import { Button, Text, View, NativeBaseProvider, Input, VStack, HStack } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from './types';
import DetailsScreen from './screens/EventPage';
import PracticeScreen from './screens/PracticePage';
import MeetingScreen from './screens/MeetingPage';
import SurveyScreen from './screens/SurveyPage';
import ProtocolScreen from './screens/ProtocolPage';
import ExerciseScreen from './screens/ExcercisePage';
import ConfigScreen from './screens/Excercise_config';
import ExcerciseScreen from './screens/ExcercisePage';
import TestScreen from './screens/Test';
import VCSScreen from './screens/Connect_VCS';
import UCEventScreen from './screens/UCEventPage';
import MainScreen from './screens/MainScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// interface HomeScreenProps {
//   navigation: HomeScreenNavigationProp;
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
          navigation.navigate('MainScreen', {
          // navigation.navigate('Event_list', {
            userId: value
        });
      }}
      >Login</Button>
    </View>
    </NativeBaseProvider>
  );
}

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Event_list" component={DetailsScreen} />
        <Stack.Screen name="Practice" component={PracticeScreen} />
        <Stack.Screen name="Meeting" component={MeetingScreen} />
        <Stack.Screen name="Survey" component={SurveyScreen} />
        <Stack.Screen name="Protocol" component={ProtocolScreen} />
        <Stack.Screen name="Exercise" component={ExerciseScreen} />
        <Stack.Screen name="Config" component={ConfigScreen} />
        <Stack.Screen name="ExcercisePage" component={ExcerciseScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="Connect_VCS" component={VCSScreen} />
        <Stack.Screen name="UCEventPage" component={UCEventScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />


      </Stack.Navigator>
      {/* tab
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={TestScreen} />
      </Tab.Navigator> */}
    </NavigationContainer>
  );
}

