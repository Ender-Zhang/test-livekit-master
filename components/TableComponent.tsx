//@ts-nocheck
import { View, Text, Box } from "native-base";
import React from "react";

const TableComponent = ({ title, generalProtocolRepair } : any) => {
    
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
      <View>
        <Box width="100%" bg="primary.500" p="4" shadow={2} _text={{
      fontSize: "md",
      fontWeight: "bold",
      color: "white"
    }} ref={myRef}>
        <Text >{title}</Text>
        {Object.entries(generalProtocolRepair).map(([key, value]) => (
          <View  key={key}>
            {/* <Text>{value ? `${key}: ${value}` : ""}</Text> */}
            {/* This will cauase Error in Vsocode but won't affect the code. */}
            {value ? <Text>{key}: {value}</Text> : ""}
          </View>
        ))}

        </Box>
      </View>
    );
  };

export default TableComponent;