/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-01-26 22:43:13
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-03-21 20:32:25
 * @FilePath: \livekit-react\example\src\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRoot } from 'react-dom/client';
import AppComponent from './App';
import './index.css';

const root = createRoot(document.getElementById('root') as Element);
root.render(<AppComponent />);
