import React, { useState } from 'react';

const TabMenu = () => {
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  // 1단계 카테고리와 그에 따른 2단계 세부 데이터
  const categories = [
    { id: 'fashion', name: '의류/잡화', sub: ['남성의류', '여성의류', '신발', '가방/지갑'] },
    { id: 'beauty', name: '뷰티/화장품', sub: ['스킨케어', '메이크업', '향수', '바디/헤어'] },
    { id: 'food', name: '식품/건강', sub: ['신선식품', '가공식품', '건강기능식품', '음료'] },
    { id: 'digital', name: '가전/디지털', sub: ['노트북', '스마트폰', 'TV', '생활가전'] },
    { id: 'living', name: '생활/가구', sub: ['침구', '거실가구', '주방용품', '욕실용품'] },
  ];

  const toggleCategory = (e) => {
    e.stopPropagation();
    setIsCategoryVisible((prev) => !prev);
    if (!isCategoryVisible) setActiveCategory(null); // 열 때 초기화
  };

  return (
    <nav className="tab-menu-container">
      <div className="category-wrapper">
        <div className="category-trigger-btn">
          <span className="hamburger-icon" onClick={toggleCategory}>☰</span>
          <span className="category-label-text">전체 카테고리</span>
        </div>
        
        {isCategoryVisible && (
          <div className="category-dropdown-box">
            {/* 왼쪽: 메인 카테고리 목록 */}
            <div className="main-category-list">
              {categories.map((cat) => (
                <div 
                  key={cat.id} 
                  className={`category-item-row ${activeCategory?.id === cat.id ? 'active' : ''}`}
                  onMouseEnter={() => setActiveCategory(cat)} // 마우스 올리면 세부 카테고리 변경
                >
                  <span className="category-text">{cat.name}</span>
                  <span className="arrow-icon">▶</span>
                </div>
              ))}
            </div>

            {/* 오른쪽: 세부 카테고리 목록 (마우스 올린 항목이 있을 때만 표시) */}
            <div className="sub-category-detail">
              {activeCategory ? (
                <>
                  <h4 className="sub-title">{activeCategory.name} 세부 분류</h4>
                  <div className="sub-grid">
                    {activeCategory.sub.map((subItem, index) => (
                      <div key={index} className="sub-item">{subItem}</div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="empty-msg">카테고리에 마우스를 올려주세요.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TabMenu;