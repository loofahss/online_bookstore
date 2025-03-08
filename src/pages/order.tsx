import React, { useContext } from 'react';
import { Table, Modal } from 'antd';
import axios from 'axios';
import { UserContext } from '../components/UserContext.tsx';

interface Book {
    book_id: number;
    book_title: string;
    author1: string;
    publisher: string;
    price: string;
    stock_quantity: number;
    purchaseTime: string;
}

interface OrderProps {
    orders: Book[];
}

const Order: React.FC<OrderProps> = ({ orders }) => {
    const { user } = useContext(UserContext);
    const userId = user ? user.username : null;

    const handlePurchase = async (book: Book) => {
        try {
            const response = await axios.post('http://localhost:8000/api/purchase/', {
                user_id: userId,
                book_id: book.book_id,
                quantity: 1,
            });
            if (response.data.success) {
                Modal.success({
                    title: '购买成功',
                    content: '您的订单已成功购买。',
                });
            } else {
                Modal.error({
                    title: '购买失败',
                    content: response.data.error,
                });
            }
        } catch (error) {
            Modal.error({
                title: '购买失败',
                content: '发生未知错误，请稍后重试。',
            });
        }
    };

    // 添加几个固定订单
    const fixedOrders: Book[] = [
        {
            book_id: 1,
            book_title: '伟大的冒险',
            author1: '张伟',
            publisher: '冒险出版社',
            price: '29.99',
            stock_quantity: 10,
            purchaseTime: '2024/12/25 20:26:44',
        },
        {
            book_id: 2,
            book_title: '美食之旅',
            author1: '孙婷',
            publisher: '美食出版公司',
            price: '9.99',
            stock_quantity: 5,
            purchaseTime: '2024/12/25 20:27:24',
        },
    ];

    // 表格列定义
    const columns = [
        {
            title: '书名',
            dataIndex: 'book_title',
            key: 'book_title',
        },
        {
            title: '作者',
            dataIndex: 'author1',
            key: 'author1',
        },
        {
            title: '出版社',
            dataIndex: 'publisher',
            key: 'publisher',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '购买时间',
            dataIndex: 'purchaseTime',
            key: 'purchaseTime',
        },
    ];

    return (
        <div>
            <Table
                dataSource={[...fixedOrders, ...orders]} // 合并固定订单和传入的订单
                columns={columns}
                pagination={{ pageSize: 5 }}
                rowKey="book_id"
                style={{
                    margin: '20px auto',
                    maxWidth: '800px',
                    backgroundColor: 'rgba(249, 142, 2, 0.3)',
                }}
            />
        </div>
    );
};

export default Order;
