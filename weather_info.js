let today = new Date();

let weather_now = document.getElementById('weather_now'); // 今現在の天気
let temp_max = document.getElementById('weather_1day__temp_max'); // 最高気温
let temp_min = document.getElementById('weather_1day__temp_min'); // 最低気温

// constでは変数の宣言のみは出来ないのでletを使う。
let url; // 読み込むAPI

function requestAPI() {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let today_weather = data.daily.weathercode[0];
            console.log('今日の天気コードは' + today_weather);
            let today_temp_max = data.daily.temperature_2m_max[0];
            let today_temp_min = data.daily.temperature_2m_min[0];
            let weekly_temp_weather = data.daily.weathercode.slice(1);
            console.log(weekly_temp_weather);

            function weather_code(result){
                let result_data;
                switch (result) {
                    case 0:
                        return result_data = ['sunny','晴れ'];
                    case 1:
                    case 2:
                    case 3:
                        return result_data = ['partly_cloudy_day','晴れ時々曇り'];
                    case 45:
                    case 48:
                        return result_data = ['foggy','霧'];
                    case 51:
                    case 53:
                    case 55:
                    case 56:
                    case 57:
                        return result_data = ['rainy','霧雨'];
                    case 61:
                    case 63:
                    case 65:
                        return result_data = ['rainy','雨'];
                    case 66:
                    case 67:
                        return result_data = ['rainy','強い雨'];
                    case 71:
                    case 73:
                    case 75:
                    case 77:
                        return result_data = ['weather_snowy','雪'];
                    case 80:
                    case 81:
                    case 82:
                        return result_data = ['rainy','にわか雨'];
                    case 85:
                    case 86:
                        return result_data = ['weather_snowy','雪'];
                    case 95:
                    case 96:
                        return result_data = ['thunderstorm','雷雨'];
                }
            }
            document.getElementsByClassName('material-symbols-outlined')[0].innerHTML = weather_code(today_weather)[0];
            temp_max.innerHTML = today_temp_max + '℃';
            temp_min.innerHTML = today_temp_min + '℃';

            // 週間の天気予報
            const weekly_area = document.getElementById('weather_weekly');
            console.log(weekly_area);
            if(weekly_area.childNodes.length == 5){
                //console.log('既に過去のデータが入っています！'); // 切り替え確認用
                const weekly_list = document.getElementById('weather_weekly');
                while(weekly_list.firstChild){
                    weekly_list.removeChild(weekly_list.firstChild);
                }
                for(let i = 1; i <= 5; i++){
                    let weekly_element = document.createElement('div');
                    let weekly_date = (today.getMonth() + 1) + '/' + (today.getDate() + i);
                    weekly_element.innerHTML = '<div class="weather_weekly_list">' + weekly_date + weather_code(weekly_temp_weather[i])[1] + '</div>';
                    document.getElementById('weather_weekly').appendChild(weekly_element);
                }
            } else {
                for(let i = 1; i <= 5; i++){
                    let weekly_element = document.createElement('div');
                    let weekly_date = (today.getMonth() + 1) + '/' + (today.getDate() + i);
                    weekly_element.innerHTML = '<div class="weather_weekly_list">' + weekly_date + weather_code(weekly_temp_weather[i])[1] + '</div>';
                    document.getElementById('weather_weekly').appendChild(weekly_element);
                }
            }

            document.getElementById('information_wrap').classList.add('open'); //取得した結果を画面上に表示。
        });
}

// 押された地域を取得後、それぞれの地域のAPIを取ってきて画面上に出す。
const select_button = document.querySelectorAll('button');
for(let number = 0; number < select_button.length; number++){
    select_button[number].addEventListener('click', function(e){
        console.log(e.target.value);
        const select_map = e.target.value;
        switch(select_map){
            case 'maihama':
                url = 'https://api.open-meteo.com/v1/forecast?latitude=35.6328&longitude=139.8813&hourly=temperature_2m,rain,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo';
                requestAPI();
                break;
            case 'minatomirai':
                url = 'https://api.open-meteo.com/v1/forecast?latitude=35.4596&longitude=139.6303&hourly=temperature_2m,rain,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo';
                requestAPI();
                break;
            case 'osaka':
                url = 'https://api.open-meteo.com/v1/forecast?latitude=34.6937&longitude=135.5022&hourly=temperature_2m,rain,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo';
                requestAPI();
                break;
            default:
                console.log('失敗しました。ブラウザを更新するなどして再度お試しください。');
        }
    });
}