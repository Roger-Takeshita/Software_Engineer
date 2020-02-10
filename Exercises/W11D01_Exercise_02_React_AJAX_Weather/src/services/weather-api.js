export function getWeatherByLatLng(lat, lng) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=32d34cbdde2fb153dd3291ff7dce2540`, { mode:'cors' })
           .then(res=> res.json());
}