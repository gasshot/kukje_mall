import React, { useState, useEffect } from 'react';
import MenuItem from './Common/MenuItem'; // 컴포넌트 임포트
import './TabMenu.css';

const TabMenu = () => {
  const [categories, setCategories] = useState([]);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSub, setActiveSub] = useState(null);

  useEffect(() => {
    fetch('/data/categories.json')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("카테고리 로드 실패:", err));
  }, []);

  // 탭을 열고 유지하는 함수
  const openTab = () => setIsCategoryVisible(true);

  // 탭을 닫고 상태를 초기화하는 함수
  const closeTab = () => {
    setIsCategoryVisible(false);
    setActiveCategory(null);
    setActiveSub(null);
  };

  return (
    <div className="tab-menu-bg-wrapper">
      <div className="container category-relative-root">

        {/* 1. 왼쪽 카테고리 버튼: 여기와 드롭다운에만 이벤트를 겁니다. */}
        <nav
          className="tab-menu-nav"
          onMouseEnter={openTab}
          onMouseLeave={closeTab}
        >
          <div className="category-trigger-btn">
            <span className="hamburger-icon">☰</span>
            <span className="category-label-text">전체 카테고리</span>
          </div>
        </nav>

        {/* 2. 오른쪽 수평 메뉴 */}
        <div className="horizontal-menu-wrapper">
          {[
            { text: "국제배송", icon: "/icons/shipping.png" },
            { text: "국제Fresh", icon: "/icons/fresh.png" },
            { text: "국제특가", icon: "/icons/sale.png" },
          ].map((item, idx) => (
            <MenuItem key={idx} text={item.text} iconPath={item.icon} />
          ))}
        </div>

        {/* 3. 드롭다운 박스: 버튼에서 이리로 마우스가 올 때 유지가 되어야 하므로 이벤트를 겁니다. */}
        {isCategoryVisible && categories.length > 0 && (
          <div
            className="category-dropdown-box"
            onMouseEnter={openTab}
            onMouseLeave={closeTab}
          >
            <div className="dropdown-inner">
              <div className="main-category-list">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className={`category-item-row ${activeCategory?.id === cat.id ? 'active' : ''}`}
                    onMouseEnter={() => { setActiveCategory(cat); setActiveSub(null); }}
                  >
                    <span className="category-text">{cat.name}</span>
                    <span className={`arrow-icon ${activeCategory?.id === cat.id ? 'active' : ''}`}>▶</span>
                  </div>
                ))}
              </div>

              <div className="mid-category-list">
                {activeCategory ? (
                  activeCategory.sub.map((subItem, index) => (
                    <div
                      key={index}
                      className={`mid-item-row ${activeSub?.name === subItem.name ? 'active' : ''}`}
                      onMouseEnter={() => setActiveSub(subItem)}
                    >
                      <span className="mid-category-text">{subItem.name}</span>
                      <span className={`arrow-icon small ${activeSub?.name === subItem.name ? 'active' : ''}`}>▶</span>
                    </div>
                  ))
                ) : (
                  <div className="empty-msg">대분류를 선택하세요</div>
                )}
              </div>

              <div className="detail-content-area">
                {activeSub ? (
                  <div className="detail-container">
                    <h4 className="detail-title">{activeSub.name}</h4>
                    <div className="detail-grid">
                      {activeSub.details.map((detail, index) => (
                        <div key={index} className="detail-card">{detail}</div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="empty-msg">중분류를 선택하세요</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabMenu;