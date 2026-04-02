import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  // 상품 상세 페이지로 이동하는 공통 함수
  const goToProduct = (id) => {
    if (!id) return;
    // 나중에 여기서 분석 로그를 보내거나 할 수 있음
    console.log(`[로그] 상품 ID ${id}번으로 이동 시도`);
    navigate(`/product/${id}`);
  };

  // 홈으로 이동
  const goToHome = () => {
    navigate('/');
  };

  // 뒤로 가기
  const goBack = () => {
    navigate(-1);
  };

  return { goToProduct, goToHome, goBack };
};