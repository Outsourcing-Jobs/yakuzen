import React, { useEffect, useState } from 'react';
import { 
  Table, Button, Space, Modal, Form, Input, 
  InputNumber, Select, Upload, message, 
  Popconfirm, Image, Card, Typography, 
  Tag, Divider, Row, Col, List 
} from 'antd';
import { 
  PlusOutlined, EditOutlined, DeleteOutlined, 
  UploadOutlined, ShoppingCartOutlined, 
  OrderedListOutlined, PictureOutlined 
} from '@ant-design/icons';
import axios from '../../utils/axios';
import SafeImage from '../../components/Default/SafeImage';

const { Title, Text } = Typography;

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [imageOrders, setImageOrders] = useState([]); // [{ public_id, order }]
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/products');
      setProducts(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFileList([]);
    setImageOrders([]);
    form.resetFields();
    form.setFieldsValue({ order: 0 }); // Mặc định order là 0
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    form.setFieldsValue({
      ...product,
      category: product.category?._id || product.category,
    });
    
    // Hiển thị ảnh cũ trong Upload component (chỉ dùng để xem/xóa)
    const existingImages = (product.images || []).map((img, idx) => ({
      uid: img.public_id || idx,
      name: `image-${idx}`,
      status: 'done',
      url: img.url,
      public_id: img.public_id,
      order: img.order || 0
    }));
    setFileList([]); // Reset fileList cho upload mới
    
    // Lưu thứ tự ảnh hiện tại để chỉnh sửa
    setImageOrders(existingImages.map(img => ({ 
      public_id: img.public_id, 
      order: img.order,
      url: img.url 
    })));
    
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      message.success('Đã xóa sản phẩm');
      fetchProducts();
    } catch (error) {
      message.error('Xóa thất bại');
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingProduct) {
        // Cập nhật thông tin chi tiết và thứ tự ảnh
        await axios.put(`/products/${editingProduct._id}`, {
          ...values,
          imageOrders: imageOrders.map(({ public_id, order }) => ({ public_id, order }))
        });

        // Nếu có upload ảnh mới
        if (fileList.length > 0) {
           const formData = new FormData();
           fileList.forEach((file) => {
             if (file.originFileObj) {
               formData.append('images', file.originFileObj);
             }
           });
           // Backend update hiện chưa handle gộp chung, ta gợi ý user upload riêng hoặc xử lý gộp
           await axios.put(`/products/${editingProduct._id}`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
           });
        }

        message.success('Cập nhật thành công');
      } else {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          formData.append(key, values[key]);
        });
        
        fileList.forEach((file) => {
          if (file.originFileObj) {
            formData.append('images', file.originFileObj);
          }
        });

        await axios.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        message.success('Thêm mới thành công');
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
      message.error('Có lỗi xảy ra khi lưu');
    }
  };

  const handleImageOrderChange = (public_id, newOrder) => {
    setImageOrders(prev => prev.map(img => 
      img.public_id === public_id ? { ...img, order: newOrder } : img
    ).sort((a, b) => a.order - b.order));
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'order',
      key: 'order',
      width: 80,
      render: (order) => <Tag color="blue">{order}</Tag>,
      sorter: (a, b) => a.order - b.order,
    },
    {
      title: 'Ảnh',
      dataIndex: 'images',
      key: 'images',
      width: 100,
      render: (images) => (
        <Space>
          {images && images.length > 0 ? (
            <SafeImage 
              src={images[0].url} 
              style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid #f0f0f0' }} 
            />
          ) : (
            <div style={{ width: 60, height: 60, background: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PictureOutlined style={{ color: '#ccc' }} />
            </div>
          )}
        </Space>
      ),
    },
    { 
      title: 'Tên sản phẩm', 
      dataIndex: 'name', 
      key: 'name',
      render: (text) => <Text strong>{text}</Text>
    },
    { 
      title: 'Giá', 
      dataIndex: 'price', 
      key: 'price', 
      render: (price) => <Text style={{ color: '#f5222d' }}>{price}</Text> 
    },
    { 
      title: 'Danh mục', 
      dataIndex: 'category', 
      key: 'category', 
      render: (cat) => <Tag color="green">{cat?.name || 'Chưa lọc'}</Tag> 
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
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '16px',
          border: 'none'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={2} style={{ color: 'white', margin: 0 }}>
              <ShoppingCartOutlined /> Quản lý Sản phẩm
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
              Danh sách và cấu hình thứ tự hiển thị của các sản phẩm thảo dược Yakuzen
            </Text>
          </div>
          <Button 
            type="primary" 
            size="large"
            icon={<PlusOutlined />} 
            onClick={handleAdd}
            style={{ 
              background: 'white', 
              color: '#059669', 
              border: 'none',
              fontWeight: 'bold',
              height: 'auto',
              padding: '10px 24px',
              borderRadius: '10px'
            }}
          >
            Thêm Sản phẩm
          </Button>
        </div>
      </Card>

      <Table 
        columns={columns} 
        dataSource={products} 
        rowKey="_id" 
        loading={loading}
        pagination={{ pageSize: 10 }}
        style={{ background: 'white', borderRadius: '16px', overflow: 'hidden' }}
      />

      <Modal
        title={
          <Space>
            <OrderedListOutlined />
            <span>{editingProduct ? 'Chỉnh sửa Sản phẩm' : 'Thêm Sản phẩm mới'}</span>
          </Space>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        width={900}
        okText="Lưu thay đổi"
        cancelText="Hủy bỏ"
        centered
        bodyStyle={{ paddingTop: '20px' }}
      >
        <Form form={form} layout="vertical">
          <Row gutter={24}>
            <Col span={16}>
              <Form.Item name="name" label={<Text strong>Tên sản phẩm</Text>} rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
                <Input size="large" placeholder="Nhập tên sản phẩm..." />
              </Form.Item>
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="price" label={<Text strong>Giá bán (USD Text)</Text>} rules={[{ required: true, message: 'Vui lòng nhập giá' }]}>
                    <Input 
                      size="large"
                      placeholder="VD: 50.00 hoặc $50.00 hoặc Liên hệ"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="category" label={<Text strong>Danh mục</Text>} rules={[{ required: true }]}>
                    <Select size="large" style={{ width: '100%' }} placeholder="Chọn danh mục">
                      {categories.map(cat => (
                        <Select.Option key={cat._id} value={cat._id}>{cat.name}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="description" label={<Text strong>Mô tả chi tiết</Text>}>
                <Input.TextArea rows={4} placeholder="Mô tả về công dụng, thành phần..." />
              </Form.Item>
            </Col>
            
            <Col span={8}>
              <Form.Item name="order" label={<Text strong>Thứ tự hiển thị (Sản phẩm)</Text>}>
                <InputNumber size="large" style={{ width: '100%' }} min={0} />
              </Form.Item>

              <Divider orientation="left"><Text type="secondary" style={{ fontSize: '12px' }}>HÌNH ẢNH MỚI</Text></Divider>
              <Form.Item label={null}>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                  beforeUpload={() => false}
                  multiple
                >
                  {fileList.length >= 8 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Tải ảnh</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          {editingProduct && imageOrders.length > 0 && (
            <>
              <Divider orientation="left"><Text strong><PictureOutlined /> QUẢN LÝ THỨ TỰ ẢNH HIỆN TẠI</Text></Divider>
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={imageOrders}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      cover={
                        <SafeImage
                          alt="product"
                          src={item.url}
                          style={{ height: 120, objectFit: 'cover' }}
                        />
                      }
                      bodyStyle={{ padding: '12px' }}
                    >
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Text size="small" type="secondary">Thứ tự:</Text>
                        <InputNumber 
                          min={0} 
                          value={item.order} 
                          onChange={(val) => handleImageOrderChange(item.public_id, val)} 
                          style={{ width: '100%' }}
                        />
                      </Space>
                    </Card>
                  </List.Item>
                )}
              />
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProduct;
