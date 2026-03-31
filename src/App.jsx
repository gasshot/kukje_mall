import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import KukjeHeader from './Components/Layout/KukjeHeader';
import KukjeFooter from './Components/Layout/KukjeFooter';
import TabMenu from './Components/TabMenu';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Home from './Components/Home';
import AdBanner from './Components/AdBanner';
import './Components/TabMenu.css';

function AppContent() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  // 1. 로그인 및 회원가입 페이지 여부를 통합 확인 (배열의 includes 활용)
  const authPaths = ['/login', '/signup'];
  const isAuthPage = authPaths.includes(location.pathname);

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    alert('로그아웃 되었습니다.');
  };

  // 검색 핸들러
  const handleSearch = (term) => {
    console.log("국제몰 검색어:", term);
  };

  return (
    <div className="app-main-container">
      {/* 2. 로그인/회원가입 페이지가 아닐 때만 헤더와 탭메뉴 노출 */}
      {!isAuthPage && (
        <>
          <KukjeHeader onSearch={handleSearch} isLoggedIn={isLoggedIn} />
          <TabMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </>
      )}

      <div className="app-wrapper">
        <div className="tab-content">
          <Routes>
            {/* 메인 홈 */}
            <Route path="/" element={
              <>
                <AdBanner />
                <Home isLoggedIn={isLoggedIn} />
              </>
            } />

            {/* 로그인 페이지 */}
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

            {/* 회원가입 페이지 */}
            <Route path="/signup" element={<Signup />} />

            {/* 나머지 경로는 홈으로 리다이렉트 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>

      {/* 3. 푸터 역시 인증 페이지가 아닐 때만 노출 */}
      {!isAuthPage && <KukjeFooter />}
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