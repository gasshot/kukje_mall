import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../../api/http';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
// 1. 공통 로고 컴포넌트 임포트 (폴더 구조에 맞춰 경로 수정)
import KukjeLogo from '../Common/KukjeLogo'; 
import './Login.css';

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
        navigate('/'); 
      }
    } catch (error) {
      setMessage(error.response?.data?.message || '아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  // 기존 handleLogoClick은 KukjeLogo 컴포넌트 내부로 이동했으므로 삭제 가능합니다.

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleFindInfoClick = () => {
    alert('아이디/비밀번호 찾기 페이지로 이동합니다.');
  };

  return (
    <div className="login-page-container container">
      {/* 2. 기존 로고 HTML을 공통 컴포넌트로 대체 (큰 사이즈 적용) */}
      <KukjeLogo size="large" />

      <div className="login-card-panel">
        <div className="login-tabs">
          <div className="tab active">이메일 로그인</div>
          <div className="tab">휴대폰번호 로그인</div>
          <div className="tab">QR코드 로그인</div>
        </div>

        <form onSubmit={handleLogin} className="login-form-main">
          <div className="input-row">
            <div className="input-icon-box"><HiOutlineMail size="20" /></div>
            <input 
              type="text" 
              name="id" 
              placeholder="아이디(이메일)" 
              value={formData.id}
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-row">
            <div className="input-icon-box"><HiOutlineLockClosed size="20" /></div>
            <input 
              type="password" 
              name="pw" 
              placeholder="비밀번호" 
              value={formData.pw}
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="login-helper">
            <label className="keep-login">
              <input type="checkbox" /> 자동 로그인
            </label>
            <div className="find-info" onClick={handleFindInfoClick}>
              아이디·비밀번호 찾기 〉
            </div>
          </div>

          <button type="submit" className="btn-login-submit">로그인</button>
          
          <div className="divider"></div>

          <button 
            type="button" 
            className="btn-signup-link"
            onClick={handleSignupClick}
          >
            회원가입
          </button>
        </form>

        {message && <p className="login-error-msg">{message}</p>}
      </div>

      <footer className="login-simple-footer">
        ©Kukjemall Corp. All rights reserved.
      </footer>
    </div>
  );
}

export default Login;