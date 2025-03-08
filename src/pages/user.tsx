import React, { useContext, useEffect, useState } from 'react';
import { Table, Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import { UserContext } from '../components/UserContext.tsx';

const UserPage: React.FC = () => {
    const { user, setUser } = useContext(UserContext); // 获取当前登录用户信息
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (user) {
            setUserInfo(user); // 使用登录时返回的用户信息
        }
    }, [user]);

    const handleUpdate = async (values: any) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/users/${user.customer_id}/update/`, values);
            if (response.data.success) {
                const updatedUser = { ...user, ...values }; // 合并更新后的用户信息
                setUser(updatedUser); // 更新上下文中的用户信息
                setUserInfo(updatedUser); // 更新本地状态中的用户信息
                notification.success({
                    message: '更新成功',
                    description: '用户信息更新成功',
                });
            } else {
                notification.error({
                    message: '更新失败',
                    description: response.data.message,
                });
            }
        } catch (error) {
            notification.error({
                message: '更新失败',
                description: '该用户名已存在',
            });
        }
    };

    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '账户余额',
            dataIndex: 'account_balance',
            key: 'account_balance',
        },
        {
            title: '信用等级',
            dataIndex: 'credit_level',
            key: 'credit_level',
        },
        {
            title: '全名',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <div>
            {userInfo ? (
                <>
                    <Table
                        dataSource={[userInfo]} // 只展示当前用户的信息
                        columns={columns}
                        pagination={false} // 不需要分页
                        rowKey="username"
                        style={{ margin: '0 auto', maxWidth: '800px' }}
                    />
                    <Form
                        layout="vertical"
                        onFinish={handleUpdate}
                        initialValues={userInfo}
                        style={{ marginTop: '20px', maxWidth: '800px', margin: '0 auto' }}
                    >
                        <div style={{ backgroundColor: 'rgba(255, 255, 255)', padding: '20px' }}>
                        <Form.Item name="username" label="用户名">
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="密码">
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name="full_name" label="全名">
                            <Input />
                        </Form.Item>
                        <Form.Item name="address" label="地址">
                            <Input />
                        </Form.Item>
                        <Form.Item name="account_balance" label="账户余额">
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                更新信息
                            </Button>
                        </Form.Item>
                        </div>
                        
                    </Form>
                </>
            ) : (
                <p style={{ textAlign: 'center' }}>加载中...</p>
            )}
        </div>
    );
};

export default UserPage;