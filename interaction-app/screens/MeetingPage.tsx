import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VStack, Text, NativeBaseProvider, Box, Button, HStack } from 'native-base';



function MeetingScreen({navigation}: any) {
  return (
    <NativeBaseProvider>
    <Box>
        <Text>Meeting</Text>
        <Button onPress={() => navigation.navigate('Survey', { type:"pre_vcs"})}>Start</Button>
    </Box>
    </NativeBaseProvider>
  )
}

export default MeetingScreen;