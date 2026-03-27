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
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (adsData.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % adsData.length);
    }, 5000); // 10초는 너무 길어서 5초로 조정했습니다.

    return () => clearInterval(timer);
  }, [adsData.length, isPaused]);

  const handleAdClick = (ad) => {
    console.log(`[API 시뮬레이션] ID: ${ad.id}, 링크: ${ad.link}`);
  };

  if (!adsData || adsData.length === 0) return null;

  return (
    /* 배너도 메인 컨텐츠 폭에 맞추기 위해 container 클래스 적용 */
    <div className="container ad-wrapper">
      <div 
        className="ad-section-container"
        onMouseEnter={() => setIsPaused(true)} 
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="ad-track" 
          style={{ 
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
                width: `${100 / adsData.length}%` 
              }}
              onClick={() => handleAdClick(ad)}
            >
              <h2 className="ad-title">{ad.title}</h2>
            </div>
          ))}
        </div>

        {/* 인디케이터 */}
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
    </div>
  );
};

export default AdBanner;