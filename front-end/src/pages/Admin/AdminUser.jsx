import React, { useEffect, useState } from 'react';
import { 
  Table, Select, Button, message, Popconfirm, 
  Tag, Card, Typography, Avatar, Space, Input 
} from 'antd';
import { 
  DeleteOutlined, UserOutlined, TeamOutlined, 
  SearchOutlined, SafetyCertificateOutlined 
} from '@ant-design/icons';
import axios from '../../utils/axios';

const { Title, Text } = Typography;

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(`/users/${id}`, { role: newRole });
      message.success('Cập nhật quyền thành công');
      fetchUsers();
    } catch (error) {
      message.error('Cập nhật thất bại');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      message.success('Đã xóa người dùng');
      fetchUsers();
    } catch (error) {
      message.error('Xóa thất bại');
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { 
      title: 'Người dùng', 
      key: 'user',
      render: (_, record) => (
        <Space size="middle">
          <Avatar 
            style={{ backgroundColor: record.role === 'admin' ? '#f59e0b' : '#10b981' }} 
            icon={<UserOutlined />}
          >
            {record.name?.charAt(0).toUpperCase()}
          </Avatar>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text strong>{record.name}</Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>{record.email}</Text>
          </div>
        </Space>
      )
    },
    { 
      title: 'Liên hệ', 
      dataIndex: 'phone', 
      key: 'phone',
      render: (phone) => <Text>{phone || '—'}</Text>
    },
    {
      title: 'Quyền hạn',
      dataIndex: 'role',
      key: 'role',
      width: 180,
      render: (role, record) => (
        <Select
          value={role}
          style={{ width: '100%' }}
          onChange={(value) => handleRoleChange(record._id, value)}
          dropdownStyle={{ borderRadius: '8px' }}
        >
          <Select.Option value="user">
            <Tag color="blue" style={{ border: 'none' }}>USER</Tag>
          </Select.Option>
          <Select.Option value="admin">
            <Tag color="gold" style={{ border: 'none' }}>ADMIN</Tag>
          </Select.Option>
        </Select>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Popconfirm 
          title="Xác nhận xóa người dùng?" 
          onConfirm={() => handleDelete(record._id)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button icon={<DeleteOutlined />} danger type="text">Xóa</Button>
        </Popconfirm>
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
              <TeamOutlined /> Quản lý Người dùng
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
              Phân quyền và quản lý tài khoản thành viên trong hệ thống Yakuzen
            </Text>
          </div>
          <Input
            placeholder="Tìm theo tên hoặc email..."
            prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
            style={{ width: 300, borderRadius: '10px', height: '40px' }}
            onChange={e => setSearchText(e.target.value)}
          />
        </div>
      </Card>

      <Table 
        columns={columns} 
        dataSource={filteredUsers} 
        rowKey="_id" 
        loading={loading}
        pagination={{ pageSize: 10 }}
        style={{ background: 'white', borderRadius: '16px', overflow: 'hidden' }}
      />
    </div>
  );
};

export default AdminUser;
