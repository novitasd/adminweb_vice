import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Main from "../components/layout/Main";

import "./DashboardLayout.css";

function DashboardLayout() {

    return (
        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-content">

                <Main>
                    <Outlet />
                </Main>

            </div>

        </div>
    );
}

export default DashboardLayout;