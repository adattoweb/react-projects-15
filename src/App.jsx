import { useState } from 'react';

import Count from './Count';
import Trade from './Trade';
import Timer from './Timer';
import Todo from './Todolist';
import Weather from './Weather';
import Poll from './Poll';
import StopWatch from './StopWatch';
import Accordion from './Accordion';
import Modal from './Modal';
import FlashCards from './FlashCards';
import Footer from './Footer';
import ModalMenu from './ModalMenu';
import Header from './Header';
import SleepTime from './SleepTime';
import Rock from './Rock';
import PassGen from './PassGen';
import PassCheck from './PassCheck';
import Factorial from './Factorial'
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


