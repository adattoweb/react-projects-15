import { useState, useEffect, ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  isModal: boolean;
}

export default function Modal({ children, isModal }:ModalProps): boolean | JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animationClass, setAnimationClass] = useState<string>("");

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
          <div className="modalone__button" onClick={() => setIsVisible(false)}>Так</div>
          <div className="modalone__button" onClick={() => setIsVisible(false)}>Ні</div>
        </div>
      </div>
    )
  );
}

