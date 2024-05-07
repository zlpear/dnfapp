import React, { useEffect, useState } from 'react';
import {Button, Cascader, Form, Image, Input, message, Modal, Select, Space, Table, Upload} from 'antd';
import qs from 'qs';
import axios from "axios";
import {LoadingOutlined, PlusOutlined, ReloadOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
const App = () => {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            hidden: true,
            width: 80,
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text) => <Image
                width={30}
                height={30}
                src={"data:image/png;base64," + text}
                fallback="data:image/png;base64,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"
            />,

            ellipsis: true,
            textWrap: 'word-break',
            width: 100,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
            width: 300,
        },
        {
            title: 'Career',
            dataIndex: 'career',
            key: 'career',
            width: 300,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <a>{text}</a>,
            width: 200,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <DeleteRole id={record.id}/>
                    <UpdateRole id={record.id}/>
                    <UploadRoleAvatar id={record.id}/>
                </Space>
            ),
            width: 300,
        },
    ];
    const emptyPage = {
        current: 1,
        pageSize: 10,
        total: 0,
        records: []
    }
    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        current: params.pagination?.current,
        ...params,
    });


    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    useEffect(() => {
        fetchDataPage();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

    function fetchDataPage() {
        setLoading(true);
        return axios.get(`/dnfapi/roles/page?${qs.stringify(getRandomuserParams(tableParams))}`, {
        }).then(res => {
            console.log(res.data)
            setData(res.data.data.records);
            setLoading(false);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res.data.data.total,
                    // 200 is mock data, you should read it from server
                    // total: data.totalCount,
                },
            });
        }).catch(err => {
            console.log(err)
            setData(emptyPage)
        })
    }

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };

    const AddRole = () => {
        const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);

        function showAddRoleModal() {
            getCareer().then(res => {
                setCareerOptions(res)
            })
            getUserList().then(res => {
                setUserOptions(res)
            })
            setIsAddRoleModalOpen(true);
        }

        function closeAddRoleModal() {
            setIsAddRoleModalOpen(false);
        }

        const onFinish = (fieldsValue) => {
            const name = fieldsValue['name'];
            const career = fieldsValue['career'];
            const careerId = career[career.length - 1]
            const userId = fieldsValue['userId'];
            const renown = fieldsValue['renown'];
            addRole(name, careerId, userId, renown)
            closeAddRoleModal()
        };

        const handleChange = (value) => {
            console.log(`selected ${value}`);
        }

        const [userOptions, setUserOptions] = useState([])
        const [careerOptions, setCareerOptions] = useState([])


        return (
            <>
                <Button type="primary" onClick={showAddRoleModal}>
                    添加角色
                </Button>
                <Modal title={"添加角色"} open={isAddRoleModalOpen} onCancel={closeAddRoleModal}
                       footer={null}
                >
                    <Form
                        name="add_role"
                        {...formItemLayout}
                        onFinish={onFinish}
                        style={{maxWidth: 600}}
                        autoComplete={'off'}
                    >
                        <Form.Item name="name" label="名称"
                                   rules={[{required: true, message: 'Please input role name!'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="career" label="职业"
                                   rules={[{required: true, message: 'Please select career!'}]}>
                            <Cascader options={careerOptions} placeholder="Please select" />
                        </Form.Item>
                        <Form.Item name="userId" label="用户"
                                   rules={[{required: true, message: 'Please select user!'}]}>
                            <Select
                                style={{
                                    width: 200,
                                }}
                                onChange={handleChange}
                                options={userOptions}
                                placeholder={"请选择用户"}
                            />
                        </Form.Item>
                        <Form.Item name="renown" label="名望"
                                   rules={[{min: 0, max: 100000, message: 'renown is range from 0 to 100000'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item wrapperCol={{
                            xs: {
                                span: 24,
                                offset: 0,
                            },
                            sm: {
                                span: 16,
                                offset: 8,
                            },
                        }}
                        >
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                            <Button type="primary" htmlType="reset" style={{margin: 10}}>
                                重置
                            </Button>
                            <Button type="primary" htmlType="button" onClick={closeAddRoleModal}>
                                取消
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <Button type="primary" onClick={refreshData} style={{margin: 20}} icon={<ReloadOutlined/>} />

                <Search placeholder="input search loading with enterButton" enterButton />

            </>
        );

    };

    const UploadRoleAvatar = (prop) => {
        const normFile = (e: any) => {
            if (Array.isArray(e)) {
                return e;
            }
            return e?.fileList;
        };

        const getBase64 = (img, callback) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result));
            reader.readAsDataURL(img);
        };

        const beforeUpload = (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Image must smaller than 2MB!');
            }
            return isJpgOrPng && isLt2M;
        };

        const [loading, setLoading] = useState(false);
        const [imageUrl, setImageUrl] = useState();
        const handleChange = (info) => {
            if (info.file.status === 'uploading') {
                setLoading(true);
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, (url) => {
                    setLoading(false);
                    setImageUrl(url);
                });
            }
        };

        const uploadButton = (
            <button
                style={{
                    border: 0,
                    background: 'none',
                }}
                type="button"
            >
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div
                    style={{
                        marginTop: 8,
                    }}
                >
                    Upload
                </div>
            </button>
        );

        const [isUpdateRoleAvatarModalOpen, setIsUpdateRoleAvatarModalOpen] = useState(false);

        function showUpdateRoleAvatarModal() {
            setIsUpdateRoleAvatarModalOpen(true);
        }

        function closeUpdateRoleAvatarModal() {
            setIsUpdateRoleAvatarModalOpen(false);
        }


        const onFinish = (fieldsValue) => {
            const id = prop.id
            const file = fieldsValue.file;
            console.log(file[0].originFileObj)
            let formData = new FormData();
            formData.append('file', file[0].originFileObj);
            uploadRoleAvatar(formData, id)
            closeUpdateRoleAvatarModal()
        };

        return (
            <>
                <Button type="primary" onClick={showUpdateRoleAvatarModal}>
                    上传头像
                </Button>
                <Modal title={"上传用户头像"} open={isUpdateRoleAvatarModalOpen} onCancel={closeUpdateRoleAvatarModal}
                       footer={null}
                >
                    <Form
                        name="upload_user_avatar"
                        {...formItemLayout}
                        onFinish={onFinish}
                        style={{maxWidth: 600}}
                        autoComplete={'off'}
                    >
                        <Form.Item name="file" label="Avatar" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload
                                name="file"
                                listType="picture-circle"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        </Form.Item>
                        <Form.Item wrapperCol={{
                            xs: {
                                span: 24,
                                offset: 0,
                            },
                            sm: {
                                span: 16,
                                offset: 8,
                            },
                        }}
                        >
                            <Button type="primary" htmlType="submit" style={{margin: 10}}>
                                提交
                            </Button>
                            <Button type="primary" htmlType="button" onClick={closeUpdateRoleAvatarModal}>
                                取消
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );

    };

    const UpdateRole = (prop) => {
        let role = data.find(item => item.id === prop.id)

        const [isUpdateRoleModalOpen, setIsUpdateRoleModalOpen] = useState(false);

        function showUpdateRoleModal() {
            getUserList().then(res => {
                setUserOptions(res)
            })
            getCareer().then(res => {
                setCareerOptions(res)
            })
            setIsUpdateRoleModalOpen(true);
        }

        function closeUpdateRoleModal() {
            setIsUpdateRoleModalOpen(false);
        }

        const onFinish = (fieldsValue) => {
            const id = fieldsValue['id']
            const name = fieldsValue['username'];
            const qqNumber = fieldsValue['qqNumber'];
            const avatar = fieldsValue['avatar'];
            updateUser(id, name, qqNumber, avatar)
            closeUpdateRoleModal()
        };

        const handleChange = (value) => {
            console.log(`selected ${value}`);
        }

        const [userOptions, setUserOptions] = useState([])

        const [careerOptions, setCareerOptions] = useState([])

        return (
            <>
                <Button type="primary" onClick={showUpdateRoleModal}>
                    更新
                </Button>
                <Modal title={"更新用户信息"} open={isUpdateRoleModalOpen} onCancel={closeUpdateRoleModal}
                       footer={null}>
                    <Form
                        name="update_user"
                        {...formItemLayout}
                        onFinish={onFinish}
                        style={{maxWidth: 600}}
                        autoComplete={'off'}
                    >
                        <Form.Item name="id" label="ID" hidden={true} initialValue={role.id}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="name" label="名称" initialValue={role.name}
                                   rules={[{required: true, message: 'Please input role name!'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="career" label="职业" initialValue={role.career}
                                   rules={[{required: true, message: 'Please select career!'}]}>
                            <Cascader options={careerOptions} placeholder="Please select"  />
                        </Form.Item>
                        <Form.Item name="userId" label="用户" initialValue={role.userId}
                                   rules={[{required: true, message: 'Please select user!'}]}>
                            <Select
                                style={{
                                    width: 200,
                                }}
                                onChange={handleChange}
                                options={userOptions}
                                placeholder={"请选择用户"}
                            />
                        </Form.Item>
                        <Form.Item name="renown" label="名望" initialValue={role.renown}
                                   rules={[{min: 0, max: 100000, message: 'renown is range from 0 to 100000'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item wrapperCol={{
                            xs: {
                                span: 24,
                                offset: 0,
                                md: 24,
                            },
                            sm: {
                                span: 16,
                                offset: 8,
                            },
                        }}
                        >
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                            <Button type="primary" htmlType="button" onClick={closeUpdateRoleModal}>
                                取消
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );

    };

    const DeleteRole = (prop) => {

        const [isDeleteUserModalOpen, setIsDeleteRoleModalOpen] = useState(false);

        function showDeleteRolerModal() {
            setIsDeleteRoleModalOpen(true);
        }

        function closeDeleteRoleModal() {
            setIsDeleteRoleModalOpen(false);
        }

        const onFinish = (fieldsValue) => {
            const id = prop.id
            deleteRole(id)
            closeDeleteRoleModal()
        };

        return (
            <>
                <Button type="primary" onClick={showDeleteRolerModal}>
                    删除
                </Button>
                <Modal title="删除角色" open={isDeleteUserModalOpen} onOk={onFinish} onCancel={closeDeleteRoleModal}>
                    <p>是否删除角色</p>
                </Modal>
            </>
        );

    };

    function refreshData() {
        // getData().then(res => {
        //     setData(res)
        // })
        fetchDataPage()
    }

    function fetchDataPage() {
        setLoading(true);
        return axios.get(`/dnfapi/roles/page?${qs.stringify(getRandomuserParams(tableParams))}`, {
        }).then(res => {
            console.log(res.data)
            setData(res.data.data.records);
            setLoading(false);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res.data.data.total,
                    // 200 is mock data, you should read it from server
                    // total: data.totalCount,
                },
            });
        }).catch(err => {
            console.log(err)
            setData(emptyPage)
        })
    }

    // function getData() {
    //     return axios.get('/dnfapi/roles', {
    //     }).then(res => {
    //         console.log(res)
    //         return res.data.data
    //     }).catch(err => {
    //         console.log(err)
    //         return []
    //     })
    // }

    function getUserList() {
        return axios.get('/dnfapi/users/', {
        }).then(res => {
            return res.data.data.map(user => {
                return {
                    label: user.name,
                    value: user.id
                }
            })
        }).catch(err => {
            console.log(err)
            return []
        })
    }

    function getCareer() {
        return axios.get('/dnfapi/career/', {
        }).then(res => {
            return res.data.data.map(career => {
                return {
                    label: career.name,
                    value: career.id,
                    children: career.children.map(child => {
                        return {
                            label: child.name,
                            value: child.id
                        }
                    })
                }
            })
        }).catch(err => {
            console.log(err)
            return []
        })
    }

    function addRole(name, careerId, userId, renown) {
        axios.post('/dnfapi/roles/', {
            name: name,
            careerId: careerId,
            userId: userId,
            renown: renown
        }).then(res => {
            refreshData()
        }).catch(err => {
            console.log(err)
        })
    }

    function uploadRoleAvatar(formData : FormData, id) {
        axios.post('/dnfapi/users/uploadAvatar?id=' + id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            refreshData()
        }).catch(err => {
            console.log(err)
        })
    }

    function updateUser(id, name, qqNumber, avatar) {
        axios.put('/dnfapi/users/',{
            id: id,
            name: name,
            qqNumber: qqNumber,
            avatar: avatar
        }).then(res => {
            refreshData()
        }).catch(err => {
            console.log(err)
        })
    }

    function deleteRole(id) {
        axios.delete('/dnfapi/roles/' + id, {

        }).then(res => {
            refreshData()
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <AddRole/>
            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                scroll={{x: 1300, y: 500, scrollToFirstRowOnChange: true}}
            />
        </div>
    );
};

export default App;
