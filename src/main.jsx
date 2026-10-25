import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/home/Home.jsx'
import {
    onCaughtErrorProd,
    onRecoverableErrorProd,
    onUncaughtErrorProd,
} from "./lib/reportCaughtError.js"
import './index.css'
import { SearchContextProvider } from './components/context/SearchContextProvider.jsx'

const container = document.getElementById("root")
const root = createRoot(container, {
    onCaughtError: onCaughtErrorProd,
    onRecoverableError: onRecoverableErrorProd,
    onUncaughtError: onUncaughtErrorProd,
})
root.render(
    <StrictMode>
        <SearchContextProvider>
            <Home />
        </SearchContextProvider>
    </StrictMode>,
)