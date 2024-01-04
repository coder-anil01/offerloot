import React from 'react';
import { FaArrowUp } from "react-icons/fa";

const GoToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling animation
    });
  };

  return (
    <button onClick={scrollToTop} style={{ position: 'fixed', bottom: '20px', right: '20px', width: "50px",
height:"50px", fontSize:"22px", borderRadius:"50%", padding:"3px 0 0 0", border: "none", cursor:"pointer",backgroundColor:"#07e1f5" }}><FaArrowUp/></button>
  );
};

export default GoToTopButton;