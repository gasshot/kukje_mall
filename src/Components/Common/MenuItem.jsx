import React from 'react'
import './MenuItem.css'; // 전용 CSS 임포트
const MenuItem = ({ text, iconPath }) => (
  <div className="menu-item">
    {iconPath && <img src={iconPath} alt="" className="menu-icon" />}
    <span>{text}</span>
  </div>
);

export default MenuItem