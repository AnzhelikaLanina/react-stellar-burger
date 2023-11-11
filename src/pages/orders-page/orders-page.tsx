import React, { FC }  from "react";
import ProfileNav from "../../components/profile-nav/profile-nav";
import { Outlet } from "react-router";

const OrdersPage: FC = () => {

    return (
        <div >
            <main >
                <ProfileNav />
                <Outlet />
            </main>
        </div>
    );
}

export default OrdersPage;