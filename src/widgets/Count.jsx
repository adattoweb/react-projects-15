import { useState, useEffect } from 'react'

export default function Count(){
    const [count, setCount] = useState(+localStorage.getItem('count'))

    useEffect(() => {
      localStorage.setItem('count', count)
    }, [count])
    
    return (
        <div className="counter__parent block">
            <p>{count}</p>
            <div className="counter__menu">
                <div onClick={() => setCount(count + 1)}>+1</div>
                <div onClick={() => setCount(count - 1)}>-1</div>
                <div onClick={() => setCount(0)}>Reset</div>
            </div>
      </div>
    )
}