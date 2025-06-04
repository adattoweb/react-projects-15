import { useState, useRef, useEffect } from 'react'
import triangle from '../assets/triangle.png'

type RockItemProps = {
    date: string;
    result: string;
}

export default function Rock() : JSX.Element{
    const localRock = localStorage.getItem("rock-index")
    if(!localRock){
        localStorage.setItem('rock-index', '0')
    }
    const [isRotate, setIsRotate] = useState<boolean>(false)
    const [playerValue, setPlayerValue] = useState<string>('камінь')
    const [result, setResult] = useState<string>('Чекаю боя...')
    const [rockIndex, setRockIndex] = useState<number>(!localRock ? 0 : +localRock)
    const RockItem = ({date, result}:RockItemProps) => {
        return (
            <div className="rock__item">
                <span>{date}</span>
                <p>{result}</p>
            </div>
        )
    }
    const randomaiser = (max: number): number => {
        return Math.floor(Math.random() * max);
      }
    const start = () => {
        let resultik: string = ''
        let botValue: number = randomaiser(3);
        let arr: string[] = ['камінь', 'ножиці', 'бумага']
        let botAnswer: string = arr[botValue]
        if(botAnswer === playerValue) resultik = `Нічия! Ви відповіли: ${playerValue}, бот: ${botAnswer}`
        else if(playerValue === 'камінь' && botAnswer === 'бумага') resultik = `Поразка! Ви відповіли: ${playerValue}, бот: ${botAnswer}`
        else if(playerValue === 'бумага' && botAnswer === 'ножиці') resultik = `Поразка! Ви відповіли: ${playerValue}, бот: ${botAnswer}`
        else if(playerValue === 'ножиці' && botAnswer === 'камінь') resultik = `Поразка! Ви відповіли: ${playerValue}, бот: ${botAnswer}`
        else resultik = `Перемога! Ви відповіли: ${playerValue}, бот: ${botAnswer}`
        let date: Date = new Date();
        localStorage.setItem(`rockitem-${rockIndex}`, `${date.getMonth()}@${date.getDate()}@${date.getHours()}@${date.getMinutes()}@${resultik}`)
        localStorage.setItem('rock-index', (+rockIndex+1)+"");
        const newLocalRock = localStorage.getItem("rock-index")
        setRockIndex(!newLocalRock ? 0 : +newLocalRock)
        setResult(resultik)
    }
    const count: React.MutableRefObject<number> = useRef(0)
    useEffect(() => {
        count.current = 0
    }, [isRotate])
    return (
        <div className="rock block">
            <div className="rock__inputs">
                <select value={playerValue} onChange={(e) => setPlayerValue(e.target.value)}>
                    <option value="камінь">Камінь</option>
                    <option value="ножиці">Ножиці</option>
                    <option value="бумага">Бумага</option>
                </select>
                <div className="rock__btn" onClick={start}>Грати</div>
                <p>{result}</p>
            </div>
            <div className="rock__history">
                <h4 onClick={() => setIsRotate(!isRotate)}>Історія битв <img className={isRotate ? 'rotate' : ''} src={triangle}/></h4>
                {isRotate &&
                    Object.keys(localStorage)
                        .filter((el) => el.includes("rockitem"))
                        .sort((a, b) => {
                            // Сортуємо за індексами у порядку спадання
                            const indexA = parseInt(a.split("-")[1]);
                            const indexB = parseInt(b.split("-")[1]);
                            return indexB - indexA;
                        })
                        .map((el, index) => {
                            const localCurrent = localStorage.getItem(el)
                            let now: string[] = !localCurrent ? [] : localCurrent.split("@");
                            console.log(now)
                            if(++count.current <= 20) { // відображаємо останні 20 елементів
                                return (
                                    <RockItem
                                        key={`${index}${now[2]}${now[3].padStart(2, "0")}${now[1]}${now[0]}${now[4]}`}
                                        date={`${now[2]}:${now[3].padStart(2,"0")} ${now[1]}.${now[0]}`}
                                        result={now[4]}
                                    />
                                );
                            } else {
                                localStorage.removeItem(el) // інші видаляємо
                            }
                        })}
            </div>
        </div>
    )
}
