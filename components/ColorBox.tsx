//@ts-nocheck
import {View, Text, VStack, Box} from 'native-base';
import React from 'react';


const ColorBox = ({content}:any) => {
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
    return <Box width="100%" bg="primary.500" p="4" shadow={2} _text={{
      fontSize: "md",
      fontWeight: "bold",
      color: "white"
    }} ref={myRef}>
      {content}
      </Box>;
  };

export default ColorBox;