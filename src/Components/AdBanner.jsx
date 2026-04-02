import React, { useState, useEffect } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import './AdBanner.css';

// 이미지 임포트
import adImg1 from '../assets/001.png';
import adImg2 from '../assets/002.png';
import adImg3 from '../assets/003.png';
import adImg4 from '../assets/004.png';
import adImg5 from '../assets/005.png';

const AdBanner = () => {
  const { goToProduct } = useNavigation();

  // 1. ID값을 실제 JSON 데이터(101~150)와 일치시킴
  const adsData = [
    { id: 101, title: "특가 세일", img: adImg1 },
    { id: 102, title: "신규 가입", img: adImg2 },
    { id: 103, title: "한정 수량", img: adImg3 },
    { id: 107, title: "수분 앰플", img: adImg4 }, // 예시 ID 수정
    { id: 111, title: "사골 곰탕", img: adImg5 }, // 예시 ID 수정
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

  // 2. 인자값을 객체가 아닌 id로 명확히 전달받음
  const handleAdClick = (id) => {
    goToProduct(id); 
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
        <div
          className="ad-slide-item"
          style={{
            backgroundImage: `url(${currentAd.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          // 3. 클릭 시 객체가 아닌 currentAd.id를 전달
          onClick={() => handleAdClick(currentAd.id)}
        >
          <div className="ad-text-overlay">
            <h2 className="ad-title">{currentAd.title}</h2>
          </div>
        </div>

        <div className="ad-indicator-wrapper side-menu">
          {adsData.map((ad, index) => (
            <button
              key={ad.id}
              className={`ad-indicator-btn ${index === currentIndex ? 'active' : ''}`}
              onMouseEnter={() => setCurrentIndex(index)}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="indicator-text">{ad.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdBanner;