🛍️ 국제몰 (Kukje Mall) - React Frontend
Vite와 React를 기반으로 구축된 현대적인 이커머스 프론트엔드 프로젝트입니다.

사용자 친화적인 인터페이스와 효율적인 상태 관리를 목표로 합니다.

🚀 기술 스택 (Tech Stack)
Framework: React 18 (Vite)

State Management: Zustand (전역 상태 관리 및 리렌더링 최적화)

Routing: React Router DOM v6

Icons: React Icons (Bs, Bi, Pi)

Styling: CSS3 (Component-based)

✨ 핵심 기능 (Key Features)
1. 전역 상태 관리 (Zustand)
Auth Store: isLoggedIn, userName 등 인증 상태를 중앙 집중식으로 관리합니다.

최적화: Context API의 불필요한 리렌더링 문제를 해결하여 성능을 극대화했습니다.

2. 사용자 인증 (Authentication)
로그인/회원가입: JWT 토큰 기반의 로그인 시스템 (localStorage 활용).

조건부 렌더링: 로그인 상태에 따라 헤더 메뉴(로그인/로그아웃)가 실시간으로 변경됩니다.

3. 카테고리 내비게이션
다단계 드롭다운: JSON 데이터를 기반으로 한 대/중/소분류 카테고리 시스템.

사용자 경험: 호버 인터랙션을 통한 직관적인 상품 탐색 기능을 제공합니다.

🛠️ 설치 및 실행 (Installation)
프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

의존성 설치

Bash
npm install
Zustand 설치 (아직 안 하셨다면)

Bash
npm install zustand
개발 서버 실행

Bash
npm run dev
📂 프로젝트 구조 (Directory Structure)
Plaintext
src/
 ┣ Components/
 ┃ ┣ Auth/          # 로그인, 회원가입 관련
 ┃ ┣ Layout/        # Header, Footer 등 공통 레이아웃
 ┃ ┗ TabMenu/       # 카테고리 탭 메뉴
 ┣ store/           # Zustand Store (전역 상태 관리)
 ┣ data/            # Mock Data (categories.json 등)
 ┣ App.jsx          # 메인 라우팅 및 앱 구성
 ┗ main.jsx         # 엔트리 포인트
📝 참고 사항
React Compiler: 현재 성능 영향으로 비활성화되어 있습니다. 활성화가 필요한 경우 공식 문서를 참조하세요.

ESLint: 프로덕션 환경에서는 TypeScript와 typescript-eslint 도입을 권장합니다.