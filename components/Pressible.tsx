/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-31 13:49:34
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-04-07 14:31:27
 * @FilePath: \interaction-app\components\Pressible.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE,
 */
import { NativeBaseProvider, Box, Pressable, VStack, Badge, Spacer, Text, Flex, Center, View } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

// function goHome({navigation}: any) {
//     // navigation.navigate('Home');
//     console.log("goHome");


function Pressible({task_id, task_date, task_description, type, navigation, destination="Survey"}: any) {
    return <Box alignItems="center">
        <Pressable onPress={() => {
        // if (type == "Meeting") {
        //   navigation.navigate(destination, { type:"pre_vcs", task_id:task_id})
        // }
        // else if (type == "Practice") {
        //   navigation.navigate(destination, { type:"pre", task_id:task_id})
        // }
     }
    } rounded="8" overflow="hidden" borderWidth="1" borderColor="coolGray.300" width={"100%"} minWidth="80%" shadow="3" bg="coolGray.100" p="5">
          <Box >
            <VStack >
                <Text color="coolGray.800">
                    {task_id}
                </Text>
                <Text color="coolGray.800">
                    Date: {task_date}
                </Text>
                <Text color="coolGray.800">
                    Information: {task_description}
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