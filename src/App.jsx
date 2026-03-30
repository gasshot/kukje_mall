import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import KukjeHeader from './Components/KukjeHeader';
import KukjeFooter from './Components/KukjeFooter';
import TabMenu from './Components/TabMenu';
import Login from './Components/Login';
import Home from './Components/Home';
import AdBanner from './Components/AdBanner';
import './Components/TabMenu.css';

function AppContent() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  // 로그인 페이지 여부 확인 (헤더, 푸터, 탭메뉴 숨김 처리용)
  const isLoginPage = location.pathname === '/login';

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    alert('로그아웃 되었습니다.');
  };

  const handleSearch = (term) => {
    console.log("국제몰 검색어:", term);
  };

  return (
    <div className="app-main-container">
      {/* 로그인 페이지가 아닐 때만 노출 */}
      {!isLoginPage && (
        <>
          <KukjeHeader onSearch={handleSearch} isLoggedIn={isLoggedIn} />
          <TabMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </>
      )}

      <div className="app-wrapper">
        <div className="tab-content">
          <Routes>
            {/* 1. 메인 홈: 광고 + 수직 나열 상품 섹션(Home) */}
            <Route path="/" element={
              <>
                <AdBanner />
                <Home isLoggedIn={isLoggedIn} />
              </>
            } />

            {/* 2. 로그인 페이지: 광고/헤더/푸터 없이 독자적으로 표시 */}
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

            {/* 나머지 경로는 홈으로 리다이렉트 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>

      {!isLoginPage && <KukjeFooter />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}