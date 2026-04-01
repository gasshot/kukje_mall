import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSearch, BsCart3 } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import KukjeLogo from '../Common/KukjeLogo'; 
import useAuthStore from '../../store/useAuthStore'; // Zustand 스토어 임포트
import './KukjeHeader.css';

function KukjeHeader({ onSearch }) { // props에서 isLoggedIn 제거
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Zustand 스토어에서 상태와 로그아웃 함수 가져오기
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);

  // 검색 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
    console.log("Kukjemall 검색:", searchTerm);
  };

  // 유저 아이콘 클릭 핸들러
  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    }
  };

  // 로그아웃 클릭 핸들러
  const handleLogoutClick = () => {
    logout(); // Zustand 스토어의 로그아웃 실행 (localStorage 삭제 + 상태 변경)
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <header className="k-header-wrapper">
      <div className='k-header-upper-area'>
        <div className='k-header-upper-menu'>
          {isLoggedIn ? (
            <>
              {/* 실제 저장된 이름이 있다면 표시 */}
              <span className="user-name-text">{userName || '회원'}님</span>
              <span onClick={handleLogoutClick} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                로그아웃
              </span>
            </>
          ) : (
            <>
              <span onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>로그인</span>
              <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', marginLeft: '10px' }}>회원가입</span>
            </>
          )}
        </div>
      </div>

      <div className="k-header-container">
        {/* 1. 로고 영역 */}
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <KukjeLogo size="large" />
        </div>

        {/* 2. 검색창 */}
        <form onSubmit={handleSearch} className="k-search-form">
          <input
            type="text"
            className="k-search-input"
            placeholder="상품을 검색해보세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="k-search-btn">
            <BsSearch size="1.4em" />
          </button>
        </form>

        {/* 3. 유저/카트 아이콘 */}
        <div className="k-icon-menu">
          <button className="k-icon-item" onClick={handleUserClick} aria-label="User Profile">
            <BiUser size="1.8em" />
          </button>
          <button className="k-icon-item" onClick={() => navigate('/cart')} aria-label="Shopping Cart">
            <BsCart3 size="1.8em" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default KukjeHeader;