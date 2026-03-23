import React from 'react';
import { Row, Col, Card, Statistic, Typography, Divider, Space, Timeline } from 'antd';
import {
    UserOutlined,
    ShoppingCartOutlined,
    DollarOutlined,
    InfoCircleOutlined,
    SettingOutlined,
    AppstoreAddOutlined,
    FileProtectOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const AdminDashboard = () => {
    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '40px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: '40px', borderRadius: '20px', color: 'white' }}>
                <Title level={1} style={{ color: 'white', margin: 0 }}>Chào mừng Admin Yakuzen! 👋</Title>
                <Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginTop: '10px' }}>
                    Hệ thống quản trị đang vận hành ổn định. Dưới đây là tóm tắt và hướng dẫn sử dụng nhanh dành cho bạn.
                </Paragraph>
            </div>

            <Row gutter={[24, 24]}>
                <Col xs={24} sm={8}>
                    <Card style={{ borderLeft: '5px solid #10b981', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <Statistic
                            title={<Text strong style={{ color: '#64748b' }}>TỔNG NGƯỜI DÙNG</Text>}
                            value={0}
                            valueStyle={{ color: '#10b981', fontWeight: 'bold' }}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card style={{ borderLeft: '5px solid #f59e0b', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <Statistic
                            title={<Text strong style={{ color: '#64748b' }}>SẢN PHẨM HIỆN CÓ</Text>}
                            value={0}
                            valueStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                            prefix={<ShoppingCartOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card style={{ borderLeft: '5px solid #3b82f6', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <Statistic
                            title={<Text strong style={{ color: '#64748b' }}>DOANH THU UY TÍN</Text>}
                            value={0}
                            precision={0}
                            valueStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                            prefix={<DollarOutlined />}
                            suffix="VNĐ"
                        />
                    </Card>
                </Col>
            </Row>

            <Divider orientation="left" style={{ marginTop: '50px' }}>
                <Space><InfoCircleOutlined /> <Title level={4} style={{ margin: 0 }}>HƯỚNG DẪN SỬ DỤNG HỆ THỐNG</Title></Space>
            </Divider>

            <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                    <Card title={<Space><SettingOutlined style={{ color: '#10b981' }} /> Quản lý nội dung gốc</Space>} hoverable>
                        <Timeline
                            items={[
                                {
                                    color: 'green',
                                    children: (
                                        <>
                                            <Text strong>Cài đặt TOS (Điều khoản):</Text>
                                            <Paragraph>Sử dụng trình soạn thảo động để thay đổi nội dung các mục Điều khoản và nút kêu gọi hành động (CTA) trên trang chủ.</Paragraph>
                                        </>
                                    ),
                                },
                                {
                                    color: 'blue',
                                    children: (
                                        <>
                                            <Text strong>Quản lý Danh mục:</Text>
                                            <Paragraph>Tạo các nhóm sản phẩm (Trà, Thảo dược...) trước khi đăng sản phẩm để đảm bảo dữ liệu được phân loại chuẩn.</Paragraph>
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title={<Space><AppstoreAddOutlined style={{ color: '#f59e0b' }} /> Quản lý sản phẩm & KH</Space>} hoverable>
                        <Timeline
                            items={[
                                {
                                    color: 'orange',
                                    children: (
                                        <>
                                            <Text strong>Đăng Sản phẩm mới:</Text>
                                            <Paragraph>Hệ thống cho phép tải lên nhiều ảnh cùng lúc. Đừng quên nhập giá và chọn đúng danh mục nhé.</Paragraph>
                                        </>
                                    ),
                                },
                                {
                                    color: 'gray',
                                    children: (
                                        <>
                                            <Text strong>Phân quyền Người dùng:</Text>
                                            <Paragraph>Tại trang Người dùng, bạn có thể nâng cấp quyền Admin cho các cộng sự hoặc kiểm soát tài khoản khách hàng.</Paragraph>
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </Card>
                </Col>
            </Row>

            <div style={{ marginTop: '60px', textAlign: 'center', opacity: 0.6 }}>
                <Text italic>Phiên bản quản trị Yakuzen v1.0.0 © 2026. Chúc bạn làm việc hiệu quả!</Text>
            </div>
        </div>
    );
};

export default AdminDashboard;
