import React from 'react';
import { useNavigate } from 'react-router-dom';
import './KukjeLogo.css';

function KukjeLogo({ size = 'medium' }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className={`k-logo-container ${size}`} onClick={handleLogoClick}>
      <span className="logo-kukje">Kukje</span>
      <span className="logo-mall">mall</span>
    </div>
  );
}

export default KukjeLogo;