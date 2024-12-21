import {useState,useEffect} from 'react'

export default function FlashCards(){
    const [answer, setAnswer] = useState('')
    const [question, setQuestion] = useState('')
    const [imageurl, setImageurl] = useState('')
    const [change, setChange] = useState(0)
    const [errorText, setErrorText] = useState('')
    const [flashArr, setFlashArr] = useState([])
    const [flashIndex, setFlashIndex] = useState(0)
    const [isEdit, setIsEdit] = useState(true)
    const FlashItem = ({iquestion, ianswer, iimageurl}) => {
        const [isAnswer, setIsAnswer] = useState(false)
        return (
            <div className="flashitem">
                <h4>{iquestion}</h4>
                {iimageurl.length !== 0 && <img src={iimageurl} alt="Зображення" />} {//https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Eo_circle_red_number-2.svg/768px-Eo_circle_red_number-2.svg.png
                }
                {isAnswer && <p>{ianswer}</p>}
                <div className="flashitem__buttons">
                    <div className="flashcard__button" onClick={() => setIsAnswer(!isAnswer)}>Відповідь</div>
                    <div className="flashcard__button" onClick={() => setFlashIndex(flashIndex + 1)}>Далі</div>
                </div>
                
            </div>
        )
    }
    useEffect(() => {
        if(change > 0){
            if(answer.length < 2 || question.length < 2) {
                setErrorText('Введіть дані!');
            } else{
            setErrorText('Успішна операція!')
            localStorage.setItem(`flash-${answer}`, `${question}!${answer}!${imageurl}`)
            }
        }
    }, [change])
    useEffect(() => {
        let loadedArr = []
        Object.keys(localStorage).map(el => {
            if(el.includes('flash')){
                let arr = localStorage.getItem(el).split('!')
                console.log(arr)
                loadedArr.push(arr)
            }
        })
        setFlashArr(loadedArr)
    }, [])
    return (
        <div className="flashcard__parent block">
            {!isEdit && <p onClick={() => setIsEdit(true)} className="editing">Режим редагування</p> }
            {isEdit &&
            <>
             <h4>Створення карточки</h4>
            <div className="flashcard__inputs">
                <input type="text" placeholder="Питання" value={question} onChange={(e) => setQuestion(e.target.value)}/>
                <input type="text" placeholder="Відповідь" value={answer} onChange={(e) => setAnswer(e.target.value)}/>
                <input type="text" placeholder="URL зображення (необов`язково)" value={imageurl} onChange={(e) => setImageurl(e.target.value)}/>
                {errorText.length > 1 && <p>{errorText}</p>}
                <div className="flashcard__button" onClick={() => setChange(change+1)}>Створити</div>
                <div className="flashcard__button" onClick={() => setIsEdit(false)}>Режим перегляду</div>
            </div></>
            }
            {!isEdit && flashIndex >= flashArr.length ? <div className="flashcard__button abugaga" onClick={() => setFlashIndex(0)}>Спочатку</div> :
            !isEdit && <FlashItem iquestion={flashArr[flashIndex][0]} ianswer={flashArr[flashIndex][1]} iimageurl={flashArr[flashIndex][2]}/>}
        </div>
    )
}