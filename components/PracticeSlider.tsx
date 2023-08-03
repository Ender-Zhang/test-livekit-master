import { Box, Slider, Stack, Text, HStack } from "native-base";
import React from "react";


const PracticeSlider = ({min, max, step, name} : any) => {
    const [onChangeValue, setOnChangeValue] = React.useState(0);
    const [onChangeEndValue, setOnChangeEndValue] = React.useState(0);
    return <Box w="100%">
        <HStack space={4} w="100%" maxW="300">
          <Text textAlign="center">{name} : {onChangeValue}</Text>
          {/* <Text textAlign="center">onChangeEndValue - {onChangeEndValue}</Text> */}
          <Slider defaultValue={0} colorScheme="cyan" minValue={min} maxValue={max} step={step} onChange={v => {
          setOnChangeValue(Math.floor(v));
        }} onChangeEnd={v => {
          v && setOnChangeEndValue(Math.floor(v));
        }}>
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </HStack>
      </Box>;
  };

export default PracticeSlider;