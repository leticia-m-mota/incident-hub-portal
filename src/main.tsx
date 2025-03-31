
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// For Ant Design v5, we should import the CSS this way
import 'antd/dist/reset.css' 

createRoot(document.getElementById("root")!).render(<App />);
