import { createBrowserRouter } from "react-router";
import { RootLayout } from "../components/layouts/RootLayout";
import { Home } from "../pages/home/Home";
import { Error } from "../pages/404/Error";
import { Product } from "../pages/product/Product";
import { Checkout } from "../pages/checkout/Checkout";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "checkout",
                Component: Checkout,
            },
            {
                path: "product/:id",
                Component: Product,
            },
            {
                path: "*",
                Component: Error,
            },
        ],
    },
]);
