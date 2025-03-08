import React, { useContext } from 'react';
import { Layout, Typography } from 'antd';
import './home.css';
import { UserContext } from '../components/UserContext.tsx';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
    const { user } = useContext(UserContext);
    console.log('user:', user);

    return (
        <Layout
            className="color_box"
            style={{
                backgroundImage: "url('https://s2.loli.net/2024/12/21/SZ5o1iNRshA8eYf.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                margin: 0,
            }}
        >
            <Title level={2} style={{ color: '#fff' }}>欢迎来到 Amazing 网上书店</Title>
            <Paragraph style={{ color: '#fff' }}>
                在这里，您可以享受到便捷的网上购书体验。
            </Paragraph>
            {!user && (
                <button
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: 'rgba(255, 255, 255)',
                        backgroundColor: 'rgba(249, 142, 2, 0.3)',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                    }}
                    onClick={() => (window.location.href = '/login')}
                    onMouseOver={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = 'rgba(223, 156, 20, 0.3)')}
                >
                    去登录
                </button>
            )}
        </Layout>
    );
};

export default HomePage;
