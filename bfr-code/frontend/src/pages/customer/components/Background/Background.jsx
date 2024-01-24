import React from 'react';
import './Background.css';
import backgroundImage from '../../../../assets/images/splashpage-bg.jpg';

const Background = () => {
  return <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>;
};

export default Background;