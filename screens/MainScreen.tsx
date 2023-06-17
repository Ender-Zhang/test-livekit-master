/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-31 13:49:34
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-06-17 11:09:00
 * @FilePath: \interaction-app\screens\MainScreen.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as React from 'react';
import { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import EventScreen from './EventPage';
import PracticeScreen from './DailyExercise/PracticePage';
import MeetingScreen from './VirtualVisit/MeetingPage';
import TestScreen from './Test';
import { Button } from 'native-base';

const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();

export default function MainScreen({ route, navigation } : any) {
  const { userId } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({ title: '' });
  }, [navigation]);


  
  // Below is for the tab, but somehow it doesn't work
  return (
    <View style={{flex: 1}} collapsable={false}>
    <Tab.Navigator
    // add icon to tab bar
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused
            ? 'home-outline'
            : 'home-outline';
        } else if (route.name === 'Daily Exercise') {
          iconName = focused ? 'body-outline' : 'body-outline';
        } else if (route.name === "Virtual Visit") {
          iconName = focused ? 'videocam-outline' : 'videocam-outline';
        }


        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
        <Tab.Screen name="Home" component={EventScreen} initialParams={{userId:userId}} options={{ headerShown: false }}/>
        <Tab.Screen name="Daily Exercise" component={PracticeScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="Virtual Visit"component={MeetingScreen} options={{ headerShown: false }}/>
        {/* <Tab.Screen name="Test" component={TestScreen}/> */}
      </Tab.Navigator>
    </View>
  );

  // return (
  //   <Button onPress={() => navigation.navigate('Meeting')}> Virtual Visit</Button>
  // );
}