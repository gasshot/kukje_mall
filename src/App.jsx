import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import KukjeHeader from './Components/KukjeHeader';
import KukjeFooter from './Components/KukjeFooter';
import TabMenu from './Components/TabMenu';
import Login from './Components/Login';
import Home from './Components/Home';
import AdBanner from './Components/AdBanner';
import './App.css';          // 먼저 로드 (기본 스타일)
import './Components/TabMenu.css';       // 나중에 로드 (우선순위 높음)

// 임시 컴포넌트 (프로필/주문내역 페이지 확인용)
const Profile = () => <div style={{ padding: "100px", textAlign: "center" }}><h2>고객 프로필 페이지</h2></div>;
const Orders = () => <div style={{ padding: "100px", textAlign: "center" }}><h2>주문 내역 페이지</h2></div>;

function App() {
  // 로컬스토리지에 토큰이 있으면 true, 없으면 false
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    setMessage('');
    alert('로그아웃 되었습니다.');
  };

  const handleSearch = (term) => {
    console.log("국제몰 검색어:", term);
  };

  return (
    <Router>
      <div className="app-main-container">
        {/* 1. 최상단 고정 헤더 영역 - isLoggedIn 전달 */}
        <KukjeHeader onSearch={handleSearch} isLoggedIn={isLoggedIn} />

        {/* 2. 중앙 컨텐츠 영역 */}
        <div className="app-wrapper">
          {/* 분리된 탭 메뉴 컴포넌트 호출 */}
          <TabMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

          <div className="tab-content">
            {/* tab-content 내부 최상단에 광고 배치 */}
            <AdBanner />
            
            <Routes>
              {/* 메인 홈 */}
              <Route path="/" element={<Home isLoggedIn={isLoggedIn} message={message} />} />
              
              {/* 로그인 페이지 */}
              <Route 
                path="/login" 
                element={<Login setIsLoggedIn={setIsLoggedIn} setMessage={setMessage} message={message} />} 
              />

              {/* 프로필 및 주문 내역 (로그인 상태에 따른 라우팅 보호 예시) */}
              <Route 
                path="/profile" 
                element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/orders" 
                element={isLoggedIn ? <Orders /> : <Navigate to="/login" />} 
              />
            </Routes>
          </div>
        </div>

        {/* 3. 최하단 푸터 영역 */}
        <KukjeFooter />
      </div>
    </Router>
  );
}

export default App;