import { useState, useRef } from 'react'
import poll from './poll.json'

export default function Poll() {
    const allAnswers = useRef(0)
    const countAnswers = useRef(0)
    const rightAnswers = useRef(0)
    const [now, setNow] = useState(0)

    console.log(countAnswers)

    const Answer = (props) => {
        const {answer, isRight} = props;
        const [isActive, setIsActive] = useState(false)
        return (
            <div className="answer" onClick={() => {
                if(countAnswers.current === 0) setIsActive(!isActive)
                else return
                if(!isActive) { 
                    countAnswers.current +=1
                    if(isRight) rightAnswers.current +=1
                }
                else {
                    countAnswers.current -=1
                    if(isRight) rightAnswers.current -=1;
                }
            }}>
                <div className={isActive ? "answer__circle active" : "answer__circle"}></div>
                <p>{answer}</p>
            </div>
        )
    }

    const [errorText, setErrorText] = useState('')
    const nextQuest = () => {
        if(countAnswers.current !== 1){
            if(!errorText.includes('Виберіть одну відповідь')) {
                countAnswers.current = 0;
                rightAnswers.current -=1;
            }
            setErrorText('Виберіть одну відповідь!')
            return false;
        }
        countAnswers.current = 0;
        setErrorText('')
        allAnswers.current +=1;
        setNow(now+1)
    }

    const Quest = (props) => {
        const {children, question} = props;
        return (
            <div className="quest">
                <h3>{question}</h3>
                <div className="quest__list">
                    {children}
                </div>
                {errorText.length > 1 && <p className="error">{errorText}</p>}
                <div className="quest__button" onClick={nextQuest}>Далі</div>
            </div>
        )
    }

    return (
        <div className="poll__parent block">
            {now >= poll.length ? 
            <div className="poll__final">
                <h3>Результати</h3>
                <p>{rightAnswers.current}/{allAnswers.current}</p>
                <div className="quest__button" onClick={() => {
                    setNow(0)
                    rightAnswers.current = 0;
                    allAnswers.current = 0;
                    }}>Спочатку</div>
            </div>
            :
            <Quest question={poll[now].question}>
                {poll[now].answers.map((childEl, index) => {
                    return <Answer key={index} answer={childEl} isRight={index === poll[now].rightIndex ? true : false}/>
                })}
            </Quest>}
        </div>
    )
}