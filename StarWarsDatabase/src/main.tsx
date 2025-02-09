import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
