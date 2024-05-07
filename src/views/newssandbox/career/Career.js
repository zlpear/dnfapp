import {Image, Table} from "antd";
import React, {useEffect, useState} from "react";
import axios from "axios";

function Career(props) {

    const columns = [
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     key: 'id',
        //     hidden: true,
        //     width: 50,
        // },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
            width: 300,
        }
    ];
    const [data, setData] = useState([])

    useEffect(() => {
        getData().then(res => {
            setData(res)
        })
    }, [])

    function refreshData() {
        getData().then(res => {
            setData(res)
        })
    }

    function getData() {
        return axios.get('/dnfapi/career/', {
        }).then(res => {
            return res.data.data
        }).catch(err => {
            console.log(err)
            return []
        })
    }

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
}

export default Career;
