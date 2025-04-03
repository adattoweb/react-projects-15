import { useState, useEffect } from "react";

export default function Modal({ children, isModal }) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (isModal) {
      setIsVisible(true);
      setTimeout(() => setAnimationClass("fade-in"), 10);
    } else {
      setAnimationClass("fade-out");
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isModal]);

  return (
    isVisible && (
      <div className={`modalone ${animationClass}`}>
        <h3>{children}</h3>
        <div className="modalone__menu">
          <div className="modalone__button">Так</div>
          <div className="modalone__button ">Ні</div>
        </div>
      </div>
    )
  );
}

