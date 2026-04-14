import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Input, Button, Typography, Space, Checkbox } from 'antd';
import { MailOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import axios from '../../utils/axios';
import logo from '../../assets/vite.svg';
import SafeImage from '../../components/Default/SafeImage';
import './Login.css';

const { Title, Text } = Typography;

const Login = ({ setIsAdmin }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('/auth/login', values);
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            toast.success('Welcome back to the studio, Artist!');

            if (user?.role === 'admin') {
                setIsAdmin(true);
                setTimeout(() => navigate('/admin-dashboard'), 100);
            } else {
                setIsAdmin(false);
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error);
            const message = error.response?.data?.message || 'Invalid login credentials';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <Title level={1} style={{ color: 'white', marginBottom: '24px', fontSize: '3.5rem', letterSpacing: '2px' }}>
                        ARTVERSE
                    </Title>
                    <Title level={2} style={{ color: 'white', fontWeight: 400, marginTop: 0 }}>
                        Where every stroke touches the soul
                    </Title>
                    <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', maxWidth: '500px', display: 'block' }}>
                        A community for sharing Anime, Manga, and Digital Art. Create together and connect with millions of artists worldwide.
                    </Text>
                </div>
            </div>

            <div className="login-form-side">
                <div className="login-card-v2">
                    <div className="login-logo-v2">
                        <SafeImage src='https://toladich.carrd.co/assets/images/image01.gif?v=e46ef6f7' alt="ArtVerse Logo" />
                        <Title level={3} style={{ margin: '16px 0 8px' }}>Welcome Back!</Title>
                        <Text type="secondary">Continue your creative journey</Text>
                    </div>

                    <Form
                        name="login_form"
                        layout="vertical"
                        onFinish={onFinish}
                        requiredMark={false}
                        size="large"
                        style={{ marginTop: '32px' }}
                    >
                        <Form.Item
                            name="email"
                            label={<Text strong>Email or Artist Name</Text>}
                            rules={[{ required: true, message: 'Please enter your unique identifier!' }]}
                        >
                            <Input
                                prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="artist@artverse.com"
                                style={{ borderRadius: '10px' }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label={<Text strong>Password</Text>}
                            rules={[{ required: true, message: 'Password is the key to your studio!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Enter your secret password"
                                style={{ borderRadius: '10px' }}
                            />
                        </Form.Item>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <Checkbox>Remember me</Checkbox>
                            <Link to="/forgot-password" style={{ color: '#6366f1' }}>Forgot password?</Link>
                        </div>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                block
                                icon={<ArrowRightOutlined />}
                                style={{
                                    height: '50px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
                                    border: 'none',
                                    fontSize: '16px',
                                    fontWeight: 'bold'
                                }}
                            >
                                Enter Studio
                            </Button>
                        </Form.Item>
                    </Form>

                    <div style={{ textAlign: 'center', marginTop: '24px' }}>
                        <Text type="secondary">New artist? </Text>
                        <Link to="/signup" style={{ color: '#6366f1', fontWeight: 'bold' }}>Join the community</Link>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        </div>
    );
};

export default Login;