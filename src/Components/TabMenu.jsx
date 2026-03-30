import React, { useState, useEffect } from 'react';
import './TabMenu.css';

const TabMenu = () => {
  const [categories, setCategories] = useState([]); // JSON 데이터를 저장할 필드
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSub, setActiveSub] = useState(null);

  // 컴포넌트 마운트 시 데이터 로드 (C#의 Constructor나 OnLoad 역할)
  useEffect(() => {
    fetch('/data/categories.json')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((err) => console.error("카테고리 로드 실패:", err));
  }, []);

  const handleMouseEnter = () => setIsCategoryVisible(true);
  
  const handleMouseLeave = () => {
    setIsCategoryVisible(false);
    setActiveCategory(null);
    setActiveSub(null);
  };

  const handleCategoryHover = (cat) => {
    setActiveCategory(cat);
    setActiveSub(null); // 대분류가 바뀌면 선택된 중분류 초기화
  };

  return (
    <div className="container category-relative-root">
      <nav 
        className="tab-menu-nav"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* 1. 카테고리 트리거 버튼 */}
        <div className="category-trigger-btn">
          <span className="hamburger-icon">☰</span>
          <span className="category-label-text">전체 카테고리</span>
        </div>

        {/* 2. 드롭다운 (데이터가 로드되었을 때만 렌더링) */}
        {isCategoryVisible && categories.length > 0 && (
          <div className="category-dropdown-box">
            <div className="dropdown-inner">

              {/* 1단계: 대분류 (Main) */}
              <div className="main-category-list">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className={`category-item-row ${activeCategory?.id === cat.id ? 'active' : ''}`}
                    onMouseEnter={() => handleCategoryHover(cat)}
                  >
                    <span className={`category-text ${activeCategory?.id === cat.id ? 'active' : ''}`}>
                      {cat.name}
                    </span>
                    <span className={`arrow-icon ${activeCategory?.id === cat.id ? 'active' : ''}`}>▶</span>
                  </div>
                ))}
              </div>

              {/* 2단계: 중분류 (Sub) */}
              <div className="mid-category-list">
                {activeCategory ? (
                  activeCategory.sub.map((subItem, index) => (
                    <div
                      key={index}
                      className={`mid-item-row ${activeSub?.name === subItem.name ? 'active' : ''}`}
                      onMouseEnter={() => setActiveSub(subItem)}
                    >
                      <span className={`mid-category-text ${activeSub?.name === subItem.name ? 'active' : ''}`}>
                        {subItem.name}
                      </span>
                      <span className={`arrow-icon small ${activeSub?.name === subItem.name ? 'active' : ''}`}>▶</span>
                    </div>
                  ))
                ) : (
                  <div className="empty-msg">대분류를 선택하세요</div>
                )}
              </div>

              {/* 3단계: 상세 (Details) */}
              <div className="detail-content-area">
                {activeSub ? (
                  <div className="detail-container">
                    <h4 className="detail-title">{activeSub.name}</h4>
                    <div className="detail-grid">
                      {activeSub.details.map((detail, index) => (
                        <div key={index} className="detail-card">
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="empty-msg">중분류에 마우스를 올려 확인하세요.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default TabMenu;