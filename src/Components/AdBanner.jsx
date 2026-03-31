import React, { useState, useEffect } from 'react';
import './AdBanner.css';

const AdBanner = () => {
  const adsData = [
    { id: 1, title: "특가 세일", color: "#6c5ce7", link: "/1" },
    { id: 2, title: "신규 가입", color: "#00b894", link: "/2" },
    { id: 3, title: "한정 수량", color: "#e17055", link: "/3" },
    { id: 4, title: "무료 배송", color: "#0984e3", link: "/4" },
    { id: 5, title: "포인트 증정", color: "#d63031", link: "/5" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (adsData.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % adsData.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [adsData.length, isPaused]);

  const handleAdClick = (ad) => {
    console.log(`[API 시뮬레이션] ID: ${ad.id}, 링크: ${ad.link}`);
  };

  if (!adsData || adsData.length === 0) return null;

  const currentAd = adsData[currentIndex];

  return (
    <div className="container ad-wrapper">
      <div 
        className="ad-section-container"
        onMouseEnter={() => setIsPaused(true)} 
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* 즉각 전환 배너 영역 */}
        <div 
          className="ad-slide-item" 
          style={{ backgroundColor: currentAd.color }}
          onClick={() => handleAdClick(currentAd)}
        >
          <h2 className="ad-title">{currentAd.title}</h2>
        </div>

        {/* 텍스트 기반 세로형 인디케이터 */}
        <div className="ad-indicator-wrapper side-menu">
          {adsData.map((ad, index) => (
            <button
              key={ad.id}
              className={`ad-indicator-btn ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            >
              {/* <span className="indicator-label">{index + 1}</span> */}
              <span className="indicator-text">{ad.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdBanner;