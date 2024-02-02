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

            function weather_code(result){
                switch (result) {
                    case 0:
                        //weather_now.innerHTML = '晴れ';
                        return '晴れ';
                        //break;
                    case 1:
                    case 2:
                    case 3:
                        //weather_now.innerHTML = '晴れ時々曇り';
                        return '晴れ時々曇り';
                        //break;
                    case 45:
                    case 48:
                        //weather_now.innerHTML = '霧';
                        return '霧';
                        //break;
                    case 51:
                    case 53:
                    case 55:
                    case 56:
                    case 57:
                        //weather_now.innerHTML = '霧雨';
                        return '霧雨';
                        //break;
                    case 61:
                    case 63:
                    case 65:
                        //weather_now.innerHTML = '雨';
                        return '雨';
                        //break;
                    case 66:
                    case 67:
                        //weather_now.innerHTML = '強い雨';
                        return '強い雨';
                        //break;
                    case 71:
                    case 73:
                    case 75:
                    case 77:
                        //weather_now.innerHTML = '雪';
                        return '雪';
                        //break;
                    case 80:
                    case 81:
                    case 82:
                        //weather_now.innerHTML = 'にわか雨';
                        return 'にわか雨';
                        //break;
                    case 85:
                    case 86:
                        //weather_now.innerHTML = '雪';
                        return '雪';
                        //break;
                    case 95:
                    case 96:
                        //weather_now.innerHTML = '雷雨';
                        return '雷雨';
                        //break;
                }
            }
            weather_now.innerHTML = weather_code(today_weather);

            // 高気温キャンセル危惧
            if(today_temp_max > 29){
                cancel_risk_message = '気温が大変高いです。ショー・パレードが中止になる可能性がありますので、ご注意ください！';
                temp_max.after(cancel_risk_message);
            }

            temp_max.innerHTML = today_temp_max + '℃';
            temp_min.innerHTML = today_temp_min + '℃';

            // 週間の天気予報
            for(let i = 1; i <= 5; i++){
                let weekly_element = document.createElement('div');
                let weekly_date = (today.getMonth() + 1) + '/' + (today.getDate() + i);

                weekly_element.innerHTML = '<div>' + weekly_date + weather_code(weekly_temp_weather[i]) + '</div>';
                document.getElementById('weather_weekly').appendChild(weekly_element);
            }
        });
}
requestAPI();