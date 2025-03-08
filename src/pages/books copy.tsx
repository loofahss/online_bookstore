import React, { useContext, useState, useEffect } from 'react';
import { Input, Table, Button, notification, Modal } from 'antd';
import axios from 'axios';
import { UserContext } from '../components/UserContext.tsx';

const { Search } = Input;

interface Book {
    book_id: number;
    cover_image_base64: string | null;
    book_title: string;
    author1: string;
    author2: string | null;
    author3: string | null;
    author4: string | null;
    publisher: string;
    price: string;
    keywords: string;
    table_of_contents: string;
    cover_image: string | null;
    stock_quantity: number;
}

interface BookManagementProps {
    addToOrders: (book: any) => void; // 添加订单的方法
}

const BookManagement: React.FC<BookManagementProps> = ({ addToOrders }) => {
    const { user } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [booksData, setBooksData] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [purchaseTimes, setPurchaseTimes] = useState<{ [key: number]: string }>({});

    const userId = user ? user.username : null;

    // 从 API 获取书籍数据
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/books/')
            .then(response => response.json())
            .then(data => {
                console.log('responseData', data); // 在这里打印 responseData
                setBooksData(data);
                setFilteredBooks(data);
                console.log('booksData', data); // 在这里打印 booksData
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, []);

    // 搜索功能
    const handleSearch = (value: string) => {
        setSearchTerm(value);
        const filtered = booksData.filter(
            (book) =>
                book.book_title.toLowerCase().includes(value.toLowerCase()) ||
                book.author1.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredBooks(filtered);
    };

    // 添加到订单并显示通知
    const handleBuy = (book: any) => {
        addToOrders(book);
        notification.success({
            message: '购买成功',
            description: `${book.book_title} 已加入订单信息！`,
        });
    };

    const handleAddToCart = (book: Book) => {
        addToOrders(book);
    };

    // const handlePurchase = async (book: Book) => {
    //     try {
    //         const response = await axios.post('http://localhost:8000/api/purchase/', {
    //             user_id: userId,
    //             book_id: book.book_id,
    //             quantity: 1
    //         });
    //         if (response.data.success) {

    //             const purchaseTime = response.data.purchase_time;
    //             setPurchaseTimes(prevTimes => ({
    //                 ...prevTimes,
    //                 [book.book_id]: purchaseTime
    //             }));
    //             // Modal.success({
    //             //     title: '购买成功',
    //             //     // content: `购买时间: ${purchaseTime}`,
    //             // });
    //             handleBuy(book);
    //         }
    //     } catch (error) {
    //         Modal.error({
    //             title: '购买失败',
    //             content: Response.data.error,
    //         });
    //     }
    // };
    const handlePurchase = async (book: Book) => {
        try {
            console.log('开始请求')
            const response = await axios.post('http://localhost:8000/api/purchase/', {
                user_id: userId,
                book_id: book.book_id,
                quantity: 1
            });
            console.log('购买结果', response.data);
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
            console.error('购买失败', error);
            Modal.error({
                title: '购买失败',
                content: '发生未知错误，请稍后重试。',
            });
        }
    };
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
            title: '库存数量',
            dataIndex: 'stock_quantity',
            key: 'stock_quantity',
        },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: Book) => (
                purchaseTimes[record.book_id] ? (
                    <p>购买时间: {purchaseTimes[record.book_id]}</p>
                ) : (
                    <Button type="primary" onClick={() => handlePurchase(record)}>
                        购买
                    </Button>
                )
            ),
        },
    ];

    return (
        <div>
            <Search
                placeholder="请输入书名或作者进行搜索"
                allowClear
                enterButton="搜索"
                size="large"
                onSearch={handleSearch}
                style={{ marginBottom: '20px', maxWidth: '600px', margin: '0 auto', display: 'block' }}
            />
            <Table
                dataSource={filteredBooks}
                columns={columns}
                pagination={{ pageSize: 5 }}
                rowKey="book_id"
                style={{ margin: '0 auto', maxWidth: '800px' }}
            />
        </div>
    );
};

export default BookManagement;