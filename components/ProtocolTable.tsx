/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-06-24 09:12:03
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-07-04 21:14:53
 * @FilePath: \test-livekit-master\components\ProtocolTable.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, ScrollView, NativeBaseProvider, Box, View, Button, VStack, Spacer } from 'native-base';
import TFComponent from './TFComponent';
import TableComponent from './TableComponent';
import surveyData from '../assets/data/protocol.json';
import data1 from '../assets/data/mockdata_protocol.json';
import readUserInfo from '../function/readUserInfo';


function ProtocolTable() {

    let tableData: { [key: string]: string[] } = {};
    let tableHead = ["Phase", "IR PROM", "ER PROM", "IR AaA", "ER AaA", "Protraction", "Retraction", "Isometric IR ER", "Isometric Pro ER", "Forward Elevation PROM", "Forward Elevation AaA", "Abduction PROM", "Abduction AaA"];
    const userProtocol = readUserInfo('userProtocol.json');

    console.log("This is userProtocol:", userProtocol);

    const newData = {};
    if (userProtocol) {
    Object.entries(userProtocol).forEach(([key, value]) => {
        const match = key.match(/sPWeeks(\d+_\d+)(.+)/);
        if (match) {
            const phase = `SPWeeks${match[1].replace('_', '-')}`;
            const metric = match[2];
            if (!newData[metric]) newData[metric] = {};
            newData[metric][phase] = value;
        }
    });

    console.log("newData: ",newData);

    // Convert object to array
    const tableRows = Object.values(tableData);

    // console.log("This is tableRows:", tableRows);
    // console.log("This is tableHead:", tableHead);


    
    return (

        <NativeBaseProvider>
            <Text alignSelf="center" fontSize="2xl" bold>Exercise protocol</Text>
            {/* <ScrollView> */}
                <VStack space={4} alignItems="center">
                    <Text fontSize="xl">General Protocol Repair: {userProtocol.repair}</Text>
                    <Text fontSize="xl">StartShoulderSSSPostOpDay: {userProtocol.startShoulderSssPostOpDay}</Text>
                    <Text fontSize="xl">LengthOfNeedInWeeks: {userProtocol.lengthOfNeedInWeeks}</Text>
                    {/* <TFComponent title="General Protocol Repair: " generalProtocolRepair={data1.repair} /> */}
                    {/* <TFComponent title="StartShoulderSSSPostOpDay: " generalProtocolRepair={surveyData.StartShoulderSSSPostOpDay} /> */}
                    {/* <TFComponent title="LengthOfNeedInWeeks: " generalProtocolRepair={surveyData.LengthOfNeedInWeeks} /> */}
                    <TableComponent title="IRPROM: " generalProtocolRepair={newData.IrProm} />

                    {Object.entries(newData).map(([key, value]) => (
                        <View key={key} >
                            <TableComponent title={key} generalProtocolRepair={value} />
                        </View>
                    ))}



                </VStack>
            {/* </ScrollView> */}
        </NativeBaseProvider>
    );
}
else {
    return (
        <Text>Loading...</Text>
    )
}
}


export default ProtocolTable;