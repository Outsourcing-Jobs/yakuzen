import React, { useEffect, useState } from 'react';
import { 
  Table, Button, Space, Modal, Form, Input, 
  message, Popconfirm, Card, Typography, 
  Tag, Divider 
} from 'antd';
import { 
  PlusOutlined, EditOutlined, DeleteOutlined, 
  AppstoreOutlined, ContainerOutlined 
} from '@ant-design/icons';
import axios from '../../utils/axios';

const { Title, Text } = Typography;

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/categories');
      setCategories(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách danh mục');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/categories/${id}`);
      message.success('Đã xóa danh mục');
      fetchCategories();
    } catch (error) {
      message.error('Xóa thất bại');
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        await axios.put(`/categories/${editingCategory._id}`, values);
        message.success('Cập nhật thành công');
      } else {
        await axios.post('/categories', values);
        message.success('Thêm mới thành công');
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      message.error('Có lỗi xảy ra khi lưu');
    }
  };

  const columns = [
    { 
      title: 'Tên danh mục', 
      dataIndex: 'name', 
      key: 'name',
      render: (text) => <Text strong style={{ fontSize: '15px' }}>{text}</Text>
    },
    { 
      title: 'Slug', 
      dataIndex: 'slug', 
      key: 'slug',
      render: (slug) => <Tag color="orange" style={{ borderRadius: '4px' }}>{slug}</Tag>
    },
    { 
      title: 'Mô tả', 
      dataIndex: 'description', 
      key: 'description',
      ellipsis: true,
      render: (desc) => <Text type="secondary">{desc || 'Không có mô tả'}</Text>
    },
    {
      title: 'Hành động',
      key: 'action',
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
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => handleDelete(record._id)} okText="Xóa" cancelText="Hủy">
            <Button icon={<DeleteOutlined />} danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '0px' }}>
      <Card 
        style={{ 
          marginBottom: 24, 
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          borderRadius: '16px',
          border: 'none'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={2} style={{ color: 'white', margin: 0 }}>
              <AppstoreOutlined /> Quản lý Danh mục
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
              Tổ chức các sản phẩm theo nhóm để khách hàng dễ dàng tìm kiếm
            </Text>
          </div>
          <Button 
            type="primary" 
            size="large"
            icon={<PlusOutlined />} 
            onClick={handleAdd}
            style={{ 
              background: 'white', 
              color: '#1d4ed8', 
              border: 'none',
              fontWeight: 'bold',
              height: 'auto',
              padding: '10px 24px',
              borderRadius: '10px'
            }}
          >
            Thêm Danh mục
          </Button>
        </div>
      </Card>

      <Table 
        columns={columns} 
        dataSource={categories} 
        rowKey="_id" 
        loading={loading}
        pagination={{ pageSize: 10 }}
        style={{ background: 'white', borderRadius: '16px', overflow: 'hidden' }}
      />

      <Modal
        title={
          <Space>
            <ContainerOutlined />
            <span>{editingCategory ? 'Chỉnh sửa Danh mục' : 'Thêm Danh mục mới'}</span>
          </Space>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        width={500}
        okText="Lưu thay đổi"
        cancelText="Hủy bỏ"
        centered
      >
        <Form form={form} layout="vertical" style={{ paddingTop: '20px' }}>
          <Form.Item 
            name="name" 
            label={<Text strong>Tên danh mục</Text>} 
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
          >
            <Input size="large" placeholder="Ví dụ: Trà thảo mộc, Nhân sâm..." />
          </Form.Item>
          
          <Form.Item name="description" label={<Text strong>Mô tả</Text>}>
            <Input.TextArea rows={4} placeholder="Mô tả ngắn gọn về danh mục này..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminCategory;
