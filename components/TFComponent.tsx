//@ts-nocheck
/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-25 14:36:43
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-03-26 22:27:56
 * @FilePath: \mobile-end\interaction\components\TFComponent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {View, Text, VStack, Box} from 'native-base';
import React from 'react';
// import ColorBox from './ColorBox';

const TFComponent = ({ title, generalProtocolRepair } : any) => {

  const myRef = React.useRef({});

  React.useEffect(() => {
    const styleObj = {
      borderWidth: 4,
      borderRadius: 4,
      borderColor: "#22D3EE"
    };
    myRef.current.setNativeProps({
      style: styleObj
    });
  }, [myRef]);



    return (
          // two type of display: 1. display all the data 2. display the data that is true
      <View>
        <Box width="100%" bg="primary.500" p="4" shadow={2} _text={{
      fontSize: "md",
      fontWeight: "bold",
      color: "white"
    }} ref={myRef}>
        <VStack space={4} alignItems="center">
        <Text >{title}</Text>
        {Object.entries(generalProtocolRepair).map(([key, value]) => (
          // <View  key={key}>
          //   {/* <Text >{key} : {value ? 'Yes' : 'No'}</Text> */}
          //   <Text>{value ? key:""}</Text>
          // </View>
          value ? <View key={key}><Text>{key}</Text></View> : null
        ))}

        </VStack>
        </Box>
      </View>
    );
  };

export default TFComponent;