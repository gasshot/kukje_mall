import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅
import { BsSearch, BsCart3 } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
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

  return (
    <header className="k-header-wrapper">
      <div className="k-header-container">
        
        {/* 1. 로고 영역 - 클릭 시 홈으로 이동 기능 추가 */}
        <div className="k-logo-area" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <h1 className="k-logo-text">Kukjemall</h1>
        </div>

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

        {/* 3. 오른쪽 아이콘/쿠폰 영역 */}
        <div className="k-right-area">
          <div className="k-ad-coupon">
            <div className="k-ad-icon-wrapper">
              <span className="k-ad-icon">K</span>
              <span className="k-ad-text-mini">20,000</span>
            </div>
          </div>

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

            {/* 주문 내역 버튼 */}
            <button 
              className="k-icon-item" 
              onClick={handleOrdersClick} 
              aria-label="Orders"
            >
              <PiFoldersDuotone size="1.8em" />
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
        
      </div>
    </header>
  );
}

export default KukjeHeader;