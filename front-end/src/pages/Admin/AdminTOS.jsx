import React, { useEffect, useState } from 'react';
import {
    Form, Input, Button, Space, Card, Divider,
    message, Typography, Row, Col, Tooltip,
    Tag
} from 'antd';
import {
    PlusOutlined, DeleteOutlined, SaveOutlined,
    FileTextOutlined, LinkOutlined, SettingOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import axios from '../../utils/axios';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const { Title, Text } = Typography;

const RichTextEditor = ({ value, onChange, placeholder }) => {
    return (
        <SunEditor
            setContents={value}
            onChange={onChange}
            setOptions={{
                buttonList: [
                    ["font", "fontSize", "formatBlock"],
                    ["bold", "underline", "italic", "strike"],
                    ["fontColor", "hiliteColor"],
                    ["align", "list", "lineHeight"],
                    ["link", "image", "video"],
                    ["fullScreen", "showBlocks", "codeView"],
                    ["preview"]
                ],
                minHeight: "150px",
                height: "auto",
                width: "100%"
            }}
            placeholder={placeholder}
        />
    );
};

const AdminTOS = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTOS();
    }, []);

    const fetchTOS = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/tos');
            if (response.data) {
                form.setFieldsValue(response.data);
            }
        } catch (error) {
            console.error('Error fetching TOS:', error);
            message.error('Không thể tải dữ liệu TOS');
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await axios.put('/tos', values);
            message.success('Cập nhật TOS thành công');
        } catch (error) {
            console.error('Error updating TOS:', error);
            message.error('Cập nhật thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Card
                style={{
                    marginBottom: 24,
                    background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
                    borderRadius: '16px',
                    border: 'none',
                    width: '100%'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <Title level={2} style={{ color: 'white', margin: 0 }}>
                            <FileTextOutlined /> Quản lý Điều khoản (TOS)
                        </Title>
                        <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                            Cấu hình nội dung các mục điều khoản dịch vụ và các nút kêu gọi hành động (CTA)
                        </Text>
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        icon={<SaveOutlined />}
                        onClick={() => form.submit()}
                        loading={loading}
                        style={{
                            background: 'white',
                            color: '#4338ca',
                            border: 'none',
                            fontWeight: 'bold',
                            height: 'auto',
                            padding: '10px 24px',
                            borderRadius: '10px'
                        }}
                    >
                        Lưu thay đổi
                    </Button>
                </div>
            </Card>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ sections: [], ctaLinks: [] }}
            >
                <Card
                    title={<Space><SettingOutlined /> Cấu hình chung</Space>}
                    style={{ marginBottom: 24, borderRadius: '12px' }}
                >
                    <Form.Item
                        name="title"
                        label={<Text strong>Tiêu đề trang</Text>}
                        rules={[{ required: true }]}
                    >
                        <Input size="large" placeholder="Ví dụ: TERMS OF SERVICE" />
                    </Form.Item>
                </Card>

                <Card
                    title={
                        <Space>
                            <InfoCircleOutlined />
                            <span>Các mục nội dung (Sections)</span>
                        </Space>
                    }
                    style={{ marginBottom: 24, borderRadius: '12px' }}
                >
                    <Form.List name="sections">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Card
                                        key={key}
                                        type="inner"
                                        title={
                                            <Space>
                                                <Tag color="blue">Mục {name + 1}</Tag>
                                                <Text type="secondary" style={{ fontSize: '12px' }}>Chỉnh số thứ tự để sắp xếp</Text>
                                            </Space>
                                        }
                                        extra={
                                            <Tooltip title="Xóa mục này">
                                                <Button
                                                    type="text"
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    onClick={() => remove(name)}
                                                />
                                            </Tooltip>
                                        }
                                        style={{ marginBottom: 16, borderRadius: '8px', border: '1px solid #f0f0f0' }}
                                    >
                                        <Row gutter={16}>
                                            <Col span={8}>
                                                <Form.Item {...restField} name={[name, 'badge']} label="Badge">
                                                    <Input placeholder="READ FIRST" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item {...restField} name={[name, 'heading']} label="Heading" rules={[{ required: true }]}>
                                                    <Input placeholder="IMPORTANT RULES" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item {...restField} name={[name, 'order']} label="Thứ tự">
                                                    <Input type="number" placeholder="0" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Divider style={{ margin: '12px 0' }} orientation="left">
                                            <Text type="secondary" style={{ fontSize: '12px' }}>KHỐI NỘI DUNG</Text>
                                        </Divider>

                                        <Form.List name={[name, 'contentBlocks']}>
                                            {(contentFields, { add: addContent, remove: removeContent }) => (
                                                <>
                                                    {contentFields.map((contentField, index) => (
                                                        <div key={contentField.key} style={{ display: 'flex', gap: '8px', marginBottom: 16, alignItems: 'flex-start' }}>
                                                            <div style={{ flex: 1 }}>
                                                                <Form.Item {...contentField} noStyle>
                                                                    <RichTextEditor placeholder="Nhập nội dung HTML..." />
                                                                </Form.Item>
                                                            </div>
                                                            <Button
                                                                type="text"
                                                                danger
                                                                icon={<DeleteOutlined />}
                                                                onClick={() => removeContent(contentField.name)}
                                                                style={{ marginTop: '8px' }}
                                                            />
                                                        </div>
                                                    ))}
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => addContent()}
                                                        block
                                                        icon={<PlusOutlined />}
                                                        style={{ borderRadius: '6px' }}
                                                    >
                                                        Thêm dòng nội dung
                                                    </Button>
                                                </>
                                            )}
                                        </Form.List>
                                    </Card>
                                ))}
                                <Button
                                    type="primary"
                                    ghost
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                    style={{ borderRadius: '8px', height: '45px', borderStyle: 'dashed' }}
                                >
                                    Thêm Section mới
                                </Button>
                            </>
                        )}
                    </Form.List>
                </Card>

                <Card
                    title={<Space><LinkOutlined /> Nút kêu gọi hành động (CTA Links)</Space>}
                    style={{ marginBottom: 24, borderRadius: '12px' }}
                >
                    <Form.List name="ctaLinks">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key} style={{
                                        padding: '16px',
                                        border: '1px solid #f0f0f0',
                                        borderRadius: '8px',
                                        marginBottom: 12,
                                        position: 'relative'
                                    }}>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item {...restField} name={[name, 'label']} label="Tên nút" rules={[{ required: true }]}>
                                                    <Input placeholder="VGEN" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item {...restField} name={[name, 'url']} label="Đường dẫn">
                                                    <Input placeholder="#" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item {...restField} name={[name, 'icon']} label="Icon">
                                                    <Input placeholder="◈" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item {...restField} name={[name, 'order']} label="Thứ tự">
                                                    <Input type="number" placeholder="0" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Button
                                                    type="text"
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    onClick={() => remove(name)}
                                                    style={{ marginTop: '8px' }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                                <Button
                                    type="primary"
                                    ghost
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                    style={{ borderRadius: '8px', height: '40px', borderStyle: 'dashed' }}
                                >
                                    Thêm CTA mới
                                </Button>
                            </>
                        )}
                    </Form.List>
                </Card>

                <div style={{ textAlign: 'right', marginBottom: '50px' }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        icon={<SaveOutlined />}
                        loading={loading}
                        style={{ height: '54px', padding: '0 50px', borderRadius: '12px', fontSize: '18px' }}
                    >
                        Lưu toàn bộ thay đổi
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AdminTOS;
