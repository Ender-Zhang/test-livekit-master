/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-03-25 23:24:14
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-03-25 23:34:21
 * @FilePath: \mobile-end\interaction\components\videoComponent.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { RTCView } from 'react-native-webrtc';

import AppComponent from './example/src/App';

export default function App() {
    return (
        <AppComponent />
    );
}