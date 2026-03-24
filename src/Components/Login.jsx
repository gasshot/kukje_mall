import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../api/http';

function Login({ setIsLoggedIn, setMessage, message }) {
  const [formData, setFormData] = useState({ id: '', pw: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await http.post('/login', formData);
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        setIsLoggedIn(true);
        setMessage(`${response.user.name}님, 환영합니다!`);
        navigate('/'); // 로그인 성공 시 메인 탭으로 이동
      }
    } catch (error) {
      setMessage(error.response?.data?.message || '로그인 실패');
    }
  };

  return (
    <div className="login-card">
      <h1>Kukje Mall Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input type="text" name="id" placeholder="아이디" onChange={handleChange} required />
        <input type="password" name="pw" placeholder="비밀번호" onChange={handleChange} required />
        <button type="submit" className="login-btn">로그인</button>
      </form>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
}

export default Login;