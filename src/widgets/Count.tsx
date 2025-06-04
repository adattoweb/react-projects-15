import { useState, useEffect } from 'react'

export default function Count(): JSX.Element {
  const localCount = localStorage.getItem("count")
  if(!localCount) localStorage.setItem("count", "0")
  const [count, setCount] = useState<number>(!localCount ? 0 : +localCount)

  useEffect(() => {
    localStorage.setItem("count", count+"")
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