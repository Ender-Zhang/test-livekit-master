/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-04-16 13:16:17
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-06-17 15:46:45
 * @FilePath: \interaction-app\function\readFile.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as FileSystem from 'expo-file-system';
import { useState } from 'react';

export default function readUserInfo(filename: string){
    // get uncompleted from json
    // interface MyData {
    //     title: string;
    //     data: {
    //       set: string;
    //       title: string;
    //       type: string;
    //       description: string;
    //       status: string;
    //       date: string;
    //     }[];
    //     updateUserData: (newData: MyData) => void;
    //   }
    
      function readJsonFile() {
        const fileUri = FileSystem.documentDirectory + filename;
        return FileSystem.getInfoAsync(fileUri)
          .then((fileInfo: { exists: any; }) => {
            if (fileInfo.exists) {
                // console.log("String File",FileSystem.readAsStringAsync(fileUri));
              return FileSystem.readAsStringAsync(fileUri);
            } else {
              console.log('File does not exist');
            }
          })
          .then(fileContent => {
            const jsonData = JSON.parse(fileContent!);
            // setMyData(jsonData);
            console.log("readUserInfo success");
            // console.log("jsonData: ",jsonData)
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
          setMyData(jsonData);
        });
      }
    
      const [myData1, setMyData] = useState<any>();
      const [timer, setTimer] = useState(0);
      
      if (timer != 1){
        myFunction();
    }

    return myData1;
    // return readJsonFile();
    }