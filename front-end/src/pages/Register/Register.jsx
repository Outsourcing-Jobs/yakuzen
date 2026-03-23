import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Input, Button, Typography, Space, Divider } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, RocketOutlined } from '@ant-design/icons';
import axios from '../../utils/axios';
import logo from '../../assets/vite.svg';
import './Register.css';

const { Title, Text } = Typography;

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const { username, identifier, password } = values;
            const isEmail = identifier.includes('@');
            const data = {
                email: isEmail ? identifier : undefined,
                phone: !isEmail ? identifier : undefined,
                password,
                name: username
            };

            const response = await axios.post('/auth/register', data);

            if (response.status === 201) {
                toast.success('Joined the Artist Alliance successfully! Time to create your first masterpiece.');
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (error) {
            console.error('Register error:', error);
            const message = error.response?.data?.message || 'Registration failed. The studio is busy, please try again later.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <Title level={1} style={{ color: 'white', marginBottom: '24px', fontSize: '3.5rem', letterSpacing: '2px' }}>
                        ARTVERSE
                    </Title>
                    <Title level={2} style={{ color: 'white', fontWeight: 400, marginTop: 0 }}>
                        Awaken Your Inner Artist
                    </Title>
                    <div className="hero-features">
                        <div className="feature-chip">✨ Personal Art Exhibition</div>
                        <div className="feature-chip">🎨 Massive Anime Asset Library</div>
                        <div className="feature-chip">🤝 Digital Art Community</div>
                    </div>
                </div>
            </div>

            <div className="register-form-side">
                <div className="register-card-v2">
                    <div className="register-logo-v2">
                        <img src='https://toladich.carrd.co/assets/images/image01.gif?v=e46ef6f7' alt="ArtVerse Logo" />
                        <Title level={3} style={{ margin: '16px 0 8px' }}>Join the Studio</Title>
                        <Text type="secondary">Create your art profile and start sharing your passion</Text>
                    </div>

                    <Form
                        name="register_form"
                        layout="vertical"
                        onFinish={onFinish}
                        requiredMark={false}
                        size="large"
                        style={{ marginTop: '32px' }}
                    >
                        <Form.Item
                            name="username"
                            label={<Text strong>Artist Name / Alias</Text>}
                            rules={[{ required: true, message: 'The studio needs to know your name!' }]}
                        >
                            <Input
                                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="e.g., Murata_Sensei"
                                style={{ borderRadius: '10px' }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="identifier"
                            label={<Text strong>Contact Email</Text>}
                            rules={[{ required: true, message: 'Please enter your contact address!' }]}
                        >
                            <Input
                                prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="artist@artverse.com"
                                style={{ borderRadius: '10px' }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label={<Text strong>Secure Password</Text>}
                            rules={[
                                { required: true, message: 'Password protects your precious artworks!' },
                                { min: 6, message: 'Minimum length is 6 characters!' }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Enter at least 6 characters"
                                style={{ borderRadius: '10px' }}
                            />
                        </Form.Item>

                        <Text type="secondary" style={{ fontSize: '13px', display: 'block', marginBottom: '20px' }}>
                            By registering, you agree to our <Link to="/tos" style={{ color: '#6366f1' }}>Community Guidelines</Link> and Art Copyright Policy.
                        </Text>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                block
                                icon={<RocketOutlined />}
                                style={{
                                    height: '50px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
                                    border: 'none',
                                    fontSize: '16px',
                                    fontWeight: 'bold'
                                }}
                            >
                                Register Now
                            </Button>
                        </Form.Item>
                    </Form>

                    <div style={{ textAlign: 'center', marginTop: '24px' }}>
                        <Text type="secondary">Already a member? </Text>
                        <Link to="/login" style={{ color: '#6366f1', fontWeight: 'bold' }}>Back to Login</Link>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        </div>
    );
};

export default Register;