import React, {useState} from 'react';
import SideMenu from "../../components/newssandbox/SideMenu";
import TopHeader from "../../components/newssandbox/TopHeader";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./home/Home";
import UserList from "./user/UserList";
import RoleList from "./role/RoleList";
import NoPermission from "./nopermission/NoPermission";
import {Layout, theme} from "antd";
import {Content} from "antd/es/layout/layout";

import "./NewsSandBox.css"
import Career from "./career/Career";
import DungeonOverview from "./dungeon/DungeonOverview";
import DungeonManager from "./dungeon/DungeonManager";


function NewsSandBox() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);
    // const onChange = (obj: Partial<Selected>) => {
    //     setCollapsed({...collapsed, ...obj});
    // };

    return (
        <Layout>
            <SideMenu collapsed={collapsed} setCollapsed={setCollapsed}
                      // onChange={(category) => onChange({category})}
            ></SideMenu>
            <Layout>
                <TopHeader collapsed={collapsed} setCollapsed={setCollapsed}
                           // onChange={(category) => onChange({category})}
                ></TopHeader>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Routes>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/user/list" element={<UserList/>}/>
                        <Route path="/role/list" element={<RoleList/>}/>
                        <Route path="/career" element={<Career/>}/>
                        <Route path="/dungeon/overview" element={<DungeonOverview/>}/>
                        <Route path="/dungeon/manager" element={<DungeonManager/>}/>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/*" element={<NoPermission />} />
                    </Routes>
                </Content>

            </Layout>
        </Layout>
    );
}

export default NewsSandBox;
