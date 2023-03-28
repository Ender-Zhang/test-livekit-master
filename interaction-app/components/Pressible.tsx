import { NativeBaseProvider, Box, Pressable, VStack, Badge, Spacer, Text, Flex, Center, View } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

// function goHome({navigation}: any) {
//     // navigation.navigate('Home');
//     console.log("goHome");


function Pressible({task_id, task_date, task_description, type, navigation}: any) {
    return <Box alignItems="center">
        <Pressable onPress={() => navigation.navigate(type,{
            task_id: task_id,
        })} rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" width={"100%"} shadow="3" bg="coolGray.100" p="5">
          <Box >
            <VStack >
                <Text fontSize={10} color="coolGray.800">
                    Task {task_id}
                </Text>
                <Text fontSize={10} color="coolGray.800">
                    Date: {task_date}
                </Text>
                <Text fontSize={10} color="coolGray.800">
                    Description: {task_description}
                </Text>
            </VStack>
            {/* <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
              Marketing License
            </Text> */}
          </Box>
        </Pressable>
      </Box>;
  }

export default Pressible;