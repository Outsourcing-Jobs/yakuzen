import React, { useState, useEffect } from 'react';
import {
    Table, Button, Switch, Input, message, Form, Modal, Upload,
    Space, Typography, Card, Row, Col, Statistic, Divider, InputNumber, Popconfirm
} from 'antd';
import {
    OrderedListOutlined,
    SettingOutlined,
    SaveOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    UploadOutlined,
    PictureOutlined,
    LinkOutlined
} from '@ant-design/icons';
import axios from '../../utils/axios';
import SafeImage from '../../components/Default/SafeImage';

const { Title, Text, Paragraph } = Typography;

const AdminRecentWork = () => {
    const [recentWorks, setRecentWorks] = useState([]);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [settingLoading, setSettingLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
        fetchLimit();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/recent-work-images/all');
            setRecentWorks(res.data);
        } catch (error) {
            message.error('Lỗi khi tải danh sách Recent Works');
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

    const handleAdd = () => {
        setEditingItem(null);
        setFileList([]);
        form.resetFields();
        form.setFieldsValue({ order: 0, isVisible: true });
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        form.setFieldsValue({
            title: item.title,
            description: item.description,
            link: item.link,
            order: item.order,
            isVisible: item.isVisible
        });

        if (item.image?.url) {
            setFileList([
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: item.image.url
                }
            ]);
        } else {
            setFileList([]);
        }

        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/recent-work-images/${id}`);
            message.success('Đã xóa Recent Work thành công');
            fetchData();
        } catch (error) {
            message.error('Xóa thất bại');
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            await axios.put(`/recent-work-images/${id}/status`, { isVisible: !currentStatus });
            message.success('Cập nhật trạng thái hiển thị thành công');
            fetchData();
        } catch (error) {
            message.error('Cập nhật trạng thái thất bại');
        }
    };

    const handleUpdateOrder = async (id, newOrder) => {
        try {
            await axios.put('/recent-work-images/reorder', { orders: [{ id, order: newOrder }] });
            fetchData();
        } catch (error) {
            message.error('Cập nhật thứ tự thất bại');
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            
            if (!editingItem && fileList.length === 0) {
                message.error('Vui lòng tải lên một hình ảnh');
                return;
            }

            setSubmitting(true);
            const formData = new FormData();
            formData.append('title', values.title || '');
            formData.append('description', values.description || '');
            formData.append('link', values.link || '');
            formData.append('order', values.order !== undefined ? values.order : 0);
            formData.append('isVisible', values.isVisible !== undefined ? values.isVisible : true);

            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append('image', fileList[0].originFileObj);
            }

            if (editingItem) {
                await axios.put(`/recent-work-images/${editingItem._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                message.success('Cập nhật Recent Work thành công');
            } else {
                await axios.post('/recent-work-images', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                message.success('Thêm Recent Work mới thành công');
            }

            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            if (error.name !== 'ValidationError') {
                console.error(error);
                message.error('Có lỗi xảy ra khi lưu');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const columns = [
        {
            title: 'Thứ tự',
            dataIndex: 'order',
            key: 'order',
            width: 100,
            sorter: (a, b) => a.order - b.order,
            render: (val, record) => (
                <InputNumber
                    size="small"
                    min={0}
                    value={val}
                    onChange={(newVal) => {
                        // Optimistically update order
                        const updated = recentWorks.map(item => 
                            item._id === record._id ? { ...item, order: newVal } : item
                        );
                        setRecentWorks(updated);
                    }}
                    onBlur={(e) => handleUpdateOrder(record._id, parseInt(e.target.value))}
                    style={{ width: 70 }}
                />
            )
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            width: 100,
            render: (image) => (
                image?.url ? (
                    <SafeImage
                        src={image.url}
                        alt="recent work"
                        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid #f0f0f0' }}
                    />
                ) : (
                    <div style={{ width: 60, height: 60, background: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PictureOutlined style={{ color: '#ccc' }} />
                    </div>
                )
            )
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (text) => text ? <Text strong>{text}</Text> : <Text type="secondary">Không có tiêu đề</Text>
        },
        {
            title: 'Mô tả / Tag',
            dataIndex: 'description',
            key: 'description',
            render: (text) => text ? <Text>{text}</Text> : <Text type="secondary">Không có mô tả</Text>
        },
        {
            title: 'Liên kết',
            dataIndex: 'link',
            key: 'link',
            render: (text) => text ? (
                <a href={text.startsWith('http') ? text : `http://${text}`} target="_blank" rel="noopener noreferrer">
                    <LinkOutlined /> {text.length > 30 ? `${text.substring(0, 30)}...` : text}
                </a>
            ) : <Text type="secondary">—</Text>
        },
        {
            title: 'Hiển thị Web',
            dataIndex: 'isVisible',
            key: 'isVisible',
            align: 'center',
            width: 120,
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
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        ghost
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xác nhận xóa Recent Work này?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button icon={<DeleteOutlined />} danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div style={{ padding: '0 10px' }}>
            <div style={{ marginBottom: '30px', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', padding: '30px', borderRadius: '15px', color: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <Title level={2} style={{ color: 'white', margin: 0 }}>
                            <OrderedListOutlined /> Quản lý Recent Works (Ảnh)
                        </Title>
                        <Paragraph style={{ color: 'rgba(255,255,255,0.8)', marginTop: '10px', marginBottom: 0 }}>
                            Tải lên và cấu hình hình ảnh hiển thị trong phần Recent Works tại trang chủ. Bạn có thể thiết lập thứ tự hiển thị, tiêu đề, mô tả ngắn (Tag) và liên kết click điều hướng cho mỗi tác phẩm.
                        </Paragraph>
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                        style={{
                            background: 'white',
                            color: '#4f46e5',
                            border: 'none',
                            fontWeight: 'bold',
                            height: 'auto',
                            padding: '10px 24px',
                            borderRadius: '10px'
                        }}
                    >
                        Thêm Recent Work
                    </Button>
                </div>
            </div>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <Card style={{ borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <Table
                            dataSource={recentWorks}
                            columns={columns}
                            rowKey="_id"
                            loading={loading}
                            pagination={{ pageSize: 8 }}
                            size="middle"
                        />
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
                                <Paragraph type="secondary" style={{ fontSize: '12px', marginTop: '5px' }}>
                                    Số lượng tối đa tác phẩm Recent Works sẽ lấy ra để hiển thị trên trang chủ.
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
                                title="Tổng số Recent Works"
                                value={recentWorks.length}
                                prefix={<PictureOutlined />}
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

            <Modal
                title={
                    <Space>
                        <PictureOutlined />
                        <span>{editingItem ? 'Chỉnh sửa Recent Work' : 'Thêm Recent Work mới'}</span>
                    </Space>
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => !submitting && setIsModalOpen(false)}
                confirmLoading={submitting}
                okText="Lưu thay đổi"
                cancelText="Hủy bỏ"
                centered
                destroyOnClose
            >
                <Form form={form} layout="vertical" style={{ paddingTop: '15px' }}>
                    <Form.Item name="title" label={<Text strong>Tiêu đề</Text>}>
                        <Input placeholder="VD: Artwork Name, Project Title..." />
                    </Form.Item>
                    
                    <Form.Item name="description" label={<Text strong>Mô tả ngắn / Tag</Text>}>
                        <Input placeholder="VD: Illustration, Live2D, Fanart..." />
                    </Form.Item>

                    <Form.Item name="link" label={<Text strong>Liên kết điều hướng (Link)</Text>}>
                        <Input placeholder="VD: https://vgen.co/yakuzen or /tos..." />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="order" label={<Text strong>Thứ tự hiển thị</Text>}>
                                <InputNumber style={{ width: '100%' }} min={0} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="isVisible" valuePropName="checked" label={<Text strong>Trạng thái hiển thị</Text>}>
                                <Switch checkedChildren="Hiển thị" unCheckedChildren="Ẩn" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation="left"><Text type="secondary" style={{ fontSize: '12px' }}>HÌNH ẢNH</Text></Divider>
                    <Form.Item label={null}>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList.slice(-1))}
                            beforeUpload={() => false}
                            maxCount={1}
                        >
                            {fileList.length >= 1 ? null : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Tải ảnh</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminRecentWork;
