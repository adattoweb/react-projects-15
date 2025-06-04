import { useState } from "react"

export default function Factorial():JSX.Element {
    const [result, setResult] = useState<string>('Очікую дані')
    const [number, setNumber] = useState<number | "">(0)
    const factorial = (n: number | ""): number => {
        if(n !== ""){
            if (n <= 0) {
                return 1;
            }
            return n * factorial(n - 1)
        }
        return 1
    }
    return (
        <div className="factorial block">
            <p>Результат: {result}</p>
            <input type="text" value={number} onChange={(e) => {
                const inputValue = e.target.value
                if(!isNaN(+inputValue) && +inputValue <= 100) {
                    setNumber(inputValue.length === 0 ? "" : +inputValue)
                }
            }} />
            <div className="factorial__btn" onClick={() => {
                setResult(factorial(number)+"")
            }}>Порахувати</div>
        </div>
    )
}