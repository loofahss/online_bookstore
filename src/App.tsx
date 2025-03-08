import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Menu } from "antd";
import { SmileFilled, BookFilled, AccountBookFilled } from "@ant-design/icons";

import HomePage from './pages/home.tsx';
import User from './pages/user.tsx';
import Order from './pages/order.tsx';
import BookManagement from './pages/books.tsx';
import Login from './pages/login.tsx';
import { UserProvider } from './components/UserContext.tsx';

const App: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);

  // 添加到订单的方法
  const addToOrders = (book: any) => {
    const purchaseTime = new Date().toLocaleString(); // 获取当前时间
    setOrders([...orders, { ...book, purchaseTime }]);
  };

  return (
    <UserProvider>
      <Router>
        <div
          style={{
            backgroundImage: "url('https://s2.loli.net/2024/12/21/SZ5o1iNRshA8eYf.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh', // 确保背景填满视窗
            overflow: 'hidden', // 禁用滚动条
            opacity: 1.0, // 设置透明度
          }}
        >
          <Menu mode="horizontal"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
          >
            <Menu.Item key="1" icon={<SmileFilled />}>
              <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<BookFilled />}>
              <Link to="/books">图书查询</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<AccountBookFilled />}>
              <Link to="/order">订单信息</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<AccountBookFilled />}>
              <Link to="/user">个人信息</Link>
            </Menu.Item>
          </Menu>
          <div style={{ padding: "20px", backgroundColor: 'rgba(255, 255, 255, 0.3)', minHeight: 'calc(100vh - 64px)' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/books" element={<BookManagement addToOrders={addToOrders} />} />
              <Route path="/order" element={<Order orders={orders} />} />
              <Route path="/user" element={<User />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
