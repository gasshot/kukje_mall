import React, { useState } from 'react';
import './TabMenu.css';

const TabMenu = () => {
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSub, setActiveSub] = useState(null);

  const categories = [
    {
      id: 'fashion', name: '의류/잡화', sub: [
        { name: '남성의류', details: ['티셔츠', '셔츠', '슬랙스', '청바지'] },
        { name: '여성의류', details: ['원피스', '블라우스', '치마', '니트'] },
        { name: '신발', details: ['운동화', '구두', '슬리퍼'] },
        { name: '가방/지갑', details: ['백팩', '숄더백', '반지갑'] }
      ]
    },
    {
      id: 'beauty', name: '뷰티/화장품', sub: [
        { name: '스킨케어', details: ['스킨/토너', '로션', '에센스'] },
        { name: '메이크업', details: ['쿠션/팩트', '립스틱', '아이섀도우'] },
        { name: '향수', details: ['여성향수', '남성향수', '디퓨저'] },
        { name: '바디/헤어', details: ['샴푸', '트리트먼트', '바디워시'] }
      ]
    },
    {
      id: 'food', name: '식품/건강', sub: [
        { name: '신선식품', details: ['과일', '채소', '정육', '계란'] },
        { name: '가공식품', details: ['라면', '통조림', '즉석밥'] },
        { name: '건강기능식품', details: ['비타민', '홍삼', '유산균'] },
        { name: '음료', details: ['생수', '탄산음료', '커피'] }
      ]
    },
    {
      id: 'digital', name: '가전/디지털', sub: [
        { name: '노트북', details: ['게이밍 노트북', '사무용 노트북', '맥북'] },
        { name: '스마트폰', details: ['아이폰', '갤럭시', '폴더블폰'] },
        { name: 'TV', details: ['OLED TV', 'QLED TV', '벽걸이형'] },
        { name: '생활가전', details: ['청소기', '공기청정기', '가습기'] }
      ]
    },
    {
      id: 'living', name: '생활/가구', sub: [
        { name: '침구', details: ['이불', '베개', '매트리스 커버'] },
        { name: '거실가구', details: ['소파', '거실장', '사이드 테이블'] },
        { name: '주방용품', details: ['냄비/팬', '식기세트', '수저세트'] },
        { name: '욕실용품', details: ['수건', '욕실화', '디스펜서'] }
      ]
    },
  ];

  const handleMouseEnter = () => setIsCategoryVisible(true);
  const handleMouseLeave = () => {
    setIsCategoryVisible(false);
    setActiveCategory(null);
    setActiveSub(null);
  };

  const handleCategoryHover = (cat) => {
    setActiveCategory(cat);
    setActiveSub(null);
  };

  return (
    <div className="container category-relative-root">
      {/* 최소 수정 포인트: 
         onMouseEnter와 onMouseLeave를 버튼 내부가 아닌, 
         버튼과 드롭다운을 모두 포함하는 <nav> 태그로 이동 
      */}
      <nav 
        className="tab-menu-nav"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* 2. 카테고리 트리거 버튼 */}
        <div className="category-trigger-btn">
          <span className="hamburger-icon">☰</span>
          <span className="category-label-text">전체 카테고리</span>
        </div>

        {/* 3. 드롭다운 */}
        {isCategoryVisible && (
          <div className="category-dropdown-box">
            <div className="dropdown-inner">

              {/* 1단계: 대분류 */}
              <div className="main-category-list">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className={`category-item-row ${activeCategory?.id === cat.id ? 'active' : ''}`}
                    onMouseEnter={() => handleCategoryHover(cat)}
                  >
                    <span className={`category-text ${activeCategory?.id === cat.id ? 'active' : ''}`}>{cat.name}</span>
                    <span className={`arrow-icon ${activeCategory?.id === cat.id ? 'active' : ''}`}>▶</span>
                  </div>
                ))}
              </div>

              {/* 2단계: 중분류 */}
              <div className="mid-category-list">
                {activeCategory ? (
                  activeCategory.sub.map((subItem, index) => (
                    <div
                      key={index}
                      className={`mid-item-row ${activeSub?.name === subItem.name ? 'active' : ''}`}
                      onMouseEnter={() => setActiveSub(subItem)}
                    >
                      <span className={`mid-category-text ${activeSub?.name === subItem.name ? 'active' : ''}`}>{subItem.name}</span>
                      <span className={`arrow-icon small ${activeSub?.name === subItem.name ? 'active' : ''}`}>▶</span>
                    </div>
                  ))
                ) : (
                  <div className="empty-msg">대분류를 선택하세요</div>
                )}
              </div>

              {/* 3단계: 상세 */}
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