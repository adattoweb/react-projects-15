import { useState, useRef } from 'react'
import poll from './poll.json'

type AnswerProps = {
    answer: string;
    onClick: () => void;
    isActive: boolean;
}

type QuestProps = {
    question: {
        question: string;
        answers: string[];
        rightIndex: number;
    }
}
 
export default function Poll(): JSX.Element {
    const allAnswers = useRef(0)
    const rightAnswers = useRef(0)
    const [now, setNow] = useState<number>(0)


    const Answer = ({ answer, onClick, isActive }:AnswerProps): JSX.Element => {
        return (
            <div className="answer" onClick ={onClick}>
                <div className={isActive ? "answer__circle active" : "answer__circle"}></div>
                <p>{answer}</p>
            </div>
        )
    }
    const [choosed, setChoosed] = useState<number>(-1)
    const nextQuest = () => {
        if(choosed === poll[now].rightIndex) rightAnswers.current++
        allAnswers.current +=1;
        setNow(now+1)
        setChoosed(-1)
    }
    const Quest = ({ question }: QuestProps): JSX.Element => {
        console.log(question)
        return (
            <div className="quest">
                <h3>{question.question}</h3>
                <div className="quest__list">
                    {question.answers.map((childEl, index) => {
                        return <Answer key={index} answer={childEl} onClick={() => {
                            setChoosed(index)
                        }} isActive = {choosed === index}/>
                    })}
                </div>
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
            <Quest question={poll[now]}/>}
        </div>
    )
}