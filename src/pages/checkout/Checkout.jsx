import { Outlet } from "react-router";

export const Checkout = () => {
    return (
        <>
            <main>
                <section>
                    <Outlet />
                </section>
            </main>
        </>
    );
};
