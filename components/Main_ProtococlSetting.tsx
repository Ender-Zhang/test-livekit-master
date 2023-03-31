/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-29 18:34:41
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-03-29 23:48:01
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
import Data from '../assets/data/protocol_setting.json';


function Portocol_Setting() {
  
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
            const [text, setTextValue] = React.useState("");
            inputComponent = (
              <Input
                onChangeText={(text) => handleFormChange(questionKey, text, setTextValue)}
                // value={Answer ? JSON.stringify(Answer) : ''}
                value={text}
              />
            );
            break;

          case 'Radio':
            const [option, setOption] = React.useState('');
            console.log(question);
            // const [selected, setSelected] = useState('');
            // const [selectedOption, setSelectedOption] = React.useState('');
            // const handleOptionSelect = (value:any) => {
            //     setSelectedOption(value);
            //   };
            inputComponent = (
                <View>
                    <RGroup content = {question.Content}/>
                    {/* <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={option} onChange={(value) => {
                    handleFormChange(questionKey, value, setOption);
                  }}> */}
                    {/* {Object.entries(question.Content).map(([key, value]) => (
                        <View key={key}>
                            <Text>{key}</Text>
                            <Radio.Group
                                name={key}
                                value={option}
                                onChange={(value) => {
                                    handleFormChange(questionKey, value, setOption);}} >
                                {value.map((option:any, index:any) => (
                                <Radio value={option} key={index}>{option}</Radio>
                                ))}
                            </Radio.Group>
                        </View>
                    ))} */}
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


