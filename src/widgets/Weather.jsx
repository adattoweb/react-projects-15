import { useState,useEffect } from 'react'

export default function Weather(){

    const [isDetail, setIsDetail] = useState(false)
    const [city, setCity] = useState('Kyiv')
    const [data, setData] = useState(null)
    const [change, setChange] = useState(false)
    const apiKey = '0b2c4c40a5abb371c86d59d1c936eadf'
    
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {setData(data)})
        .catch((error) => console.error("Помилка завантаження даних:", error));
    }, [change])
    console.log(data)
    console.log(city)
    if(data === null) return <p>Завантаження...</p>
    if(data.message !== undefined) return (
        <div className="weather__parent block">
        <div className="weather__input">
            <label>Пункт</label>
            <input type="text" placeholder="(Місто, село, тощо) англ." value={city} onChange={(e) => setCity(e.target.value)} />
            <div className="weather__button" onClick={() => setChange(!change)}>Оновити</div>
        </div>
        <div className="weather__result"><p>Назва вказана не правильно!</p></div>
    </div>
    )
    return (
        <div className="weather__parent block">
            <div className="weather__input">
                <label>Пункт</label>
                <input type="text" placeholder="(Місто, село, тощо) англ." value={city} onChange={(e) => setCity(e.target.value)} />
                <div className="weather__button" onClick={() => setChange(!change)}>Оновити</div>
            </div>
            <div className="weather__result">
                {!isDetail &&
                <div className="weather__main">
                    <h3>Основне</h3>
                    <p>Поточна температура: {data.main.temp}°C почувається як {data.main.feels_like}°C</p>
                    <p>Вологість: {data.main.humidity}%</p>
                    <p>Швидкість вітру: {data.wind.speed} м/с</p>
                    <p>Стан погоди: {data.weather[0].main}</p>
                    <div className="weather__button" onClick={() => setIsDetail(true)}>Детальніше</div>
                </div>
                }
                {isDetail && 
                <div className="weather_detail">
                    <h3>Детальніше</h3>
                    <h4>Температура</h4>
                    <p>Мінімальна: {data.main.temp_min}°C</p>
                    <p>Поточна: {data.main.temp}°C почувається як {data.main.feels_like}°C</p>
                    <p>Максимальна: {data.main.temp_max}°C</p>
                    <h4>Вітер</h4>
                    <p>Градуси вітру: {data.wind.deg}°</p>
                    <p>Порив вітру: {data.wind.gust}</p>
                    <p>Швидкість вітру: {data.wind.speed} м/с</p>
                    <h4>Інше</h4>
                    <p>Вологість: {data.main.humidity}%</p>
                    <p>Тиск: {data.main.pressure} гПа</p>
                    <p>Стан погоди: {data.weather[0].main}</p>
                    <div className="weather__button" onClick={() => setIsDetail(false)}>Основне</div>
                </div>
                }
            </div>
        </div>
    )
}