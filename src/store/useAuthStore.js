import { create } from 'zustand';

const useAuthStore = create((set) => ({
  // 1. 초기 상태: 로컬 스토리지에 토큰이 있으면 true, 없으면 false
  isLoggedIn: !!localStorage.getItem('accessToken'),
  userName: localStorage.getItem('userName') || '', // 이름도 저장했다면 가져옴

  // 2. 로그인 액션
  login: (name, token) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userName', name);
    set({ isLoggedIn: true, userName: name });
  },

  // 3. 로그아웃 액션
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    set({ isLoggedIn: false, userName: '' });
  },
}));

export default useAuthStore;