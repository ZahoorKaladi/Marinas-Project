import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This hook runs whenever the 'pathname' (the URL route) changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;