import { Button, Text, View } from 'react-native';
import React, { Component, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VStack, Slider, NativeBaseProvider, Box, Stack, HStack, Input, Radio, ScrollView } from 'native-base';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import DatePicker from './DatePicker';
import surveyData from '../assets/data/survey.json';

function SurveyList() {
  
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
      {Object.entries(surveyData).map(([questionKey, question]) => {
        const { Question, Type, Answer } = question;

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

          case 'Date':
            // This code will cause time difference between the date selected and the date displayed
            // const [date, setDateValue] = React.useState(new Date());
            
            const [date, setDate] = useState(new Date());

            const onDateChange = (selectedDate: React.SetStateAction<Date>) => {
              setDate(selectedDate);
            };
            inputComponent = (
              // <Input
              //   onChangeText={(date) => handleFormChange(questionKey, date, setDateValue)}
              //   placeholder="MM/DD/YYYY"
              // />
            //   <DateTimePicker
            //     testID="dateTimePicker"
            //     value={date}
            //     mode='datetime'
            //     is24Hour={true}
            //     display="default"
            //     // onChange={(event, selectedDate) => handleFormChange(questionKey, selectedDate, setDateValue)}
            //     onChange={(event, selectedDate) => console.log("1111111111")}
            //   />
            <Box>
            <Text>{date.toLocaleString()}</Text>
            <DatePicker date={date} onChange={onDateChange} />
            </Box>
            );
            break;

          case 'Radio':
            const [option, setOption] = React.useState("false");
            inputComponent = (
              <View>
                  <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={option} onChange={(value) => {
                    handleFormChange(questionKey, value, setOption);
                  }}>
                      <Radio value="true" my={1}>
                        True
                      </Radio>
                      <Radio value="false" my={1}>
                        Flase
                      </Radio>
                    </Radio.Group>
              </View>
            );
            break;

            case 'Number':
              const [score, setScore] = React.useState(70);
              const [onChangeValue, setOnChangeValue] = React.useState(0);
              const [onChangeEndValue, setOnChangeEndValue] = React.useState(0);
              inputComponent = (
                <Box alignItems="center" w="100%">
                      <Stack space={4} alignItems="center" w="100%" maxW="600">
                        {/* <Text textAlign="center">onChangeValue - {onChangeValue}</Text> */}
                        <Text>{onChangeEndValue / 20}</Text>
                        <Slider defaultValue={0} colorScheme="cyan" minValue={0} maxValue={100} step={20} onChange={v => {
                        setOnChangeValue(Math.floor(v));
                      }} onChangeEnd={v => {
                        v && setOnChangeEndValue(Math.floor(v));
                      }}>
                          <Slider.Track>
                            <Slider.FilledTrack />
                          </Slider.Track>
                          <Slider.Thumb />
                        </Slider>
                      </Stack>
                    </Box>
              );
              break;

          default:
            inputComponent = null;
            break;
        }

        return (
          <Box key={questionKey}>
            <VStack space={4} alignItems="center">
            <Text>{Question}</Text>
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

export default SurveyList;


