import {useState, useEffect} from 'react'

export default function PassCheck(){
    const [userPass, setUserPass] = useState('')
    const [result, setResult] = useState('Вставте пароль')
    useEffect(() => {
        const isUsing = {
            numbers: false,
            letters: false,
            caps: false,
            special: false
        }
        let balls = 0;
        balls += userPass.length * 2
        let letters = 'abcdefghijklmnopqrstuvwxyz'
        let caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let numbers = '0123456789'
        let special = '!@#$%^&*()?/{}[]+-'
        let blackStr = ''
        let badPass = ['12345678', 'qwerty123', 'qwerty', '1234', '12345', '1234567890', '123456', '1234567', '12345678', '123456789', '1', '12', '123']
        for(let i = 0; i < userPass.length; i++){
            if(letters.includes(userPass[i])){
                if(!blackStr.includes(userPass[i])){
                    balls += 1.5
                    blackStr += userPass[i]
                }
                else balls += 1
                isUsing.letters = true;
            }
            if(caps.includes(userPass[i])){
                if(!blackStr.includes(userPass[i])){
                    balls += 2.5
                    blackStr += userPass[i]
                }
                else balls += 2
                isUsing.caps = true
            }
            if(numbers.includes(userPass[i])){
                if(!blackStr.includes(userPass[i])){
                    balls += 1.5
                    blackStr += userPass[i]
                }
                else balls += 1
                isUsing.numbers = true
            }
            if(special.includes(userPass[i])){
                if(!blackStr.includes(userPass[i])){
                    balls += 7
                    blackStr += userPass[i]
                }
                else balls += 5
                isUsing.special = true;
            }
        }
        balls = Math.round(balls)
        if(isUsing.letters) balls += 3;
        else balls -= 8;
        if(isUsing.caps) balls += 5;
        else balls -= 15;
        if(isUsing.special) balls += 12;
        else balls -= 20;
        if(isUsing.numbers) balls += 5
        else balls -= 10
        if(userPass.length < 5) balls -= 20;
        else if(userPass.length < 8 && userPass.length >= 5) balls -= 5
        else if(userPass.length < 15 && userPass.length >= 8) balls += 20;
        else if(userPass.length < 20 && userPass.length >= 15) balls += 30;
        else if(userPass.length >= 20) balls+= 35
        console.log(balls)
        if(balls < 0) balls = 0;
        if(balls >= 0) setResult(`Рівень захисту: Дуже поганий. Ваш пароль набрав ${balls} балів`)
        if(balls >= 10) setResult(`Рівень захисту: Поганий. Ваш пароль набрав ${balls} балів`)
        if(balls >= 20) setResult(`Рівень захисту: Нормальний. Ваш пароль набрав ${balls} балів`)
        if(balls >= 35) setResult(`Рівень захисту: Надійний. Ваш пароль набрав ${balls} балів`)
        if(balls >= 60) setResult(`Рівень захисту: Дуже надійний. Ваш пароль набрав ${balls} балів`)
        if(balls >= 80) setResult(`Рівень захисту: Дуже-дуже надійний. Ваш пароль набрав ${balls} балів`)
        if(balls >= 100) setResult(`Рівень захисту: Незламний. Ваш пароль набрав ${balls} балів`)
        if(badPass.includes(userPass)) setResult(`Рівень захисту: Дуже поганий. Ваш пароль набрав 0 балів`)
    }, [userPass])
    return (
        <div className="passgen block">
            <div className="passgen__inputs">
                <p>{result}</p>
                <div className="passgen__input">
                    <input type="text" placeholder='Пароль' value={userPass} onChange={(e) => setUserPass(e.target.value)}/>
                </div>
            </div>
        </div>
    )
}