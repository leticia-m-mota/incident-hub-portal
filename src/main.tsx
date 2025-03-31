
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'antd/dist/reset.css' // Import Ant Design global styles

createRoot(document.getElementById("root")!).render(<App />);
