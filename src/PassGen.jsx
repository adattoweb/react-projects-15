import {useState} from 'react'

export default function PassGen(){
    const [result, setResult] = useState('')
    const [passLen, setPassLen] = useState('')
    const [isLetters, setIsLetters] = useState(false)
    const [isNumbers, setIsNumbers] = useState(false)
    const [isSpecial, setIsSpecial] = useState(false)
    const [isCaps, setIsCaps] = useState(false)
    const genPass = () => {
        if(!isLetters && !isNumbers && !isSpecial) setResult('Оберіть 1 чекбокс хоча б.')
        else if(!passLen || +passLen > 300) setResult('Щось не так з полем довжина паролю. Макс. значення: 300')
        else {
            setResult('');
            let str = '';
            if(isNumbers) str+= '01234567890123456789'
            if(isLetters) str+= 'abcdefghijklmnopqrstuvwxyz' 
            if(isSpecial) str+= '!@#$%^&*()?!@#$%^&*()?++--'
            if(isCaps) str += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            let res = '';
            for(let i = 0; i < passLen; i++){
                res += str[Math.floor(Math.random() * str.length)]
            }
            setResult(`Ваш пароль: ${res}`)
        }
    }
    return (
        <div className="passgen block">
            <div className="passgen__inputs">
                <p>{result}</p>
                <div className="passgen__input">
                    <input type="number" placeholder='Довжина паролю' value={passLen} onChange={(e) => setPassLen(e.target.value)}/>
                </div>
                <div className="passgen__input">
                    <label>З буквами</label>
                    <input type="checkbox" checked={isLetters} onChange={(e) => setIsLetters(!isLetters)} />
                </div>
                <div className="passgen__input">
                    <label>З великими буквами</label>
                    <input type="checkbox" checked={isCaps} onChange={(e) => setIsCaps(!isCaps)} />
                </div>
                <div className="passgen__input">
                    <label>З цифрами</label>
                    <input type="checkbox" checked={isNumbers} onChange={(e) => setIsNumbers(!isNumbers)}/>
                </div>
                <div className="passgen__input">
                    <label>З спеціальними символами</label>
                    <input type="checkbox" checked={isSpecial} onChange={(e) => setIsSpecial(!isSpecial)} />
                </div>
                <div className="passgen__btn" onClick={genPass}>Згенерувати</div>
            </div>
        </div>
    )
}