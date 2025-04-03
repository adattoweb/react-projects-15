import { useState } from 'react';

import Count from '../widgets/Count';
import Trade from '../widgets/Trade';
import Timer from '../widgets/Timer';
import Todo from '../widgets/Todolist';
import Weather from '../widgets/Weather';
import Poll from '../widgets/Poll';
import StopWatch from '../widgets/StopWatch';
import Accordion from '../widgets/Accordion';
import Modal from '../widgets/Modal';
import FlashCards from '../widgets/FlashCards';
import Footer from '../widgets/Footer';
import ModalMenu from '../widgets/ModalMenu';
import Header from '../widgets/Header';
import SleepTime from '../widgets/SleepTime';
import Rock from '../widgets/Rock';
import PassGen from '../widgets/PassGen';
import PassCheck from '../widgets/PassCheck';
import Factorial from '../widgets/Factorial'

import './App.css';
import './App-adaptive.css';

export default function App() {
    const [isCount, setIsCount] = useState(false);
    const [isTrade, setIsTrade] = useState(false);
    const [isTimer, setIsTimer] = useState(false);
    const [isTodo, setIsTodo] = useState(false);
    const [isWeather, setIsWeather] = useState(false);
    const [isPoll, setIsPoll] = useState(false);
    const [isStopWatch, setIsStopWatch] = useState(false);
    const [isAccordion, setIsAccordion] = useState(false);
    const [isModalBtn, setIsModalBtn] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [isFlashCards, setIsFlashCards] = useState(false);
    const [isSleepTime, setIsSleepTime] = useState(false);
    const [isRock, setIsRock] = useState(false)
    const [isPass, setIsPass] = useState(false)
    const [isPassCheck, setIsPassCheck] = useState(false)
    const [isFactorial, setIsFactorial] = useState(false)

    const [isModalMenu, setIsModalMenu] = useState(false);

    const [activeItems, setActiveItems] = useState([]);

    const toggleFunctions = [
        () => setIsCount((prev) => !prev),
        () => setIsTrade((prev) => !prev),
        () => setIsTimer((prev) => !prev),
        () => setIsTodo((prev) => !prev),
        () => setIsWeather((prev) => !prev),
        () => setIsPoll((prev) => !prev),
        () => setIsStopWatch((prev) => !prev),
        () => setIsAccordion((prev) => !prev),
        () => setIsModalBtn((prev) => !prev),
        () => setIsFlashCards((prev) => !prev),
        () => setIsSleepTime((prev) => !prev),
        () => setIsRock((prev) => !prev),
        () => setIsPass((prev) => !prev),
        () => setIsPassCheck((prev) => !prev),
        () => setIsFactorial((prev) => !prev),
    ];

    return (
        <>
            {isModalMenu ? (
                <ModalMenu
                    onBurgerClick={() => setIsModalMenu(false)}
                    isNeed={isModalMenu}
                    arrFuncs={toggleFunctions}
                    names={'Count!Trade!Timer!TodoList!Weather!Poll!StopWatch!Accordion!Modal!FlashCards!SleepTreker!RSP!PassGen!PassCheck!Factorial'}
                    activeItems={activeItems}
                    setActiveItems={setActiveItems} // Передаємо функцію для зміни стану активних елементів
                />
            ) : (
                <>
                    <Header onBurgerClick={() => setIsModalMenu(true)} />
                    <div className="content">
                        {!isCount && !isTrade && !isTimer && !isTodo && !isWeather && !isPoll && !isStopWatch && !isAccordion && !isModalBtn && !isModal && !isFlashCards && !isSleepTime && !isRock && !isPass && !isPassCheck && !isFactorial && <p>Натисніть на меню, щоб викликати компоненти.</p>}
                        {isCount && <Count />}
                        {isTrade && <Trade />}
                        {isTimer && <Timer />}
                        {isTodo && <Todo />}
                        {isWeather && <Weather />}
                        {isPoll && <Poll />}
                        {isStopWatch && <StopWatch />}
                        {isAccordion && <Accordion />}
                        {isModalBtn && 
                            <div className="sleeptime__btni" onClick={() => setIsModal(!isModal)}>Викликати модальне вікно</div> }
                        {isModal && <Modal isModal={isModal}>Ви впевнені?</Modal>}
                        {isFlashCards && <FlashCards />}
                        {isSleepTime && <SleepTime />}
                        {isRock && <Rock />}
                        {isPass && <PassGen />}
                        {isPassCheck && <PassCheck/>}
                        {isFactorial && <Factorial/>}
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
}


