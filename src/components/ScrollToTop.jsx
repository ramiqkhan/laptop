import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Page ke top par scroll karega smoothly ya instantly
    window.scrollTo(0, 0);
  }, [pathname]); // Jab bhi path change hoga, ye chalay ga

  return null;
};

export default ScrollToTop;