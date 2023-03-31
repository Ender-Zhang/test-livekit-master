import React, { Component } from 'react';
import { VStack, Center, NativeBaseProvider, Box, Actionsheet, useDisclose, Button, Text, View, HStack } from 'native-base';

export default function ActionSheet({ navigation, id} : any) {
    const {
      isOpen,
      onOpen,
      onClose
    } = useDisclose();
    return <Center>
        <Button onPress={onOpen}>More</Button>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            {/* <Box w="100%" h={60} px={4} justifyContent="center">
              <Text fontSize="16" color="gray.500" _dark={{
              color: "gray.300"
            }}>
                asdfas
              </Text>
            </Box> */}
            <Actionsheet.Item onPress={()=>{
              navigation.navigate('UCEventPage',{
              userId: id
            })
            }}>completed</Actionsheet.Item>
            <Actionsheet.Item isDisabled>uncompleted</Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>;
  }