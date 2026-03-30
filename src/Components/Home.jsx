import React, { useState, useEffect } from 'react';
import ProductSection from './ProductSection';

const Home = () => {
  // 전체 상품 데이터를 저장할 상태
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트 마운트 시 JSON 데이터 가져오기
  useEffect(() => {
    // 실제 서버 API 주소로 나중에 대체됩니다.
    const jsonUrl = '/data/products.json'; 

    fetch(jsonUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다.');
        }
        return response.json();
      })
      .then((data) => {
        setAllProducts(data); // 데이터를 상태에 저장
        setIsLoading(false); // 로딩 완료
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      });
  }, []); // 빈 배열 []: 처음 한 번만 실행

  // 카테고리별 데이터 필터링 (서버 API가 있다면 서버에서 처리해서 줌)
  const bestProducts = allProducts.filter(p => p.category === 'best');
  const newProducts = allProducts.filter(p => p.category === 'new');
  const mdProducts = allProducts.filter(p => p.category === 'md');

  if (isLoading) {
    return <div className="loading container">전체 데이터를 로딩 중입니다...</div>;
  }

  return (
    <div className="home-container" style={{ padding: "20px 0" }}>
      {/* 필터링된 데이터를 각각 넘겨줌 */}
      <ProductSection title="실시간 베스트" items={bestProducts} />
      <ProductSection title="신규 입고 아이템" items={newProducts} />
      <ProductSection title="MD 추천 상품" items={mdProducts} />
    </div>
  );
};

export default Home;