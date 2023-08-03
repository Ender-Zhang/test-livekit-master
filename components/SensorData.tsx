/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-04-08 15:49:35
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-04-08 15:58:29
 * @FilePath: \interaction-app\components\SensorData.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button, Text, View } from 'react-native';
import React, { Component, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VStack, Slider, NativeBaseProvider, Box, Stack, HStack, Input, Radio, ScrollView } from 'native-base';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from './DatePicker';
import sensorData from '../assets/data/protocol2.json';
import RGroup from './RGroup';

function SensorData() {
  
  function handleFormChange(questionKey: string, text: any, setTextValue:any): void {
    // update the answer of the corresponding question in the surveyData object
    // surveyData[questionKey].Answer = text;
    console.log(questionKey, text);
    setTextValue(text);
  }

  // const { type} = route.params;
  const [value, setValue] = React.useState("one");
  return (
    <NativeBaseProvider>
    <ScrollView >
      <VStack space={4} alignItems="center">
      {Object.entries(sensorData.Exercise['2Sets15Reps2xDaily']).map(([questionKey, question]) => {
        console.log(questionKey, question);
        const { Type, Options } = question;

        let inputComponent = null;

        switch (Type) {
        //   case 'Radio':
        //     const [option, setOption] = React.useState("false");
        //     inputComponent = (
        //       <View>
        //           <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={option} onChange={(value) => {
        //             handleFormChange(questionKey, value, setOption);
        //           }}>
        //               <Radio value="true" my={1}>
        //                 True
        //               </Radio>
        //               <Radio value="false" my={1}>
        //                 Flase
        //               </Radio>
        //             </Radio.Group>
        //       </View>
        //     );
        //     break;

            case 'Radio':
                inputComponent = (
                    <View>
                        <RGroup content = {question}/>
                    </View>
                );
                break;

          default:
            inputComponent = null;
            break;
        }

        return (
          <Box key={questionKey}>
            <VStack space={4} alignItems="center">
            <Text>{question.Type}</Text>
            {inputComponent}
            </VStack>
          </Box>
        );
      })}
      </VStack>
    </ScrollView>
    </NativeBaseProvider>
  );
};

export default SensorData;


