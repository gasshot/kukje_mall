function Home({ isLoggedIn, message }) {
  return (
    <div className="page-container">
      <h1>국제몰 메인화면</h1>
      <p>방문을 환영합니다! 이곳은 메인 페이지입니다.</p>
      {isLoggedIn && (
        <div className="status-box">
          <p>로그인 중: <strong>{message}</strong></p>
        </div>
      )}
    </div>
  );
}

export default Home;