/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-24 13:34:26
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-05-01 09:37:32
 * @FilePath: \mobile-end\interaction\components\form_item.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-24 13:34:26
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-03-27 23:28:57
 * @FilePath: \mobile-end\interaction\components\form_item.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NativeBaseProvider, useDisclose, Box, Actionsheet, SectionList, Center, Text, HStack, Button, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import Pressible from './Pressible_VM';
// import Pressible from './Pressible';
import _, { List } from 'lodash';
// import myData1 from '../assets/data/Practice.json';
import * as FileSystem from 'expo-file-system';

export function PracticeForm({ navigation, uncompleted, practiceSet }:  any ) {

  interface MyData {
    title: string;
    data: {
      title: string;
      type: string;
      description: string;
      status: string;
      date: string;
      name: string;
    }[];
    updateUserData: (newData: MyData) => void;
  }

  function readJsonFile(): Promise<any> {
    const fileUri = FileSystem.documentDirectory + 'practice.json';
    return FileSystem.getInfoAsync(fileUri)
      .then((fileInfo: { exists: any; }) => {
        if (fileInfo.exists) {
          return FileSystem.readAsStringAsync(fileUri);
        } else {
          console.log('File does not exist');
        }
      })
      .then(fileContent => {
        const jsonData = JSON.parse(fileContent!);
        setMyData(jsonData);
        return jsonData;
      })
      .catch(error => {
        console.error(error);
      });
  }

  function myFunction() {
    readJsonFile().then(jsonData => {
      // data = jsonData; // 在异步函数加载完后进行操作
      setTimer(1);
    });
  }

  const [myData1, setMyData] = useState<MyData>({ title: '', data: [], updateUserData: () => { } });
  const [timer, setTimer] = useState(0);
  // selet the proper set of practice
  myData1.data = myData1.data.filter(item => item.set == practiceSet);

//   const [myData, setMyData] = useState<MyData>({ title: '', data: [], updateUserData: () => { } });
//   const [timer, setTimer] = useState(0);
    
    if (timer != 1){
        myFunction();
    }
    myData1.data = _.sortBy(myData1.data, 'date');
    const uncompletedCount = myData1.data.filter((item: { status: string; }) => item.status == 'uncompleted').length;

    
    // myData.data = myData.data.filter((item: { type: string; }) => item.type == "uncompleted");
    // myData1.data = myData.data.filter((item: { type: string; status: string; }) => item.type == "Meeting" && item.status == "uncompleted");


  return <View>
    {/* <Text>Practice list</Text> */}
    {myData1.data.map((item, index) => (
      <View key={index}>
        <Pressible practiceSet={practiceSet} task_id={item.title} task_date={item.date} task_description={item.description} task_status={item.status} type={item.type} navigation={navigation} destination="VM_ConfigScreen" uncompleted={uncompleted} task_name={item.name}/>
      </View>
    ))}
  </View>


}

