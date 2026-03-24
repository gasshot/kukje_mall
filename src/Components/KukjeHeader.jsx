import { useState } from 'react';
import { BsSearch, BsCart3 } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { PiFoldersDuotone } from 'react-icons/pi';
import './KukjeHeader.css'; // CSS 파일 이름 변경

function KukjeHeader({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
    console.log("Kukjemall 검색:", searchTerm);
  };

  return (
    <header className="k-header-wrapper">
      <div className="k-header-container">
        
        {/* 1. 로고 영역 (텍스트 로고로 변경) */}
        <div className="k-logo-area">
          <h1 className="k-logo-text">Kukjemall</h1>
        </div>

        {/* 2. 유연한 검색창 (중앙, 가변 너비) */}
        <form onSubmit={handleSearch} className="k-search-form">
          <input
            type="text"
            className="k-search-input"
            placeholder="상품을 검색해보세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="k-search-btn">
            <BsSearch size="1.4em" /> {/* em을 사용해 글자 크기에 반응 */}
          </button>
        </form>

        {/* 3. 오른쪽 아이콘/쿠폰 영역 (오른쪽 고정 비율) */}
        <div className="k-right-area">
          {/* 쿠폰 광고 (em 단위를 사용하여 글자 크기에 따라 크기 조절) */}
          <div className="k-ad-coupon">
            <div className="k-ad-icon-wrapper">
              <span className="k-ad-icon">K</span> {/* 로고 이니셜로 변경 */}
              <span className="k-ad-text-mini">20,000</span>
            </div>
            {/*
            <p className="k-ad-desc">
              국제몰 2만원 쿠폰 증정 이벤트
              <span className="k-ad-tag">AD</span>
            </p>
            */}
          </div>

          {/* 유저/카트 아이콘 */}
          <div className="k-icon-menu">
            <button className="k-icon-item" aria-label="User Profile">
              <BiUser size="1.8em" />
            </button>
            <button className="k-icon-item" aria-label="Orders">
              <PiFoldersDuotone size="1.8em" />
            </button>
            <button className="k-icon-item" aria-label="Shopping Cart">
              <BsCart3 size="1.8em" />
            </button>
          </div>
        </div>
        
      </div>
    </header>
  );
}

export default KukjeHeader;