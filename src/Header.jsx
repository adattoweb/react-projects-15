import React, { useState, useEffect } from 'react';

export default function Header(props){

    const {onBurgerClick} = props;

    const [isHidden, setIsHidden] = useState(false)
    const [lastScroll, setLastScroll] = useState(0)

    const scroll = () => {
        const currentScroll = window.scrollY;
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