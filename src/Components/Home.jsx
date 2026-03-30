import React, { useState, useEffect } from 'react';
import ProductSection from './ProductSection';

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 분리된 products.json 로드
    const jsonUrl = '/data/products.json'; 

    fetch(jsonUrl)
      .then((response) => {
        if (!response.ok) throw new Error('데이터 로드 실패');
        return response.json();
      })
      .then((data) => {
        setAllProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  /**
   * C#의 LINQ처럼 데이터를 조건별로 추출합니다.
   * 이제는 .category가 아니라 .section 필드를 기준으로 메인 화면을 구성합니다.
   */
  const bestProducts = allProducts.filter(p => p.section === 'best');
  const newProducts = allProducts.filter(p => p.section === 'new');
  const mdProducts = allProducts.filter(p => p.section === 'md');

  if (isLoading) {
    return (
      <div className="container" style={{ padding: "100px 0", textAlign: "center" }}>
        <h3>데이터를 불러오는 중입니다...</h3>
      </div>
    );
  }

  return (
    <main className="home-container" style={{ padding: "20px 0" }}>
      {/* 1. 실시간 베스트 섹션 (필터링된 배열 전달) */}
      {bestProducts.length > 0 && (
        <ProductSection title="실시간 베스트" items={bestProducts} />
      )}

      {/* 2. 신규 입고 섹션 */}
      {newProducts.length > 0 && (
        <ProductSection title="신규 입고 아이템" items={newProducts} />
      )}

      {/* 3. MD 추천 섹션 */}
      {mdProducts.length > 0 && (
        <ProductSection title="MD 추천 상품" items={mdProducts} />
      )}

      {/* 검색 결과가 아예 없을 때의 예외 처리 */}
      {allProducts.length === 0 && (
        <div className="container" style={{ textAlign: "center", padding: "50px" }}>
          <p>등록된 상품이 없습니다.</p>
        </div>
      )}
    </main>
  );
};

export default Home;