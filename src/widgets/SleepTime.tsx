import { useState, useEffect, ReactNode } from 'react'

import deleteImg from '../assets/delete.png'
import editImg from '../assets/edit.png'
import triangle from '../assets/triangle.png'
import moon from '../assets/moon.png'
import sun from '../assets/sun.png'
import add from '../assets/add.png'

type HistoryItemType = {
    emins: string;
    ehours: string;
    eday: string;
    emonth: string;
    smins: string;
    shours: string;
    sday: string;
    smonth: string;
    id: string;
}
type StatProps = Omit<HistoryItemType, "id"> & {
    children: ReactNode;
    index: string;
}

export default function SleepTime() :JSX.Element{
    if(!localStorage.getItem('sleep-last')){
        localStorage.setItem('sleep-last', '22!00!14!12-23!05!15!12')
    }
    if(!localStorage.getItem('sleep-index')){
        localStorage.setItem('sleep-index', '1')
    }
    const localLast = localStorage.getItem('sleep-last')
    const localIndex = localStorage.getItem('sleep-index')
    const [isHistory, setIsHistory] = useState<boolean>(false)
    const [start, setStart] = useState<string>(!localLast ? "" : localLast)
    const [end, setEnd] = useState<string>(!localLast ? "" : localLast.split('-')[1])
    const [change, setChange] = useState<number>(0)
    const [historyArr, setHistoryArr] = useState<HistoryItemType[]>([])
    const [error, setError] = useState('')
    console.log(start, end)
    // @ts-ignore
    if(!localLast.includes('-')){ // скаржиться на null, але він null дорівнювати не може!!!
        localStorage.setItem('sleep-last', `${localStorage.getItem('sleep-last')}-??!??!??!??`)
        // @ts-ignore
        setEnd(localStorage.getItem('sleep-last').split('-')[1])
    }
    const StatItem = ({ shours, smins, sday,smonth,ehours, emins, eday, emonth, children, index }: StatProps) :JSX.Element => {
        const [isEdit, setIsEdit] = useState(false)
        const [startValue, setStartValue] = useState('')
        const [endValue, setEndValue] = useState('')
        const deleteItem = () => {
            localStorage.removeItem(`sleep-item-${index}`)
            setChange(change + 1)
            console.log(index)
        }
        const editItem = () => {
            if(isEdit === true && startValue.length >= 4 && startValue.includes(':') && endValue.length >= 4 && endValue.includes(':') && startValue.length < 6 && endValue.length < 6 && !startValue.includes('!') && !endValue.includes('!')){
                setError('')
                console.log(index)
                // @ts-ignore
                let lastArr: string[][] = localStorage.getItem(`sleep-item-${index}`).split('-').map(el => el.split('!'))
                let startDate: string[] = [lastArr[0][2], lastArr[0][3]]
                let endDate: string[] = [lastArr[1][2], lastArr[1][3]]
                if(+endValue.split(':')[0] < +startValue.split(':')[0]) {
                    endDate = [(+lastArr[1][2]+1) + "", lastArr[1][3]]
                    console.log(endDate)
                } else {
                    endDate = [lastArr[0][2], lastArr[1][3]]
                    console.log(endDate)
                }
                localStorage.setItem(`sleep-item-${index}`, `${startValue.replace(':', '!')}!${startDate[0]}!${startDate[1]}-${endValue.replace(':', '!')}!${endDate[0]}!${endDate[1]}!end`)
                setChange(change+1)
            } else if(isEdit === true && startValue.length !== 0 && endValue.length !== 0) setError('Уведіть правильно дані! Подивіться підказку!')
        }
        return (
            <div className="statitem">
                {isEdit ? 
                <div className="statitem__inputs">
                    <input type="text" placeholder="22:30" value={startValue} onChange={(e) => {setStartValue(e.target.value)}}/>
                    <input type="text" placeholder="8:30" value={endValue} onChange={(e) => {setEndValue(e.target.value)}}/>
                </div>
                :
                <><span>{shours}:{smins} {sday}.{smonth} - {ehours}:{emins} {eday}.{emonth}</span><p>{children}</p></>
            }
                <div className="statitem__images"><img src={deleteImg} onClick={deleteItem} alt="" /> <img src={editImg} alt="" onClick={() => {
                editItem()
                setIsEdit(!isEdit)
            }} />
            </div></div>
        )
    }


    const startSleep = () => {
        let date = new Date;
        localStorage.setItem('sleep-last',`${date.getHours()}!${date.getMinutes()}!${date.getDate()}!${date.getMonth() + 1}`)
        // @ts-ignore
        setStart(localStorage.getItem('sleep-last'))
    }
    const endSleep = () => {
        let date = new Date;
        // @ts-ignore
        console.log(localStorage.getItem('sleep-last').split('-').join('-'))
        // @ts-ignore
        localStorage.setItem('sleep-last', `${localStorage.getItem('sleep-last').replace('-??!??!??!??', '')}`)
        // @ts-ignore
        if(localStorage.getItem('sleep-last').includes('end')){
            // @ts-ignore
            localStorage.setItem('sleep-last', localStorage.getItem('sleep-last').split('-')[0])
        }
        localStorage.setItem('sleep-last', `${localStorage.getItem('sleep-last')}-${date.getHours()}!${date.getMinutes()}!${date.getDate()}!${date.getMonth() + 1}!end`)
        // @ts-ignore
        setEnd(localStorage.getItem('sleep-last').split('-')[1])
    }
    const addSleep = () => {
        localStorage.setItem(`sleep-item-${localStorage.getItem('sleep-index')}`, `${localStorage.getItem('sleep-last')}`)
        // @ts-ignore
        localStorage.setItem('sleep-index', +localStorage.getItem('sleep-index') + 1)
        setChange(change + 1)
    }

    useEffect(() => {
        const loadedSleeps = []
        for(let el in localStorage){
            if(el.includes('sleep-item')){
                let id = el.replace('sleep-item-', '')
                if(localStorage.getItem(el)){
                    // @ts-ignore
                    let twoArr = localStorage.getItem(el).split('-')
                    if(twoArr[1]) {
                        const [shours, smins, sday, smonth] = twoArr[0].split('!')
                        const [ehours, emins, eday, emonth] = twoArr[1].split('!')
                        loadedSleeps.push({shours, smins, sday, smonth, ehours, emins, eday, emonth, id})
                    }
                }
            }
        }
        console.log(loadedSleeps)
        setHistoryArr(loadedSleeps)
    }, [change])
    const [result, setResult] = useState('')

    useEffect(() => {
        if(!end.includes('??')){
        
        let arr1 = start.split('-')[0].split('!')
        let arr2 = end.split('!')
        let allMins = (+arr2[0] - +arr1[0]) * 60 + (+arr2[1] - +arr1[1])
        let allHours = Math.floor(allMins / 60)
        setResult(`Ви спали ${allHours < 0 ? 24 - allHours+allHours+allHours : allHours} ${allHours === 1 || allHours === 0 ? 'годину' : allHours >= 5 ? 'годин' : 'години'} ${allMins - allHours * 60} ${allMins - allHours * 60 > 5 ? 'хвилин' : allMins - allHours * 60 === 1 ? 'хвилину' : 'хвилини'}`)
        }
    }, [start, end])
    return (
        <div className="sleeptime__parent block">
            <div className="sleeptime__info">
                <div className="sleeptime__time">
                    <p>{`${start.split('!')[0].padStart(2, '0')}:${start.split('!')[1].padStart(2, '0')}`}</p>
                    <p>-</p>
                    <p>{`${end.split('!')[0].padStart(2, '0')}:${end.split('!')[1].padStart(2, '0')}`}</p>
                </div>
                <div className="sleeptime__result">
                    <p>{result}</p>
                    {error.length !== 0 && <p>{error}</p>}
                </div>
                <div className="sleeptime__menu">
                    <div className="sleeptime__btn" onClick={startSleep}><img src={moon}/></div>
                    <div className="sleeptime__btn" onClick={endSleep}><img src={sun}/></div>
                    <div className="sleeptime__btn" onClick={addSleep}><img src={add}/></div>
                </div>
            </div>
            <div className="sleeptime__stats">
                <h4 onClick={() => setIsHistory(!isHistory)}>Історія <img  className={isHistory ? 'imgactive' : ''} src={triangle}/></h4>
                {isHistory && 
                historyArr.sort((a, b) => +a.id - +b.id).reverse().map((el, index) => {
                    let allMins = (+el.ehours - +el.shours) * 60 + (+el.emins - +el.smins)
                    let allHours = Math.floor(allMins / 60)
                    return (
                        <StatItem index={el.id} key={index} shours={el.shours.padStart(2, '0')} smins={el.smins.padStart(2, '0')} sday={el.sday} smonth={el.smonth}
                        ehours={el.ehours.padStart(2, '0')} emins={el.emins.padStart(2, '0')} eday={el.eday} emonth={el.emonth}>
                            {el.emins.includes('?') ? '??' : allHours < 0 ? 24 - allHours+allHours+allHours : allHours} {allHours === 1 ? 'годину' : allHours >= 4 || allHours === 0 ? 'годин' : 'години'} {el.emins.includes('?') ? '??' : allMins - allHours * 60} {allMins - allHours * 60 > 5 ? 'хвилин' : allMins - allHours * 60 === 1 ? 'хвилину' : 'хвилини'}
                        </StatItem>
                    )
                })}
            </div>
        </div>
    )
}