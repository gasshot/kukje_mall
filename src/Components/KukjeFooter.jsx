import './KukjeFooter.css';

function KukjeFooter() {
  return (
    <footer className="k-footer-wrapper">
      <div className="k-footer-container">
        
        {/* 왼쪽: 회사 정보 섹션 */}
        <div className="k-footer-section company-info">
          <h2 className="k-footer-logo">Kukjemall</h2>
          <div className="k-info-text">
            <p><strong>상호명:</strong> (주)국제직업전문학교</p>
            <p><strong>주소:</strong> 광주광역시 동구 필문대로 281 (금석빌딩 1층)</p>
            <p><strong>대표번호:</strong> 062-223-6123 | <strong>팩스:</strong> 062-223-6124</p>
            <p><strong>이메일:</strong> help@kukjemall.com</p>
            <p className="k-copyright">© 2026 Kukjemall. All rights reserved.</p>
          </div>
        </div>

        {/* 오른쪽: 수강 과정 섹션 */}
        <div className="k-footer-section course-info">
          <h3 className="k-course-title">수강 과정 안내</h3>
          <ul className="k-course-list">
            <li>프론트엔드 개발자 양성과정 (React)</li>
          </ul>
        </div>

      </div>
    </footer>
  );
}

export default KukjeFooter;