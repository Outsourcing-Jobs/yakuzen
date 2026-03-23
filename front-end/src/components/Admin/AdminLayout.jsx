import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Space, Typography, Button } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { useNavigate, Outlet, useLocation, Link } from 'react-router-dom';
import './AdminLayout.css';

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const menuItems = [
    { label: 'Dashboard', key: '/admin-dashboard', icon: <PieChartOutlined /> },
    { label: 'Sản phẩm', key: '/admin-dashboard/products', icon: <ShoppingOutlined /> },
    { label: 'Danh mục', key: '/admin-dashboard/categories', icon: <DesktopOutlined /> },
    { label: 'Người dùng', key: '/admin-dashboard/users', icon: <TeamOutlined /> },
    { label: 'Cài đặt TOS', key: '/admin-dashboard/tos', icon: <FileOutlined /> },
  ];

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const userMenu = [
    {
      key: 'profile',
      label: 'Trang cá nhân',
      icon: <UserOutlined />,
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  const getBreadcrumbs = () => {
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    return pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const label = pathSnippets[index].charAt(0).toUpperCase() + pathSnippets[index].slice(1);
      return { title: label, href: url };
    });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        className="admin-sider"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={260}
      >
        <div className="admin-logo-section">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <GlobalOutlined style={{ fontSize: '24px', color: '#fbbf24' }} />
            {!collapsed && <span className="admin-logo-text" style={{ color: 'white' }}>YAKUZEN</span>}
          </Link>
        </div>

        <Menu
          className="admin-menu"
          theme="dark"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>

      <Layout className="site-layout">
        <Header className="admin-header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />

          <Space size="large">
            <Button type="text" icon={<BellOutlined />} style={{ fontSize: '18px' }} />
            <Dropdown menu={{ items: userMenu }} placement="bottomRight" arrow>
              <div className="admin-user-profile">
                <Avatar style={{ backgroundColor: '#10b981' }} icon={<UserOutlined />} />
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
                  <Text strong style={{ fontSize: '14px' }}>{user.name || 'Admin'}</Text>
                  <Text type="secondary" style={{ fontSize: '12px' }}>Quản trị viên</Text>
                </div>
              </div>
            </Dropdown>
          </Space>
        </Header>

        <Content className="admin-content">
          <div className="breadcrumb-container">
            <Breadcrumb items={getBreadcrumbs()} />
          </div>
          <div style={{
            background: 'white',
            padding: '32px',
            borderRadius: '16px',
            minHeight: '400px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            <Outlet />
          </div>
        </Content>

        <Footer className="admin-footer">
          Yakuzen Premium Admin Portal ©2026 - Tinh hoa thảo dược Việt
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
