/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-06-27 15:10:17
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-06-27 15:10:25
 * @FilePath: \test-livekit-master\function\readProtocol.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as FileSystem from 'expo-file-system';
import { useState, useEffect } from 'react';

export default function useUserInfo(filename: string){
    const [myData1, setMyData] = useState<any>();
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        async function readJsonFile() {
            const fileUri = FileSystem.documentDirectory + filename;
            const fileInfo = await FileSystem.getInfoAsync(fileUri);
            if (fileInfo.exists) {
                const fileContent = await FileSystem.readAsStringAsync(fileUri);
                console.log("fileContent: ",fileContent);
                const jsonData = JSON.parse(fileContent);
                return jsonData;
            } else {
                console.log('File does not exist');
                return null;
            }
        }

        async function myFunction() {
            const jsonData = await readJsonFile();
            setTimer(1);
            setMyData(jsonData);
        }
      
        if (timer !== 1){
            myFunction();
        }
    }, [timer]);

    return myData1;
}
