import React, {useState} from 'react';
import {Menu,MenuProps} from "antd";
import {
    AppstoreOutlined,
    MailOutlined, SettingOutlined,
} from '@ant-design/icons';
import "./index.css"
import Sider from "antd/es/layout/Sider";
import {useNavigate} from "react-router";

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items: MenuProps['items'] = [
    getItem('首页', '/home', <MailOutlined />),

    { type: 'divider' },

    getItem('用户管理', 'sub1', <MailOutlined />, [
        getItem('账号管理', '/user/list', <MailOutlined />),
        getItem('角色管理', '/role/list', <MailOutlined />),
    ]),

    { type: 'divider' },

    getItem('地下城', 'sub2', <AppstoreOutlined />, [
        getItem('幽暗岛', '5', <AppstoreOutlined />, [
            getItem('Option 1', '1', <AppstoreOutlined />),
            getItem('Option 2', '2', <AppstoreOutlined />),
            getItem('Option 3', '3', <AppstoreOutlined />),
            getItem('Option 4', '4', <AppstoreOutlined />),
        ]),
        getItem('Option 6', '6', <AppstoreOutlined />),
        getItem('Submenu', 'sub3', <AppstoreOutlined />, [
            getItem('Option 7', '7', <AppstoreOutlined />),
            getItem('Option 8', '8', <AppstoreOutlined />)
        ]),
    ]),

    { type: 'divider' },

    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9', <SettingOutlined />),
        getItem('Option 10', '10', <SettingOutlined />),
        getItem('Option 11', '11', <SettingOutlined />),
        getItem('Option 12', '12', <SettingOutlined />),
    ]),

    { type: 'divider' },

    getItem('职业树', '/career', <SettingOutlined />),
];

function SideMenu(props) {
    // const [collapsed] = useState(false);
    const navigate = useNavigate()
    return (
        <Sider trigger={null} collapsible collapsed={props.collapsed}>
            <div className="logo">dnf</div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/user']}
                items={items}
                onClick={ props => navigate(props.key)}
            />
        </Sider>
    );
}

// eslint-disable-next-line react-hooks/rules-of-hooks
export default SideMenu;
