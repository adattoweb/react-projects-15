import { useState, useEffect } from 'react'

export default function Timer() :JSX.Element{
    const [timer, setTimer] = useState<number>(0)
    const [selectedValue, setSelectedValue] = useState<string>("0.166666666666")
    const [isZero, setIsZero] = useState<boolean>(true)
    const sound: HTMLAudioElement = new Audio("/react-projects-15/src/assets/timer.mp3");
    useEffect(() => {
        if(timer === 0 && isZero === false) {
            sound.play();
        }
        if(timer > 0){
            const timerInterval = setInterval(() => {
                setTimer(prev => prev-1)
            }, 1000);
            return () => clearInterval(timerInterval)
        }
        if(timer < 0) setTimer(0)
    }, [timer])
    return(
        <div className="timer__parent block">
            <div className="timer">
                {Math.floor(timer / 60)}:{((timer - Math.floor(timer/60)*60).toFixed(0) + "").padStart(2, '0')}
            </div>
            <div className="timer__input">
                <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                    <option value="0.166666666666">00:10</option>
                    <option value="0.5">00:30</option>
                    <option value="1">1:00</option>
                    <option value="5">5:00</option>
                    <option value="15">15:00</option>
                    <option value="60">60:00</option>
                </select>
                <div className='timer__button' onClick={() => {
                    setTimer(timer + +selectedValue*60)
                    setIsZero(false)
                }}>Додати</div>
                <div className='timer__button' onClick={() => {
                    if(timer !== 0) {
                        if(timer - +selectedValue*60 < 0) setTimer(0)
                        else {
                            setTimer(timer - +selectedValue*60)
                            setIsZero(false)
                        }
                    }
                }}>Відняти</div>
                <div className='timer__button' onClick={() => {
                    setTimer(0)
                    setIsZero(true)
                }}>Обнулити</div>
            </div>
        </div>
    )
}