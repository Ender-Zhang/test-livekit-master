/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-04-08 15:25:25
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-04-11 10:36:19
 * @FilePath: \interaction-app\components\Timer.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from 'react';
// import { View, Text, Button } from 'react-native';
import { View, Text, Button, Box, VStack, HStack, Spacer} from 'native-base';

class Stopwatch extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      time: 0,
      running: false,
      intervalId: null,
    };
  }

  startTimer = () => {
    if (!this.state.running) {
      const intervalId = setInterval(() => {
        this.setState({ time: this.state.time + 1 });
      }, 1000);
      this.setState({ running: true, intervalId });
    }
  };

  stopTimer = () => {
    if (this.state.running) {
      clearInterval(this.state.intervalId);
      this.setState({ running: false, intervalId: null });
    }
  };

  resetTimer = () => {
    this.setState({ time: 0, running: false, intervalId: null });
  };

  formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = (timeInSeconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  render() {
    const { time } = this.state;
    const formattedTime = this.formatTime(time);
    return (
      <Box>
        {/* <Text style={{ fontSize: 50 }}>{formattedTime}</Text> */}
        <HStack space={2} alignItems="center">
        <Spacer />
        <Text fontSize="4xl" bold >{formattedTime}</Text>
        <Spacer />
        <Button  onPress={this.startTimer} >Start</Button>
        <Spacer />
        <Button onPress={this.stopTimer}>Stop</Button>
        <Spacer />
        {/* <Button onPress={this.resetTimer}>Reset</Button>
        <Spacer /> */}
        </HStack>
      </Box>
    );
  }
}

export default Stopwatch;
