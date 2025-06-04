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
    const [isCount, setIsCount] = useState<boolean>(false);
    const [isTrade, setIsTrade] = useState<boolean>(false);
    const [isTimer, setIsTimer] = useState<boolean>(false);
    const [isTodo, setIsTodo] = useState<boolean>(false);
    const [isWeather, setIsWeather] = useState<boolean>(false);
    const [isPoll, setIsPoll] = useState<boolean>(false);
    const [isStopWatch, setIsStopWatch] = useState<boolean>(false);
    const [isAccordion, setIsAccordion] = useState<boolean>(false);
    const [isModalBtn, setIsModalBtn] = useState<boolean>(false);
    const [isModal, setIsModal] = useState<boolean>(false);
    const [isFlashCards, setIsFlashCards] = useState<boolean>(false);
    const [isSleepTime, setIsSleepTime] = useState<boolean>(false);
    const [isRock, setIsRock] = useState<boolean>(false)
    const [isPass, setIsPass] = useState<boolean>(false)
    const [isPassCheck, setIsPassCheck] = useState<boolean>(false)
    const [isFactorial, setIsFactorial] = useState<boolean>(false)

    const [isModalMenu, setIsModalMenu] = useState<boolean>(false);

    const [activeItems, setActiveItems] = useState<number[]>([]); // пізніше

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
                    arrNames={["Count","Trade","Timer","TodoList","Weather","Poll","StopWatch","Accordion","Modal","FlashCards","SleepTracker","RSP","PassGen","PassCheck","Factorial"]}
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


