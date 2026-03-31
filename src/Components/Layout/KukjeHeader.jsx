import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅
import { BsSearch, BsCart3 } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import KukjeLogo from '../Common/KukjeLogo'; 
import { PiFoldersDuotone } from 'react-icons/pi';
import './KukjeHeader.css';

function KukjeHeader({ onSearch, isLoggedIn }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // navigate 함수 초기화

  // 검색 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
    console.log("Kukjemall 검색:", searchTerm);
  };

  // 유저 아이콘 클릭 핸들러 (로그인 여부에 따른 분기)
  const handleUserClick = () => {
    if (isLoggedIn) {
      // 로그인 된 상태라면 프로필 페이지로
      navigate('/profile');
    } else {
      // 로그인 안 된 상태라면 알림 후 로그인 페이지로
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    }
  };

  // 주문 내역 클릭 핸들러
  const handleOrdersClick = () => {
    if (isLoggedIn) {
      navigate('/orders');
    } else {
      alert('주문 내역을 확인하시려면 로그인이 필요합니다.');
      navigate('/login');
    }
  };

  // 로고 클릭 핸들러
  const handleLogoClick = () => {
    alert('메인화면으로 돌아가는 API');
    navigate('/');
  };

  // 로그인 클릭 핸들러
  const handleLoginClick = () => {
    navigate('/login');
  };

  // 회원가입 클릭 핸들러
  const handleSignupClick = () => {
    navigate('/signup');
  };

  // (추가 제안) 로그아웃 핸들러 - isLoggedIn이 true일 때 사용
  const handleLogoutClick = () => {
    // 여기에 로그아웃 로직(예: localStorage 비우기 등)을 넣으세요
    alert('로그아웃 되었습니다.');
    navigate('/');
  };


  return (
    <header className="k-header-wrapper">
      <div className='k-header-upper-area'>
        <div className='k-header-upper-menu'>
          {isLoggedIn ? (
            <>
              <span>?*?님</span>
              <span onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>로그아웃</span>
            </>
          ) : (
            <>
              <span onClick={handleLoginClick} style={{ cursor: 'pointer' }}>로그인</span>
              <span onClick={handleSignupClick} style={{ cursor: 'pointer' }}>회원가입</span>
            </>
          )}

        </div>
      </div>

      <div className="k-header-container">

        {/* 1. 로고 영역 - 클릭 시 홈으로 이동 기능 추가 */}
        {/* 2. 기존 로고 HTML을 공통 컴포넌트로 대체 (큰 사이즈 적용) */}
        <KukjeLogo size="large" />

        {/* 2. 유연한 검색창 */}
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
        {/* 유저/카트 아이콘 메뉴 */}
        <div className="k-icon-menu">
          {/* 유저 프로필 버튼 */}
          <button
            className="k-icon-item"
            onClick={handleUserClick}
            aria-label="User Profile"
          >
            <BiUser size="1.8em" />
          </button>

          {/* 장바구니 버튼 (필요 시 /cart 페이지 이동) */}
          <button
            className="k-icon-item"
            onClick={() => navigate('/cart')}
            aria-label="Shopping Cart"
          >
            <BsCart3 size="1.8em" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default KukjeHeader;