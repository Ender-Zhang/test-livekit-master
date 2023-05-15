/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-29 18:34:41
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-04-07 14:56:53
 * @FilePath: \interaction-app\interaction-app\components\Main_ProtococlSetting.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button, Text, View } from 'react-native';
import React, { Component, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VStack, Slider, NativeBaseProvider, Box, Stack, HStack, Input, Radio, ScrollView } from 'native-base';
// import DateTimePicker from '@react-native-community/datetimepicker';

import RGroup from './RGroup';



function Portocol_Setting(data:any) {
  var Data = data.data;

  function handleFormChange(questionKey: string, text: any, setTextValue:any): void {
    // update the answer of the corresponding question in the surveyData object
    // surveyData[questionKey].Answer = text;
    console.log(questionKey, text);
    setTextValue(text);
  }

  return (
    <NativeBaseProvider>
    <ScrollView >
      <VStack space={4} alignItems="center">
      {Object.entries(Data[0]['Internal / External Rotation']).map(([questionKey, question]) => {
        const { Content, Type } = question;

        let inputComponent = null;

        switch (Type) {
          case 'Text':
            inputComponent = (
              <View>
                  {question.Content.map((item: string, index: React.Key | null | undefined) => (
                    <Text key={index}>{item}</Text>
                  ))}
              </View>
            );
            break;

          case 'Radio':
            // const [option, setOption] = React.useState('');
            // console.log(question);
            // const [selected, setSelected] = useState('');
            // const [selectedOption, setSelectedOption] = React.useState('');
            // const handleOptionSelect = (value:any) => {
            //     setSelectedOption(value);
            //   };
            inputComponent = (
                <View>
                    <RGroup content = {question.Content}/>
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
            <Text>{questionKey}</Text>
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

export default Portocol_Setting;


