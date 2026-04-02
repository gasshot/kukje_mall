import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 상태 관리: 데이터, 로딩 상태, 에러 상태
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProductData = async () => {
    try {
      setLoading(true);
      // 1. 경로가 정확한지 확인 (public/data/productDetails.json)
      const response = await fetch('/data/productDetails.json'); 
      
      // 2. 응답이 정상인지 먼저 확인 (이 코드를 추가하면 원인 파악이 쉽습니다)
      if (!response.ok) {
        throw new Error(`파일을 찾을 수 없습니다: ${response.status}`);
      }

      const data = await response.json();
      const foundProduct = data.find(item => item.id === parseInt(id));
      setProduct(foundProduct);
    } catch (error) {
      console.error("진짜 에러 내용:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchProductData();
}, [id]);

  if (loading) return <div className="loading">데이터를 불러오는 중...</div>;
  if (!product) return <div className="error">상품 정보가 없습니다.</div>;

  // 할인가 계산 로직
  const salePrice = product.originalPrice * (1 - product.discountRate / 100);

  return (
    <div className="product-detail-container">
      <div className="product-content">
        <div>이미지 종류들</div>
        <div className="image-section">
          {product.badge && <span className="product-badge">{product.badge}</span>}
          <img src={product.imageUrl} alt={product.name} className="product-image" />
        </div>

        <div className="product-info">
          <nav className="category-nav">
            {product.mainCategory} &gt; {product.subCategory}
          </nav>
          <h1 className="product-name">{product.name}</h1>
          
          <div className="price-container">
            {product.discountRate > 0 && (
              <span className="discount-rate">{product.discountRate}%</span>
            )}
            <span className="sale-price">{salePrice.toLocaleString()}원</span>
            {product.discountRate > 0 && (
              <span className="original-price">{product.originalPrice.toLocaleString()}원</span>
            )}
          </div>

          <div className="action-buttons">
            <button className="btn-secondary">장바구니</button>
            <button className="btn-primary" onClick={() => alert('구매 페이지로 이동합니다.')}>
              바로 구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;