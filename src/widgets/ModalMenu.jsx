import { useState } from 'react';
import './ModalMenu.css';

import github from '../assets/github.png';
import telegram from '../assets/telegram.png';
import discord from '../assets/discord.png';
import polygon from '../assets/polygon.png';

export default function ModalMenu(props) {
    console.log('Modal render');
    const { isNeed, onBurgerClick, arrFuncs, arrNames, activeItems, setActiveItems } = props;

    if (!isNeed) return null;

    // Дочірній компонент для навігації
    const NavModal = ({ children, index, onClick }) => {
        const isActive = activeItems.includes(index); // Перевіряємо, чи цей елемент активний

        const toggleActive = () => {
            setActiveItems((prev) => {
                if (prev.includes(index)) {
                    return prev.filter(item => item !== index); // Вимикаємо активність
                } else {
                    return [...prev, index]; // Додаємо до активних
                }
            });
            onClick(); // Викликаємо onClick, що передається в компонент
        };

        return (
            <li onClick={toggleActive}>
                <p>
                    {isActive && <img src={polygon} alt="polygon" />} {/* Відображення іконки, якщо активний */}
                    {children}
                </p>
            </li>
        );
    };

    return (
        <div className="modal">
            <div className="modal-contact">
                <a
                    href="https://github.com/adattoweb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-citem github"
                >
                    <div className="modal-citem-container">
                        <h3>GitHub</h3>
                        <img src={github} alt="github" />
                    </div>
                </a>
                <a
                    href="https://t.me/adattoweb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-citem telegram"
                >
                    <div className="modal-citem-container">
                        <h3>Telegram</h3>
                        <img src={telegram} alt="telegram" />
                    </div>
                </a>
                <a
                    onClick={() => navigator.clipboard.writeText('@adattoweb')}
                    href="#"
                    className="modal-citem discord"
                >
                    <div className="modal-citem-container">
                        <h3>Discord</h3>
                        <img src={discord} alt="discord" />
                    </div>
                </a>
            </div>

            <div className="modal-parent">
                <div className="modal-close">
                    <div className="burger-menu active" onClick={onBurgerClick}>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                </div>
                <div className="modal-list">
                    <ul>
                        {arrNames.map((el, index) => (
                            <NavModal key={index} index={index} onClick={arrFuncs[index]}>
                                {el}
                            </NavModal>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}


{/* 
<div className="app__button" onClick={(() => setIsCount(!isCount))}>Counter</div>
<div className="app__button" onClick={(() => setIsTrade(!isTrade))}>Trade</div>
<div className="app__button" onClick={(() => setIsTimer(!isTimer))}>Timer</div>
<div className="app__button" onClick={(() => setIsTodo(!isTodo))}>Todolist</div>
<div className="app__button" onClick={(() => setIsWeather(!isWeather))}>Weather</div>
<div className="app__button" onClick={(() => setIsPoll(!isPoll))}>Poll</div>
<div className="app__button" onClick={(() => setIsStopWatch(!isStopWatch))}>StopWatch</div>
<div className="app__button" onClick={(() => setIsAccordion(!isAccordion))}>Accordion</div>
<div className="app__button" onClick={(() => setIsModal(!isModal))}>Modal</div>
<div className="app__button" onClick={(() => setIsFlashCards(!isFlashCards))}>FlashCards</div> */}