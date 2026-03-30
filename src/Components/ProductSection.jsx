import React from 'react';
import './ProductSection.css';

// 숫자를 가격 포맷(1,000)으로 바꾸는 함수
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSection = ({ title, items }) => {
  // items가 비어있을 경우를 대비한 안전장치
  if (!items || items.length === 0) {
    return <div className="loading container">상품을 불러오는 중입니다...</div>;
  }

  return (
    <section className="product-section container">
      <h2 className="section-title">{title}</h2>
      
      <div className="product-grid">
        {items.map((product) => {
          // 할인된 가격 계산
          const discountedPrice = product.originalPrice * (1 - product.discountRate / 100);
          
          return (
            <div key={product.id} className="product-card">
              {/* 1. 우측 상단 뱃지 (데이터가 있을 때만 표시) */}
              {product.badge && (
                <span className={`product-badge ${product.badge.toLowerCase()}`}>
                  {product.badge}
                </span>
              )}

              <div className="product-thumb">
                 <img src={product.imageUrl} alt={product.name} loading="lazy" />
              </div>
              
              <div className="product-info">
                <p className="p-name">{product.name}</p>
                
                <div className="p-price-block">
                  {/* 2. 할인율 표시 (0%보다 클 때만) */}
                  {product.discountRate > 0 && (
                    <span className="p-discount">{product.discountRate}%</span>
                  )}
                  <span className="p-price">{formatPrice(Math.round(discountedPrice))}원</span>
                  
                  {/* 원래 가격 (할인 중일 때만 표시) */}
                  {product.discountRate > 0 && (
                    <del className="p-original">{formatPrice(product.originalPrice)}원</del>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="section-divider"></div>
    </section>
  );
};

export default ProductSection;