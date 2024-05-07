import React from 'react';
import {Button} from "antd";
import {green} from "@ant-design/colors";

function Home(props) {
    return (
        <div>
            <Button type={"primary"} color={green}>按钮</Button>
        </div>
    );
}

export default Home;
