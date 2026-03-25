import React, { useState, useEffect } from 'react';
import './AdBanner.css';

const AdBanner = () => {
  const adsData = [
    { id: 1, title: "배너 1: 특가 세일", color: "#6c5ce7", link: "/1" },
    { id: 2, title: "배너 2: 신규 가입", color: "#00b894", link: "/2" },
    { id: 3, title: "배너 3: 한정 수량", color: "#e17055", link: "/3" },
    { id: 4, title: "배너 4: 무료 배송", color: "#0984e3", link: "/4" },
    { id: 5, title: "배너 5: 포인트 증정", color: "#d63031", link: "/5" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (adsData.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % adsData.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [adsData.length]);

  const handleAdClick = (ad) => {
    console.log(`[API 시뮬레이션] ID: ${ad.id}, 링크: ${ad.link}`);
  };

  if (!adsData || adsData.length === 0) return null;

  return (
    <div className="ad-section-container">
      <div 
        className="ad-track" 
        style={{ 
          // 현재 인덱스 * (100 / 전체개수) 만큼 이동
          transform: `translateX(-${currentIndex * (100 / adsData.length)}%)`,
          width: `${adsData.length * 100}%` 
        }}
      >
        {adsData.map((ad) => (
          <div 
            key={ad.id} 
            className="ad-slide-item" 
            style={{ 
              backgroundColor: ad.color,
              width: `${100 / adsData.length}%` // 전체 트랙 내에서 정확히 n분의 1 차지
            }}
            onClick={() => handleAdClick(ad)}
          >
            <h2 className="ad-title">{ad.title}</h2>
          </div>
        ))}
      </div>

      <div className="ad-indicator-wrapper">
        {adsData.map((_, index) => (
          <button
            key={index}
            className={`ad-indicator-btn ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdBanner;