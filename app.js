let cityName=document.querySelector(".weather-city");
let date=document.querySelector(".weather-date");
let w_forecast=document.querySelector(".weather-forecast");
let w_temperature=document.querySelector(".weather-temperature");
let w_icon=document.querySelector(".weather-icon");
let w_minTem=document.querySelector(".weather-min");
let w_maxTem=document.querySelector(".weather-max");
let w_feel=document.querySelector(".weather_feelsLike");
let w_hummudity=document.querySelector(".weather_humidity");
let w_wind=document.querySelector(".weather_wind");
let w_pressure =document.querySelector(".weather_pressure");
let citysearch=document.querySelector(".weather-search")
const getCountryName=(code)=>{
 return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}
const getDateTime=(dt)=>{
 const curDate=new Date(dt*1000)
 const options={
    weekday:"long",
    year:"numeric",
    month:"long",
    day:"numeric",
    hour:"numeric",
    minute:"numeric"
 }
 const formatter=new Intl.DateTimeFormat('en-US',options);
 const formateDate=formatter.format(curDate)
 return formateDate;
}
let city="pune"

citysearch.addEventListener("submit",(e)=>{
    e.preventDefault();
    let city_name=document.querySelector(".input-search")
    city=city_name.value;
    getweatherData();
    city_name.value=""
})
const getweatherData= async()=>{
    const weatherurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=1e4860411e4a948b1bff3234fd373b6c`

    try{
        const res=await fetch(weatherurl)
        const data= await res.json()
        console.log(data)
        const {main,name,weather,wind,sys,dt}=data
        cityName.innerHTML=`${name},${getCountryName(sys.country)}`
  date.innerHTML=getDateTime(dt);
  w_temperature.innerHTML= `${main.temp}&#176`;
  w_minTem.innerHTML=` Min : ${main.temp_min}&#176`;
  w_maxTem.innerHTML=` Max : ${main.temp_max}&#176`;
  w_forecast.innerHTML=`${weather[0].main}`;
  w_icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`
w_feel.innerHTML=`${main.feels_like}&#176`;
w_hummudity.innerHTML=`${main.humidity}%`;
w_pressure.innerHTML=`${main.pressure} m/s`;
w_wind.innerHTML=`${wind.speed} hPa`

    }catch(error){
        console.log(error)
    }
}
document.body.addEventListener("load",getweatherData())