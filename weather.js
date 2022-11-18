window.addEventListener('load', () => {

    let temperature = document.querySelector(".temp");
    let summary = document.querySelector(".summary");
    let icon = document.querySelector(".icon");
    const kelvin = 273;
    let bodyContent = document.querySelector(".body");
    let today = document.querySelector(".today")
    let todayIcon = document.querySelector(".todayIcon");
    let tomorrowIcon = document.querySelector(".tomorrowIcon");
    let twoIcon = document.querySelector(".twoIcon");
    let threeIcon = document.querySelector(".threeIcon");
    let fourIcon = document.querySelector(".fourIcon");



    //future days
    let tomorrow = document.querySelector(".tomorrowText")
    let tomorrowTemp = document.querySelector(".tomorrowTemp")
    let twoTemp = document.querySelector(".twoTemp")
    let twoDays = document.querySelector(".twoDaysText")
    let threeTemp = document.querySelector(".threeTemp")
    let threeDays = document.querySelector(".threeDaysText")
    let fourDays = document.querySelector(".fourDaysText")
    let fourTemp = document.querySelector(".fourTemp")



    let cn = document.querySelector("#city_name");
    let sc = document.querySelector("#state_code");
    let cc = document.querySelector("#country_code");
    let limit = 1;

    //add date to DOM
    let date = new Date().toLocaleDateString();
    let dateP = document.querySelector(".date");
    dateP.innerHTML = date;

    //add day to DOM
    const weekday = ["Sunday   ", "Monday   ", "Tuesday   ", "Wednesday", "Thursday ", "Friday   ", "Saturday ", "Sunday   ", "Monday   ", "Tuesday   ", "Wednesday", "Thursday ", "Friday   ", "Saturday "];
    const d = new Date();
    let day = weekday[d.getDay()];
    let dayP = document.querySelector(".day");
    dayP.innerHTML = day;

    //get time
    var getTime = new Date();
    var time = getTime.getHours()
    console.log(time);

    const submitBtn = document.querySelector("#submit");

    const apiKey = "1b866433f41d3714d9bb5a050b35cd66";

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        let city_name = cn.value;
        let state_code = sc.value;
        let country_code = cc.value;


        //add city to DOM
        let cityP = document.querySelector(".place");
        cityP.innerHTML = city_name;
        cityP.style.textTransform = 'capitalize';

        //get latitude and longitude
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name},${state_code},${country_code}&limit=${limit}&appid=${apiKey}`).then(response => {
                const lon = response.data[0].lon;
                const lat = response.data[0].lat;
                //get weather data
                let cnt = 4;
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`).then(response => {
                        console.log(response.data);
                        const desc = response.data.weather[0].main;
                        summary.innerHTML = desc;

                        //get current temp
                        const temp = response.data.main.temp;

                        //convert to fahrenheit
                        const f = Math.floor((temp - 273.15) * 9 / 5 + 32);
                        temperature.innerHTML = `${f} °F`;


                        //get high and low for today
                        const high = response.data.main.temp_max;
                        const highF = Math.floor((high - 273.15) * 9 / 5 + 32);
                        const low = response.data.main.temp_min;
                        const lowF = Math.floor((low - 273.15) * 9 / 5 + 32);
                        today.innerHTML = `${lowF}/${highF} °F`;
                        let icon1;


                        //determine icon and gradients based on weather conditions
                        if (desc === "Clouds" && time < 20) {
                            icon1 = "./partlyCloudyDay.png";
                            icon.src = icon1;
                            todayIcon.src = icon1;

                            bodyContent.style.backgroundImage = 'linear-gradient(0deg, rgba(211,214,221,1) 0%, rgba(169,209,251,1) 100%)';
                        } else if (desc === "Snow") {
                            icon1 = "./snow.png";
                            icon.src = icon1;
                            todayIcon.src = icon1;
                            bodyContent.style.backgroundImage = 'linear-gradient(0deg, rgba(237,242,252,1) 0%, rgba(169,209,251,1) 100%)';

                        } else if (desc === "Fog") {
                            icon1 = "./fog.png";
                            icon.src = icon1;
                            todayIcon.src = icon1;

                            bodyContent.style.backgroundImage = 'linear-gradient(0deg, rgba(221,234,242,1) 0%, rgba(197,214,222,1) 100%)';
                        } else if (desc === "Clear" && time >= 20) {
                            icon1 = "./clearNight.png";
                            icon.src = icon1;
                            bodyContent.style.backgroundImage = 'linear-gradient(0deg, rgba(165,206,250,1) 0%, rgba(136,168,246,1) 100%)';
                        } else if (desc === "Clear" && time < 20) {
                            icon1 = "./clearDay.png";
                            icon.src = icon1;
                            todayIcon.src = icon1;

                            bodyContent.style.backgroundImage = 'linear-gradient(0deg, rgba(187,226,249,1) 0%, rgba(112,202,245,1) 100%)';
                        } else if (desc === "Clouds" && time >= 20) {
                            icon1 = "./partlyCloudyNight.png";
                            icon.src = icon1;
                            todayIcon.src = icon1;

                            bodyContent.style.backgroundImage = 'linear-gradient(0deg, rgba(169,209,251,1) 0%, rgba(180,187,204,1) 100%)';
                        } else {
                            icon1 = "./rainy.png";
                            icon.src = icon1;
                            todayIcon.src = icon1;

                            bodyContent.style.backgroundImage = 'linear-gradient(0deg, rgba(165,206,250,1) 0%, rgba(197,196,244,1) 100%)';

                        }
                        icon.style.height = '6rem';
                        todayIcon.style.height = '2rem';

                    })
                    .catch(error => {
                        //alert if errors
                        summary.innerHTML = "An error has occurred.";
                        icon.src = "";
                    })
                axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`).then(response => {
                        console.log(response.data);

                        //get high and low for future days
                        const futureDays = new Date();
                        let t = weekday[d.getDay() + 1];
                        tomorrow.innerHTML = t

                        //tomorrow data
                        const tomorrowHigh = response.data.list[4].main.temp_max;
                        const thf = Math.floor((tomorrowHigh - 273.15) * 9 / 5 + 32);
                        const tomorrowLow = response.data.list[8].main.temp_min;
                        const tlf = Math.floor((tomorrowLow - 273.15) * 9 / 5 + 32);
                        if (thf > tlf) {
                            tomorrowTemp.innerText = `${tlf}/${thf} °F`;
                        } else {
                            tomorrowTemp.innerText = `${thf}/${tlf} °F`;
                        }

                        //icon for tomorrow
                        const tomorrowDesc = response.data.list[3].weather[0].main;


                        //determine tomorrow's icon based on weather conditions
                        let icon2;
                        if (tomorrowDesc === "Clouds") {
                            icon2 = "./partlyCloudyDay.png";
                            tomorrowIcon.src = icon2;

                        } else if (tomorrowDesc === "Snow") {
                            icon2 = "./snow.png";
                            tomorrowIcon.src = icon2;

                        } else if (tomorrowDesc === "Fog") {
                            icon2 = "./fog.png";
                            tomorrowIcon.src = icon2;

                        } else if (tomorrowDesc === "Clear") {
                            icon2 = "./clearDay.png";
                            tomorrowIcon.src = icon2;
                        } else {
                            icon2 = "./rainy.png";
                            tomorrowIcon.src = icon2;
                        }

                        tomorrowIcon.style.height = '2rem';



                        //day two data
                        let t2 = weekday[d.getDay() + 2];
                        twoDays.innerHTML = t2;
                        const twoHigh = response.data.list[12].main.temp_max;
                        const twohf = Math.floor((twoHigh - 273.15) * 9 / 5 + 32);
                        const twoLow = response.data.list[16].main.temp_min;
                        const twolf = Math.floor((twoLow - 273.15) * 9 / 5 + 32);
                        if (twohf > twolf) {
                            twoTemp.innerText = `${twolf}/${twohf} °F`;
                        } else {
                            twoTemp.innerText = `${twohf}/${twolf} °F`;
                        }
                    
                         //icon for day2
                        const twoDesc = response.data.list[11].weather[0].main;


                        //determine day two's icon based on weather conditions
                        let icon3;
                        if (twoDesc === "Clouds") {
                            icon3 = "./partlyCloudyDay.png";
                            twoIcon.src = icon3;

                        } else if (twoDesc === "Snow") {
                            icon3 = "./snow.png";
                            twoIcon.src = icon3;

                        } else if (twoDesc === "Fog") {
                            icon3 = "./fog.png";
                            twoIcon.src = icon3;

                        } else if (twoDesc === "Clear") {
                            icon3 = "./clearDay.png";
                            twoIcon.src = icon3;
                        } else {
                            icon3 = "./rainy.png";
                            twoIcon.src = icon3;
                        }

                        twoIcon.style.height = '2rem';

                    

                        //day three data
                        let t3 = weekday[d.getDay() + 3];
                        threeDays.innerHTML = t3;
                        const threeHigh = response.data.list[20].main.temp_max;
                        const threehf = Math.floor((threeHigh - 273.15) * 9 / 5 + 32);
                        const threeLow = response.data.list[24].main.temp_min;
                        const threelf = Math.floor((threeLow - 273.15) * 9 / 5 + 32);
                        if (threehf > threelf) {
                            threeTemp.innerText = `${threelf}/${threehf} °F`;
                        } else {
                            threeTemp.innerText = `${threehf}/${threelf} °F`;
                        }
                    
                        //icon for day3
                        const threeDesc = response.data.list[19].weather[0].main;


                        //determine day three's icon based on weather conditions
                        let icon4;
                        if (threeDesc === "Clouds") {
                            icon4 = "./partlyCloudyDay.png";
                            threeIcon.src = icon4;

                        } else if (threeDesc === "Snow") {
                            icon4 = "./snow.png";
                            threeIcon.src = icon4;

                        } else if (threeDesc === "Fog") {
                            icon4 = "./fog.png";
                            threeIcon.src = icon4;

                        } else if (threeDesc === "Clear") {
                            icon4 = "./clearDay.png";
                            threeIcon.src = icon4;
                        } else {
                            icon4 = "./rainy.png";
                            threeIcon.src = icon4;
                        }

                        threeIcon.style.height = '2rem';



                        //day four data
                        let t4 = weekday[d.getDay() + 4];
                        fourDays.innerHTML = t4;
                        const fourHigh = response.data.list[28].main.temp_max;
                        const fourhf = Math.floor((fourHigh - 273.15) * 9 / 5 + 32);
                        const fourLow = response.data.list[30].main.temp_min;
                        const fourlf = Math.floor((fourLow - 273.15) * 9 / 5 + 32);
                        if (fourhf > fourlf) {
                            fourTemp.innerText = `${fourlf}/${fourhf} °F`;
                        } else {
                            fourTemp.innerText = `${fourhf}/${fourlf} °F`;
                        }
                    
                        //icon for day4
                        const fourDesc = response.data.list[27].weather[0].main;


                        //determine day four's icon based on weather conditions
                        let icon5;
                        if (fourDesc === "Clouds") {
                            icon5 = "./partlyCloudyDay.png";
                            fourIcon.src = icon5;

                        } else if (fourDesc === "Snow") {
                            icon5 = "./snow.png";
                            fourIcon.src = icon5;

                        } else if (fourDesc === "Fog") {
                            icon5 = "./fog.png";
                            fourIcon.src = icon5;

                        } else if (fourDesc === "Clear") {
                            icon5 = "./clearDay.png";
                            fourIcon.src = icon5;
                        } else {
                            icon5 = "./rainy.png";
                            fourIcon.src = icon5;
                        }

                        fourIcon.style.height = '2rem';
                    
                    
                    
                    })
                    .catch(error => {
                        //alert if errors
                        summary.innerHTML = "An error has occurred.";
                        icon.src = "";
                    })
            })
            .catch(error => {
                //alert if errors
                summary.innerHTML = "An error has occurred.";
                icon.src = "";
            })


    });

});
