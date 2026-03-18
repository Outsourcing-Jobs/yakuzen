import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';
import TextInput from '../../components/Icons/TextInput';
import PasswordInput from '../../components/Icons/PasswordInput';
import logo from '../../assets/vite.svg';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async e => {
        e.preventDefault();
        setLoading(true);

        try {
            const values = { username, identifier, password };
            // Giả lập gọi API đăng ký
            const success = true;
            if (success) {
                toast.success('Đăng ký tài khoản thành công!');
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (error) {
            toast.error('Đăng ký thất bại, vui lòng kiểm tra lại thông tin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reg-page-wrapper">
            <div className="reg-side-banner">
                <div className="banner-text">
                    <h2>Giải pháp Logistics toàn diện</h2>
                    <p>
                        Chúng tôi cung cấp các giải pháp vận chuyển và quản lý chuỗi cung ứng hiện đại, giúp doanh
                        nghiệp tối ưu chi phí, thời gian và hiệu quả vận hành.
                    </p>

                    <div className="banner-features">
                        <div className="feature-item">✓ Theo dõi lô hàng theo thời gian thực</div>
                        <div className="feature-item">✓ Mạng lưới vận chuyển toàn cầu</div>
                        <div className="feature-item">✓ Hỗ trợ khách hàng và tư vấn 24/7</div>
                    </div>
                </div>
            </div>

            {/* Cột bên phải: Form đăng ký */}
            <div className="reg-form-container">
                <div className="reg-card">
                    <div className="reg-logo-area">
                        <img src={logo} alt="Logo" />
                    </div>

                    <form onSubmit={handleSignup} className="reg-form">
                        <TextInput
                            label="Tên người dùng"
                            placeholder="Ví dụ: nva123"
                            className="custom-light-input"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />

                        <TextInput
                            label="Email hoặc Số điện thoại"
                            placeholder="name@example.com"
                            className="custom-light-input"
                            value={identifier}
                            onChange={e => setIdentifier(e.target.value)}
                        />

                        <PasswordInput
                            label="Mật khẩu"
                            className="custom-light-input"
                            placeholder="Tối thiểu 6 ký tự"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <div className="reg-terms">
                            Bằng cách đăng ký, bạn đồng ý với <span>Điều khoản dịch vụ</span> của chúng tôi.
                        </div>

                        <button type="submit" className="reg-btn-submit" disabled={loading}>
                            {loading ? 'Đang xử lý...' : 'Đăng ký ngay'}
                        </button>
                    </form>

                    <div className="reg-footer">
                        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Register;
