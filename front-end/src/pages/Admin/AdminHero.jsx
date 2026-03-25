import React, { useEffect, useState } from 'react';
import {
  Form, Input, Button, Upload, message,
  Card, Typography, Space, Divider, Row, Col, List
} from 'antd';
import {
  PlusOutlined, DeleteOutlined, SaveOutlined
} from '@ant-design/icons';
import axios from '../../utils/axios';

const { Title, Text } = Typography;

const AdminHero = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [heroData, setHeroData] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/hero');
      setHeroData(response.data);
      form.setFieldsValue({
        title: response.data.title,
        bio: response.data.bio,
        socialLinks: response.data.socialLinks
      });
      if (response.data.avatar?.url) {
        setFileList([{
          uid: '-1',
          name: 'avatar.png',
          status: 'done',
          url: response.data.avatar.url,
        }]);
      }
    } catch (error) {
      if (error.response?.status !== 404) {
        message.error('Không thể tải dữ liệu Hero');
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('bio', values.bio);
      formData.append('socialLinks', JSON.stringify(values.socialLinks || []));

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('avatar', fileList[0].originFileObj);
      } else if (heroData?.avatar) {
        // Keep existing avatar if no new file is uploaded
        formData.append('avatar', JSON.stringify(heroData.avatar));
      }

      await axios.put('/hero', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      message.success('Cập nhật Hero thành công');
      fetchHeroData();
    } catch (error) {
      console.error(error);
      message.error('Có lỗi xảy ra khi lưu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '0px' }}>
      <Card
        style={{
          marginBottom: 24,
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '16px',
          border: 'none'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={2} style={{ color: 'white', margin: 0 }}>
              <DeleteOutlined /> Quản lý Hero Section
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
              Cấu hình ảnh đại diện, tiểu sử và các liên kết mạng xã hội hiển thị tại trang chủ
            </Text>
          </div>
        </div>
      </Card>

      <Row gutter={24}>
        <Col xs={24} lg={16}>
          <Card title="Thông tin cơ bản" style={{ borderRadius: '16px' }}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item name="title" label={<Text strong>Tiêu đề / Vai trò</Text>} rules={[{ required: true }]}>
                <Input size="large" placeholder="VD: DICH ✦ DIGITAL ARTIST" />
              </Form.Item>

              <Form.Item name="bio" label={<Text strong>Tiểu sử ngắn</Text>} rules={[{ required: true }]}>
                <Input.TextArea rows={4} placeholder="VD: Hi, I'm Yakuzen (Dich), nice to work with you" />
              </Form.Item>

              <Divider orientation="left"><Text strong>Liên kết mạng xã hội</Text></Divider>

              <Form.List name="socialLinks">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'icon']}
                          rules={[{ required: true, message: 'Thiếu icon' }]}
                        >
                          <Input placeholder="Icon (VD: 𝕏)" style={{ width: 100 }} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'label']}
                          rules={[{ required: true, message: 'Thiếu nhãn' }]}
                        >
                          <Input placeholder="Nhãn (VD: Twitter)" style={{ width: 150 }} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'href']}
                          rules={[{ required: true, message: 'Thiếu link' }]}
                        >
                          <Input placeholder="https://..." style={{ width: 250 }} />
                        </Form.Item>
                        <Button type="text" danger onClick={() => remove(name)} icon={<DeleteOutlined />} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Thêm liên kết
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.Item>
                <Button type="primary" size="large" htmlType="submit" loading={loading} icon={<SaveOutlined />} block>
                  LƯU THAY ĐỔI
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Ảnh đại diện (Avatar)" style={{ borderRadius: '16px', textAlign: 'center' }}>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList.slice(-1))} // Only one file
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
            <Divider />
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Nên sử dụng ảnh GIF hoặc PNG có nền trong suốt cho hiệu ứng tốt nhất.
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminHero;
