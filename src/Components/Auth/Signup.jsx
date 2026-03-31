import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlinePhone } from 'react-icons/hi';
// 1. 공통 로고 컴포넌트 임포트
import KukjeLogo from '../Common/KukjeLogo'; 
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: ''
  });

  // 약관 동의 상태 관리
  const [agreements, setAgreements] = useState({
    age: false,
    terms: false,
    finance: false,
    privacy: false,
    marketing: false
  });

  const [allAgreed, setAllAgreed] = useState(false);

  // 1. 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 2. 전체 동의 핸들러
  const handleAllAgreeChange = (e) => {
    const checked = e.target.checked;
    setAllAgreed(checked);
    setAgreements({
      age: checked,
      terms: checked,
      finance: checked,
      privacy: checked,
      marketing: checked
    });
  };

  // 3. 개별 동의 핸들러
  const handleIndividualAgreeChange = (name) => {
    setAgreements(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // 4. 회원가입 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { age, terms, finance, privacy } = agreements;
    if (!age || !terms || !finance || !privacy) {
      alert("필수 약관에 모두 동의해주세요.");
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("회원가입 시도:", formData);
    // http.post('/signup', formData) 로직 추가 지점
  };

  // 개별 동의 변경 시 전체 동의 상태 업데이트
  useEffect(() => {
    const allChecked = Object.values(agreements).every(val => val === true);
    setAllAgreed(allChecked);
  }, [agreements]);

  return (
    <div className="signup-page-container container">
      {/* 2. 기존 로고 HTML을 공통 컴포넌트로 대체 */}
      <KukjeLogo size="large" />

      <div className="signup-card-panel">
        <h2 className="signup-title">회원정보를 입력해주세요</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-box-group">
            <div className="input-row">
              <div className="input-icon"><HiOutlineMail size="22" /></div>
              <input 
                type="email" 
                name="email" 
                placeholder="아이디(이메일)" 
                value={formData.email}
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="input-row">
              <div className="input-icon"><HiOutlineLockClosed size="22" /></div>
              <input 
                type="password" 
                name="password" 
                placeholder="비밀번호" 
                value={formData.password}
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="input-row">
              <div className="input-icon"><HiOutlineLockClosed size="22" /></div>
              <input 
                type="password" 
                name="passwordConfirm" 
                placeholder="비밀번호 확인" 
                value={formData.passwordConfirm}
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="input-row">
              <div className="input-icon"><HiOutlineUser size="22" /></div>
              <input 
                type="text" 
                name="name" 
                placeholder="이름" 
                value={formData.name}
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="input-row">
              <div className="input-icon"><HiOutlinePhone size="22" /></div>
              <input 
                type="text" 
                name="phone" 
                placeholder="휴대폰번호" 
                value={formData.phone}
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="agreement-section">
            <label className="agree-all-label">
              <input 
                type="checkbox" 
                checked={allAgreed}
                onChange={handleAllAgreeChange}
              /> 
              <span className="bold-text">모두 확인하였으며 동의합니다.</span>
            </label>
            <p className="agree-sub-text">
              전체 동의에는 필수 및 선택 정보에 대한 동의가 포함되어 있으며, 개별적으로 동의를 선택하실 수 있습니다.
            </p>

            <div className="agree-list-container">
              {/* 개별 체크박스들도 핸들러 함수로 연결 */}
              <div className="agree-item">
                <label>
                  <input type="checkbox" checked={agreements.age} onChange={() => handleIndividualAgreeChange('age')} />
                  [필수] 만 14세 이상입니다
                </label>
              </div>
              <div className="agree-item">
                <label>
                  <input type="checkbox" checked={agreements.terms} onChange={() => handleIndividualAgreeChange('terms')} />
                  [필수] 이용약관 동의
                </label>
                <span className="arrow-icon">〉</span>
              </div>
              <div className="agree-item">
                <label>
                  <input type="checkbox" checked={agreements.finance} onChange={() => handleIndividualAgreeChange('finance')} />
                  [필수] 전자금융거래 이용약관 동의
                </label>
                <span className="arrow-icon">〉</span>
              </div>
              <div className="agree-item">
                <label>
                  <input type="checkbox" checked={agreements.privacy} onChange={() => handleIndividualAgreeChange('privacy')} />
                  [필수] 개인정보 수집 및 이용 동의
                </label>
                <span className="arrow-icon">〉</span>
              </div>
              <div className="agree-item">
                <label>
                  <input type="checkbox" checked={agreements.marketing} onChange={() => handleIndividualAgreeChange('marketing')} />
                  [선택] 마케팅 목적 개인정보 수집 동의
                </label>
                <span className="arrow-icon">〉</span>
              </div>
            </div>
          </div>

          <button type="submit" className="signup-submit-btn">
            동의하고 가입하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;