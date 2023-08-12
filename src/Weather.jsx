import React, { useState } from 'react'
import './Weather.css'

const Weather = () => {
  const[query,setQuery]=useState('');
  const[weather,setWeather]=useState({});
  const api={
    key:'58f676e621cdfb6b50a282853bc40745',
    base:'https://api.openweathermap.org/data/2.5/'
  }
  const search=(event)=>{
   if (event.key==='Enter') {
    fetch(`${api.base}weather?q=${query}&units=metric
    &APPID=${api.key}`)
    .then(res=>res.json())
    .then(result=>{
      setWeather(result);
      setQuery('');
      console.log(result);
    })
    
   }
   
   

  }
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
    
  };
  const getImage = () => {
    switch(weather.weather?.[0]?.main) {
      case 'Clear':
        return 'https://cdn-icons-png.flaticon.com/128/4814/4814268.png';
      case 'Rain':
      case 'Drizzle':
      case 'Mist':
        return 'https://cdn-icons-png.flaticon.com/128/1146/1146858.png';
      case 'Clouds':
        return 'https://cdn-icons-png.flaticon.com/128/3313/3313983.png';
      default:
        return 'https://cdn-icons-png.flaticon.com/128/6974/6974859.png';
    }
  }
  
  

  return (
    <main className={weather.weather?.[0]?.main}>
      <div className='search-box'>
        <input type='text' placeholder='Search here...'
          value={query} onChange={e => setQuery(e.target.value)}
          onKeyPress={search} className='search-bar' />
      </div>
      {(typeof weather.main != 'undefined') ? (
        <div className='main'>
          <div className='location-box'>
            <div className='location'>
              {weather.name && weather.sys && weather.sys.country ?
                `${weather.name}, ${weather.sys.country}` : ""}
            </div>
            <div className='date'>
              {dateBuilder(new Date())}
            </div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
              {Math.round(weather.main.temp - 273.15)} Celcius
            </div>
            <img src={getImage()} alt="weather condition icon" />
            <div>{weather.weather[0].main}</div>
          </div>
        </div>) : ('')}
    </main>
  )
}

export default Weather