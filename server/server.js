const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001; // 프론트엔드(Vite)와 겹치지 않는 포트

// 미들웨어 설정
app.use(cors()); // 모든 도메인에서의 요청 허용 (CORS 해결)
app.use(express.json()); // JSON 데이터 파싱

// --- 데이터베이스 대용 (임시 데이터) ---
const products = [
  { id: 1, name: "노트북", price: 1200000 },
  { id: 2, name: "기계식 키보드", price: 150000 },
];

// --- 라우트 설정 ---

app.get('/', (req, res) => {
  res.send('Mock Server is running!');
});


// 1. 로그인 (가짜 토큰 발행)
app.post('/login', (req, res) => {
  console.log('로그인 요청 데이터:', req.body);
  const { id, pw } = req.body;

  // 간단한 아이디/비번 체크
  if (id === 'admin' && pw === '1234') {
    res.json({
      success: true,
      message: '로그인 성공!',
      accessToken: 'fake-jwt-token-abcd-1234', // 프론트엔드 axios 인터셉터로 보낼 값
      user: { name: '관리자', role: 'admin' }
    });
  } else {
    res.status(401).json({ success: false, message: '아이디 또는 비밀번호가 틀립니다.' });
  }
});

// 2. 상품 목록 가져오기 (GET)
app.get('/products', (req, res) => {
  // 만약 헤더에 토큰이 있는지 확인하고 싶다면?
  const authHeader = req.headers.authorization;
  console.log('요청 헤더 토큰:', authHeader);

  res.json(products);
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Mock Server가 http://localhost:${PORT} 에서 실행 중입니다.`);
});