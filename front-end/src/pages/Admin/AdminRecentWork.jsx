import React, { useState, useEffect } from 'react';
import { Table, Button, Switch, Input, message, Tabs, Space, Typography, Card, Row, Col, Statistic, Divider, InputNumber } from 'antd';
import {
    AppstoreAddOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    OrderedListOutlined,
    SettingOutlined,
    SaveOutlined,
    CheckCircleOutlined,
    PlusOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import axios from '../../utils/axios';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const AdminRecentWork = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [recentWorks, setRecentWorks] = useState([]);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [settingLoading, setSettingLoading] = useState(false);

    useEffect(() => {
        fetchData();
        fetchLimit();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [prodRes, recentRes] = await Promise.all([
                axios.get('/products'),
                axios.get('/recent-works/all')
            ]);
            setAllProducts(prodRes.data);
            setRecentWorks(recentRes.data);
        } catch (error) {
            message.error('Lỗi khi tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    const fetchLimit = async () => {
        try {
            const res = await axios.get('/settings/recent_works_limit');
            setLimit(res.data.value);
        } catch (error) {
            console.log('Limit setting not found, using default');
        }
    };

    const handleUpdateLimit = async () => {
        setSettingLoading(true);
        try {
            await axios.put('/settings/recent_works_limit', { value: limit });
            message.success('Cập nhật số lượng hiển thị thành công');
        } catch (error) {
            message.error('Cập nhật thất bại');
        } finally {
            setSettingLoading(false);
        }
    };

    const togglePool = async (productId) => {
        try {
            const res = await axios.post('/recent-works/toggle', { productId });
            message.success(res.data.message);
            fetchData();
        } catch (error) {
            message.error('Thực hiện thất bại');
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            await axios.put(`/recent-works/${id}/status`, { isVisible: !currentStatus });
            message.success('Cập nhật trạng thái hiển thị thành công');
            fetchData();
        } catch (error) {
            message.error('Thực hiện thất bại');
        }
    };

    const isInPool = (productId) => {
        return recentWorks.some(work => work.product?._id === productId);
    };

    const productColumns = [
        {
            title: 'Hình ảnh',
            dataIndex: 'images',
            key: 'images',
            render: (images) => (
                <img
                    src={images?.[0]?.url || 'https://via.placeholder.com/50'}
                    alt="product"
                    style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                />
            )
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            render: (cat) => cat?.name || 'Uncategorized'
        },
        {
            title: 'Trong Pool?',
            key: 'status',
            align: 'center',
            render: (_, record) => (
                <Button
                    type={isInPool(record._id) ? 'primary' : 'default'}
                    danger={isInPool(record._id)}
                    icon={isInPool(record._id) ? <CloseCircleOutlined /> : <PlusOutlined />}
                    onClick={() => togglePool(record._id)}
                >
                    {isInPool(record._id) ? 'Xóa khỏi Pool' : 'Thêm vào Pool'}
                </Button>
            )
        }
    ];

    const recentColumns = [
        {
            title: 'Thứ tự',
            dataIndex: 'order',
            key: 'order',
            width: 80,
            render: (val, record) => (
                <InputNumber
                    size="small"
                    min={0}
                    defaultValue={val}
                    onBlur={(e) => handleUpdateOrder(record._id, parseInt(e.target.value))}
                />
            )
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'product',
            key: 'product',
            render: (prod) => prod?.name || <Text type="danger">Sản phẩm đã bị xóa</Text>
        },
        {
            title: 'Hiển thị Web',
            dataIndex: 'isVisible',
            key: 'isVisible',
            align: 'center',
            render: (isVisible, record) => (
                <Switch
                    checked={isVisible}
                    onChange={() => toggleStatus(record._id, isVisible)}
                    checkedChildren={<EyeOutlined />}
                    unCheckedChildren={<EyeInvisibleOutlined />}
                />
            )
        },
        {
            title: 'Hành động',
            key: 'actions',
            align: 'center',
            render: (_, record) => (
                <Button
                    type="text"
                    danger
                    onClick={() => togglePool(record.product?._id)}
                >
                    Loại bỏ
                </Button>
            )
        }
    ];

    const handleUpdateOrder = async (id, newOrder) => {
        try {
            await axios.put('/recent-works/reorder', { orders: [{ id, order: newOrder }] });
            // message.success('Cập nhật thứ tự thành công');
            fetchData();
        } catch (error) {
            message.error('Cập nhật thứ tự thất bại');
        }
    };

    return (
        <div style={{ padding: '0 10px' }}>
            <div style={{ marginBottom: '30px', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', padding: '30px', borderRadius: '15px', color: 'white' }}>
                <Title level={2} style={{ color: 'white', margin: 0 }}>
                    <OrderedListOutlined /> Quản lý Recent Works
                </Title>
                <Paragraph style={{ color: 'rgba(255,255,255,0.8)', marginTop: '10px' }}>
                    Chọn sản phẩm từ danh sách tổng để đưa vào "Recent Pool", sau đó tùy chỉnh hiển thị và thứ tự tại đây.
                </Paragraph>
            </div>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <Card style={{ borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <Tabs defaultActiveKey="1" animated>
                            <TabPane
                                tab={<span><AppstoreAddOutlined /> Tất cả sản phẩm</span>}
                                key="1"
                            >
                                <Table
                                    dataSource={allProducts}
                                    columns={productColumns}
                                    rowKey="_id"
                                    loading={loading}
                                    pagination={{ pageSize: 8 }}
                                    size="middle"
                                />
                            </TabPane>
                            <TabPane
                                tab={<span><CheckCircleOutlined /> Pool hiển thị ({recentWorks.length})</span>}
                                key="2"
                            >
                                <Table
                                    dataSource={recentWorks}
                                    columns={recentColumns}
                                    rowKey="_id"
                                    loading={loading}
                                    pagination={false}
                                    size="middle"
                                />
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card
                        title={<span><SettingOutlined /> Cấu hình hiển thị</span>}
                        style={{ borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    >
                        <Space direction="vertical" style={{ width: '100%' }} size="large">
                            <div>
                                <Text strong>Số lượng hiển thị tối đa:</Text>
                                <Paragraph type="secondary" style={{ fontSize: '12px' }}>
                                    Số lượng tối đa Recent Works sẽ lấy ra từ database để hiển thị trên trang chủ.
                                </Paragraph>
                                <Space.Compact style={{ width: '100%', marginTop: '5px' }}>
                                    <InputNumber
                                        min={1}
                                        max={50}
                                        value={limit}
                                        onChange={setLimit}
                                        style={{ width: '100%' }}
                                    />
                                    <Button
                                        type="primary"
                                        icon={<SaveOutlined />}
                                        onClick={handleUpdateLimit}
                                        loading={settingLoading}
                                    >
                                        LƯU
                                    </Button>
                                </Space.Compact>
                            </div>

                            <Divider style={{ margin: '12px 0' }} />

                            <Statistic
                                title="Đang trong Pool"
                                value={recentWorks.length}
                                prefix={<AppstoreAddOutlined />}
                            />
                            <Statistic
                                title="Đang hiển thị trên Web"
                                value={recentWorks.filter(w => w.isVisible).length}
                                prefix={<EyeOutlined />}
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminRecentWork;
