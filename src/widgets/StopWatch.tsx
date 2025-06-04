import { useState, useEffect } from 'react'

import start from '../assets/start.png'
import pause from '../assets/pause.png'
import restart from '../assets/restart.png'

export default function StopWatch(): JSX.Element{
    const localStopWatch: string | null = localStorage.getItem('stopwatch')
    if(!localStopWatch){
        localStorage.setItem('stopwatch', '0')
    }
    const [isStart, setIsStart] = useState<boolean>(true)
    const [count, setCount] = useState<number>(!localStopWatch ? 0 : +localStopWatch)

    useEffect(() => {
        const myInterval = setInterval(() =>{
            if(isStart === true) {
                localStorage.setItem('stopwatch', (count+1)+"")
                setCount(+count+1)
            }
        }, 1000)
        return () => clearInterval(myInterval)
    })
    return (
        <div className="stopwatch__parent block">
            <p>{count}</p>
            <div className="stopwatch__menu">
                <img src={isStart ? pause : start} onClick={() => {setIsStart(!isStart)}} alt="" />
                <img src={restart} alt="" onClick={() => {
                    localStorage.setItem('stopwatch', '0')
                    setCount(0)
                }}/>
            </div>
        </div>
    )
}