import { useState, useEffect} from 'react'

type SelectRateProps = {
    isAfter: boolean;
}

type Data = {
    base_code: string;
    conversion_rates : any;
    result: string;
    terms_of_use: string;
    time_last_update_unix: number;
    time_last_update_utc: string;
    time_next_update_unix: number;
    time_next_update_utc: string;
}

export default function Trade() :JSX.Element{

    const [value, setValue] = useState<number>(0)
    const [before, setBefore] = useState<string>('USD')
    const [after, setAfter] = useState<string>('UAH')
    const [beforeValue, setBeforeCount] = useState<string>('0')
    const [data, setData] = useState<null | Data>(null)

    useEffect(() => {
        fetch('https://v6.exchangerate-api.com/v6/1e46aa9154cdf392b593a330/latest/USD')
        .then(response => response.json())
        .then(data => {setData(data)})
        .catch((error) => console.error("Помилка завантаження даних:", error));
    }, [])
    console.log(data)
    const SelectRate = ({ isAfter }:SelectRateProps) => {
        if (!data || !data.conversion_rates) {
            return <p>Loading...</p>;
          }
        return (
            <select value = {isAfter ? after : before} onChange={(e) => {isAfter ? setAfter(e.target.value) : setBefore(e.target.value)}} >
                {Object.keys(data.conversion_rates).map(el => {
                    return <option key={isAfter ? el + 'after' : el + 'before'} value={el}>{el}</option>
                })}
            </select>
        )
    }
    useEffect(() => {
        if (data && data.conversion_rates) {
            console.log(data.conversion_rates[before])
            console.log(data.conversion_rates[after])
            console.log(+data.conversion_rates[before] / +(beforeValue || 1) * data.conversion_rates[after])
            setValue(+(data.conversion_rates[after] * +(beforeValue || 1) / data.conversion_rates[before]).toFixed(2))
          }
    }, [before, after, beforeValue])
    return (
        <div className="trade__parent block">
            <input type="number" value={beforeValue} onChange={(e) => setBeforeCount(e.target.value)}/>
            <SelectRate isAfter={false}/>
            <p className="trade__result">{value}</p>
            <SelectRate isAfter={true}/>
        </div>
    )
}