import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../../api/http';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import KukjeLogo from '../Common/KukjeLogo';
import useAuthStore from '../../store/useAuthStore'; // 1. 스토어 임포트
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({ id: '', pw: '' });
  const [localMessage, setLocalMessage] = useState(''); // 내부 에러 메시지용
  const navigate = useNavigate();

  // 2. Zustand 스토어에서 login 액션 가져오기
  const login = useAuthStore((state) => state.login);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLocalMessage(''); // 시도 전 메시지 초기화

    try {
      const response = await http.post('/login', formData);

      // 서버 응답 구조에 맞춰 조건 확인 (예: response.accessToken)
      if (response.accessToken) {
        // 3. Zustand의 login 액션 실행 (이름과 토큰 저장)
        // 서버에서 사용자 이름을 안 준다면 우선 아이디를 넘겨도 됩니다.
        login(response.user?.name || formData.id, response.accessToken);

        navigate('/');
      }
    } catch (error) {
      // axios 에러 객체에서 서버가 보내준 에러 메시지 추출
      const errorMessage = error.response?.data?.message || '아이디 또는 비밀번호가 일치하지 않습니다.';
      setLocalMessage(errorMessage);
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleFindInfoClick = () => {
    alert('아이디/비밀번호 찾기 페이지로 이동합니다.');
  };

  return (
    <div className="login-page-container container">
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

        {/* 에러 메시지 출력 */}
        {localMessage && <p className="login-error-msg">{localMessage}</p>}
      </div>

      <footer className="login-simple-footer">
        ©Kukjemall Corp. All rights reserved.
      </footer>
    </div>
  );
}

export default Login;