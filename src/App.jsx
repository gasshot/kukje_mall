import { useState } from 'react';
import http from './api/http';
import './App.css'; // CSS 파일 임포트

function App() {
  const [formData, setFormData] = useState({ id: '', pw: '' });
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

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
        setMessage(`반갑습니다, ${response.user.name}님!`);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || '로그인 실패');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    setMessage('');
  };

  if (isLoggedIn) {
    return (
      <div className="welcome-box">
        <h2>국제몰 관리자 페이지</h2>
        <p>{message}</p>
        <button onClick={handleLogout} className="logout-btn">로그아웃</button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Kukje Mall</h1>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            name="id"
            placeholder="아이디"
            value={formData.id}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="pw"
            placeholder="비밀번호"
            value={formData.pw}
            onChange={handleChange}
            required
          />
          <button type="submit">로그인</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default App;