import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import EventScreen from './EventPage';
import PracticeScreen from './PracticePage';
import MeetingScreen from './MeetingPage';


const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();



export default function MainScreen({ route, navigation } : any) {
  const { userId } = route.params;
  return (
    <Tab.Navigator
    // add icon to tab bar
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused
            ? 'home-outline'
            : 'home-outline';
        } else if (route.name === 'Daily_Practice') {
          iconName = focused ? 'body-outline' : 'body-outline';
        } else if (route.name === "Virtual_Visit") {
          iconName = focused ? 'videocam-outline' : 'videocam-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
        <Tab.Screen name="Home" component={EventScreen} initialParams={{userId:userId}}/>
        <Tab.Screen name="Daily_Practice" component={PracticeScreen}/>
        <Tab.Screen name="Virtual_Visit"component={MeetingScreen}/>
      </Tab.Navigator>
  );
}