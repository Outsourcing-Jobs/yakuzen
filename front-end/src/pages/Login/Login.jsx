import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import TextInput from '../../components/Icons/TextInput';
import PasswordInput from '../../components/Icons/PasswordInput';
import { useDispatch } from 'react-redux';
import logo from '../../assets/vite.svg';
// import { login } from '../../stores/Users/userApis';

const Login = ({ setIsAdmin }) => {
    const [email, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async event => {
        event.preventDefault();
        const values = { email, password };
        try {
            // await dispatch(login(values));
            toast.success('Chào mừng bạn quay trở lại!');
            const storedUser = localStorage.getItem('user');
            const parsedUser = JSON.parse(storedUser);

            if (parsedUser?.isAdmin || parsedUser?.role === 'admin') {
                setIsAdmin(true);
                setTimeout(() => navigate('/admin'), 100);
            } else {
                setIsAdmin(false);
                navigate('/');
            }
        } catch (error) {
            toast.error('Email hoặc mật khẩu không đúng');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-side-image">
                <div className="side-content">
                    <h1>Kết nối & Vận hành Logistics</h1>
                    <p>
                        Hệ thống quản lý thông minh giúp theo dõi lô hàng, tối ưu hóa quy trình vận chuyển và nâng cao
                        hiệu quả hoạt động logistics mỗi ngày.
                    </p>
                </div>
            </div>

            <div className="login-side-form">
                <div className="login-card">
                    <div className="brand-logo">
                        <img src={logo} alt="Logo" />
                    </div>

                    <div className="login-header">
                        <h2>Đăng nhập</h2>
                    </div>

                    <form onSubmit={handleLogin} className="form-wrapper">
                        <TextInput
                            label="Email hoặc Số điện thoại"
                            placeholder="name@company.com"
                            className="custom-light-input"
                            value={email}
                            onChange={e => setIdentifier(e.target.value)}
                        />
                        <PasswordInput
                            className="custom-light-input"
                            label="Mật khẩu"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" /> Ghi nhớ đăng nhập
                            </label>
                            <Link to="/forgot-password">Quên mật khẩu?</Link>
                        </div>

                        <button type="submit" className="btn-primary">
                            Đăng nhập ngay
                        </button>
                    </form>

                    <div className="footer-link">
                        Chưa có tài khoản? <Link to="/signup">Đăng ký miễn phí</Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
