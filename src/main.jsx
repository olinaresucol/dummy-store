import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes/router.js";
import {
    onCaughtErrorProd,
    onRecoverableErrorProd,
    onUncaughtErrorProd,
} from "./lib/reportCaughtError.js";
import "./index.css";
import { SearchContextProvider } from "./components/context/SearchContextProvider.jsx";

const container = document.getElementById("root");
const root = createRoot(container, {
    onCaughtError: onCaughtErrorProd,
    onRecoverableError: onRecoverableErrorProd,
    onUncaughtError: onUncaughtErrorProd,
});

root.render(
    <StrictMode>
        <SearchContextProvider>
            <RouterProvider router={router} />
        </SearchContextProvider>
    </StrictMode>,
);
