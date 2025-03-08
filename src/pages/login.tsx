import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import { UserContext } from '../components/UserContext.tsx';
import RegisterForm from './RegisterForm.tsx';
import './form.css';

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const handleLogin = (values: { username: string; password: string }) => {
        setLoading(true);
        fetch('http://localhost:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                if (data.success) {
                    setUser(data.user);
                    navigate('/');
                } else {
                    notification.error({ message: data.error });
                }
            })
            .catch(() => {
                setLoading(false);
                notification.error({ message: '登录失败，请稍后再试' });
            });
    };

    return (
        <div
    style={{
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: "url('https://s2.loli.net/2024/12/21/SZ5o1iNRshA8eYf.jpg')", // 设置背景图片
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    }}
    >
        <div
            className="form-container"
        >
            {showRegisterForm ? (
                <RegisterForm />
            ) : (
                <Form
                    onFinish={handleLogin}
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // 半透明背景
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        width: '300px',
                    }}
                >
                    <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            登录
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <a href="#" onClick={() => setShowRegisterForm(true)}>注册</a>
                    </Form.Item>
                </Form>
            )}
        </div>
        </div>
    );
};

export default Login;
