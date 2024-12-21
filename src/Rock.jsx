import {useState} from 'react'
import triangle from './assets/triangle.png'

export default function Rock(){
    if(localStorage.getItem('rock-index') === null){
        localStorage.setItem('rock-index', '0')
    }
    const [isRotate, setIsRotate] = useState(false)
    const [playerValue, setPlayerValue] = useState('камінь')
    const [result, setResult] = useState('Чекаю боя...')
    const [rockIndex, setRockIndex] = useState(localStorage.getItem('rock-index'))
    const RockItem = ({date, result}) => {
        return (
            <div className="rock__item">
                <span>{date}</span>
                <p>{result}</p>
            </div>
        )
    }
    const randomaiser = (max) => {
        return Math.floor(Math.random() * max);
      }
    const start = () => {
        let resultik = ''
        let botValue = randomaiser(3);
        let arr = ['камінь', 'ножиці', 'бумага']
        botValue = arr[botValue]
        if(botValue === playerValue) resultik = `Нічия! Ви відповіли: ${playerValue}, бот: ${botValue}`
        else if(playerValue === 'камінь' && botValue === 'бумага') resultik = `Поразка! Ви відповіли: ${playerValue}, бот: ${botValue}`
        else if(playerValue === 'бумага' && botValue === 'ножиці') resultik = `Поразка! Ви відповіли: ${playerValue}, бот: ${botValue}`
        else if(playerValue === 'ножиці' && botValue === 'камінь') resultik = `Поразка! Ви відповіли: ${playerValue}, бот: ${botValue}`
        resultik = `Перемога! Ви відповіли: ${playerValue}, бот: ${botValue}`
        let date = new Date();
        localStorage.setItem(`rockitem-${rockIndex}`, `${date.getMonth()}@${date.getDate()}@${date.getHours()}@${date.getMinutes()}@${resultik}`)
        localStorage.setItem('rock-index', +rockIndex+1);
        setRockIndex(localStorage.getItem('rock-index'))
        setResult(resultik)
    }
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
                            let now = localStorage.getItem(el).split("@");
                            return (
                                <RockItem
                                    key={`${index}${now[2]}${now[3].padStart(2, "0")}${now[1]}${now[0]}${now[4]}`}
                                    date={`${now[2]}:${now[3].padStart(
                                        2,
                                        "0"
                                    )} ${now[1]}.${now[0]}`}
                                    result={now[4]}
                                />
                            );
                        })}
            </div>
        </div>
    )
}