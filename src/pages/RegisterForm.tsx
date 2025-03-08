import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import './form.css';

const RegisterForm: React.FC = () => {
const [loading, setLoading] = useState(false);

const handleSubmit = async (values: { username: string; password: string; full_name: string; address: string; account_balance: number }) => {
setLoading(true);
try {
    const response = await axios.post('http://localhost:8000/api/register/', values);
    notification.success({ message: response.data.message });
} catch (error) {
    notification.error({ message: error.response.data.error });
} finally {
    setLoading(false);
}
};

return (
<div className="form-container" 
style={{
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // 半透明背景
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '300px',
}}>
    <Form onFinish={handleSubmit}>
    <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input />
    </Form.Item>
    <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password />
    </Form.Item>
    <Form.Item name="full_name" label="全名" rules={[{ required: true, message: '请输入全名' }]}>
        <Input />
    </Form.Item>
    <Form.Item name="address" label="地址" rules={[{ required: true, message: '请输入地址' }]}>
        <Input />
    </Form.Item>
    <Form.Item name="account_balance" label="账户余额" initialValue={0.00}>
        <Input type="number" />
    </Form.Item>
    <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
        注册
        </Button>
    </Form.Item>
    </Form>
</div>
);
};

export default RegisterForm;