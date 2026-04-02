import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import KukjeHeader from './Components/Layout/KukjeHeader';
import KukjeFooter from './Components/Layout/KukjeFooter';
import TabMenu from './Components/TabMenu';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Home from './Components/Home';
import AdBanner from './Components/AdBanner';
import ProductDetail from './Components/ProductDetail';

import './Components/TabMenu.css';

function AppContent() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  // 1. 로그인 및 회원가입 페이지 여부를 통합 확인 (배열의 includes 활용)
  const authPaths = ['/login', '/signup'];
  const isAuthPage = authPaths.includes(location.pathname);

  // 로그아웃 핸들러 보완
  const handleLogout = () => {
    // 1. 토큰 삭제
    localStorage.removeItem('accessToken');

    // 2. 상태 즉시 업데이트
    setIsLoggedIn(false);

    // 3. (선택사항) 모든 로컬 스토리지 비우기 - 확실한 방법
    localStorage.clear();

    alert('로그아웃 되었습니다.');

    // 4. 홈으로 이동시키며 상태 초기화
    window.location.href = '/';
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
          <TabMenu />
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

            {/* 2. 상세 페이지: /product/1 등의 경로로 접속 시 노출됨 */}
            <Route path="/product/:id" element={<ProductDetail />} />

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