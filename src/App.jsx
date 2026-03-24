import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KukjeHeader from './Components/KukjeHeader';
import KukjeFooter from './Components/KukjeFooter';
import TabMenu from './Components/TabMenu'; // 분리한 컴포넌트 임포트
import Home from './Components/Home';
import Login from './Components/Login';
import './App.css';

function App() {
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
        {/* 1. 최상단 고정 헤더 영역 */}
        <KukjeHeader onSearch={handleSearch} />

        {/* 2. 중앙 컨텐츠 영역 */}
        <div className="app-wrapper">
          {/* 분리된 탭 메뉴 컴포넌트 호출 */}
          <TabMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

          <div className="tab-content">
            <Routes>
              <Route path="/" element={<Home isLoggedIn={isLoggedIn} message={message} />} />
              <Route 
                path="/login" 
                element={<Login setIsLoggedIn={setIsLoggedIn} setMessage={setMessage} message={message} />} 
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