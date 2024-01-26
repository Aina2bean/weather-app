let today = new Date();

let weather_now = document.getElementById('weather_now');
let temp_max = document.getElementById('weather_1day__temp_max');
let temp_min = document.getElementById('weather_1day__temp_min');
function requestAPI () {
    let request_api = 'https://api.open-meteo.com/v1/forecast?latitude=35.6328&longitude=139.8813&hourly=temperature_2m,rain,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo';
    fetch(request_api)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let today_weather = data.daily.weathercode[0];
            let today_temp_max = data.daily.temperature_2m_max[0];
            let today_temp_min = data.daily.temperature_2m_min[0];
            let weekly_temp_weather = data.daily.weathercode.slice(1);
            console.log(weekly_temp_weather);
            switch (today_weather) {
                case 0:
                    weather_now.innerHTML = '晴れ';
                    break;
                case 1:
                case 2:
                case 3:
                    weather_now.innerHTML = '晴れ時々曇り';
                    break;
                case 45:
                case 48:
                    weather_now.innerHTML = '霧';
                    break;
                case 51:
                case 55:
                    weather_now.innerHTML = '霧雨';
                    break;
                case 56:
                case 57:
                    weather_now.innerHTML = '霧雨';
                    break;
                case 61:
                case 63:
                case 65:
                    weather_now.innerHTML = '雨';
                    break;
                case 66:
                case 67:
                    weather_now.innerHTML = '強い雨';
                    break;
                case 71:
                case 73:
                case 75:
                    weather_now.innerHTML = '雪';
                    break;
                case 77:
                    weather_now.innerHTML = '雪';
                    break;
                case 80:
                case 81:
                case 82:
                    weather_now.innerHTML = 'にわか雨';
                    break;
                case 85:
                case 86:
                    weather_now.innerHTML = '雪';
                    break;
                case 95:
                    weather_now.innerHTML = '雷雨';
                    break;
                case 96:
                    weather_now.innerHTML = '雷雨';
                    break;
            }

            // 高気温キャンセル危惧
            if(today_temp_max > 29){
                cancel_risk_message = '気温が大変高いです。ショー・パレードが中止になる可能性がありますので、ご注意ください！';
                temp_max.after(cancel_risk_message);
            }

            temp_max.innerHTML = today_temp_max + '℃';
            temp_min.innerHTML = today_temp_min + '℃';

            for(let i = 0; i <= 5; i++){
                let weekly_element = document.createElement('div');
                weekly_element.innerHTML = '<div>' + weekly_temp_weather[i] + '</div>';
                document.getElementById('weather_weekly').appendChild(weekly_element);
            }
        });
}
requestAPI();