import { useState, useEffect } from 'react';

type HeaderProps = {
    onBurgerClick: () => void;
}

export default function Header({ onBurgerClick }:HeaderProps): JSX.Element{

    const [isHidden, setIsHidden] = useState<boolean>(false)
    const [lastScroll, setLastScroll] = useState<number>(0)

    const scroll = () => {
        const currentScroll:number = window.scrollY;
        if(currentScroll > lastScroll && currentScroll > 50){
            setIsHidden(true)
        } else {
            setIsHidden(false)
        }
        setLastScroll(currentScroll)
    }

    useEffect(() => {
        window.addEventListener('scroll', scroll);
        return () => window.removeEventListener('scroll', scroll)
    })


    return (
        <header className={isHidden ? 'header hidden' : 'header'}>
            <p className="logo-name">adattoweb</p>
            <div className="burger-menu" onClick={onBurgerClick}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        </header>
    )
}