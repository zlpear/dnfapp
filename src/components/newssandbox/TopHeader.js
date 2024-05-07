import React, {useState} from 'react';
import type {MenuProps} from 'antd';
import {Avatar, Button, Dropdown, Layout, Space, theme} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from "@ant-design/icons";

const { Header } = Layout;

const items: MenuProps['items'] = [
    {
        key: '1',
        label: '超级管理员',
    },
    {
        key: '2',
        danger: true,
        label: '退出',
    },
];

function TopHeader(props) {
    const {
        token: { colorBgContainer},
    } = theme.useToken();
    return (
        <Header style={{padding: 0, background: colorBgContainer}}>
            <Button
                type="text"
                icon={props.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                onClick={() => props.setCollapsed(!props.collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />

            <div style={{float: "right"}}>
                <span>欢迎admin回来</span>
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <Avatar size={48} icon={<UserOutlined /> }/>
                        </Space>
                    </a>
                </Dropdown>
                <span>////</span>
            </div>

        </Header>
    )
}

export default TopHeader;
