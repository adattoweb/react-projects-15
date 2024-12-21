import { useState, useMemo, useRef } from "react"

export default function Factorial(){
    const [result, setResult] = useState('Очікую дані')
    const [number, setNumber] = useState(0)
    const factorial = (n) => {
        if(n <= 0) {
            return 1;
        }
        return n * factorial(n-1)
    }
    const resultMemo = useMemo(() => factorial(number), [number])
    return <div className="factorial block">
        <p>Результат: {result}</p>
        <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
        <div className="factorial__btn" onClick={() => {
            setResult(resultMemo)
        }}>Порахувати</div>
    </div>
}