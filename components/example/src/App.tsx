/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-01-26 22:43:13
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-03-25 23:39:58
 * @FilePath: \livekit-react\example\src\App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import '@livekit/react-components/dist/index.css';
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { PreJoinPage } from './PreJoinPage';
import { RoomPage } from './RoomPage';

const AppComponent = () => {
  return (
    <div className="container">
      <React.StrictMode>
        <Router>
          <Routes>
            <Route path="/room" element={<RoomPage />} />
            <Route path="/" element={<PreJoinPage />} />
          </Routes>
        </Router>
      </React.StrictMode>
    </div>
  );
};

export default AppComponent;
