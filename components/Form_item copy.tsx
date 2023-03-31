/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-24 13:34:26
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-03-29 21:39:08
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
import { NativeBaseProvider, useDisclose, Box, Actionsheet, SectionList, Center, Text, HStack, Button } from 'native-base';
import React, { useState } from 'react';
import Pressible from './Pressible';
import _, { List } from 'lodash';
// import listdata from '../assets/data/list.json';
// import RNFS from 'react-native-fs';
import * as FileSystem from 'expo-file-system';

export function Form_item({ navigation, status}: { navigation: any, status: string}) {
    
  interface MyData {
    title: string;
    data: {
      title: string;
      type: string;
      description: string;
      status: string;
      date: string;
    }[];
    updateUserData: (newData: MyData) => void;
  }


  const [myData, setMyData] = useState<MyData>({ title: '', data: [], updateUserData: () => {} });
  const [timer, setTimer] = useState(0);

  // const jsonString = JSON.stringify(listdata);
  // let data = JSON.parse(jsonString);
  // data.data = _.sortBy(data.data, 'date');
  // data.data = data.data.filter((item: { status: string; }) => item.status === {status}.status);
  if (status == "1") {
    // data.data = data.data.filter((item: { status: string; }) => item.status =="completed");
    if (timer != 1){
      myFunction();
    }
    myData.data = _.sortBy(myData.data, 'date');
    myData.data = myData.data.filter((item: { status: string; }) => item.status =="completed");
  }
  else {
    if (timer != 1){
      myFunction();
    }
    myData.data = _.sortBy(myData.data, 'date');
    myData.data = myData.data.filter((item: { status: string; }) => item.status =="uncompleted");
  }

  function readJsonFile(): Promise<any> {
    const fileUri = FileSystem.documentDirectory + 'test.json';
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
        // console.log("////////////////////////////////////////////////");
        // console.log("data is", jsonData);
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


    // return <SectionList  w="100%"  sections={[data]} keyExtractor={(item, index) => `${item.title}${item.date}${index}`}
    return <SectionList  w="100%"  sections={[myData]} nestedScrollEnabled={true} keyExtractor={(item, index) => `${item.title}${item.date}${index}`}
      renderItem={({ item, section
        }: any) =>
              <HStack width={"100%"}>
              <Pressible task_id={item.title} task_date={item.date} task_description={item.description} type={item.type} navigation={navigation} />
              </HStack>
      }
        />;
        

  }

// export default Form_item();