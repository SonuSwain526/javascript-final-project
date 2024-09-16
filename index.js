let input1 = document.querySelector("#input1");
let input = document.querySelector(".input")
let address = document.querySelector(".place");
let curr_time = document.querySelector(".date-time");
let eventt = document.querySelector(".event");
let icon = document.querySelector(".icon");
let cur_temp = document.querySelector(".temprature");
let min_temp = document.querySelector(".min");
let max_temp = document.querySelector(".max");
let fellis_like = document.querySelector(".fellos-like");
let pressure = document.querySelector(".pressure");
let windd = document.querySelector(".wind");
let humidity = document.querySelector(".gumidity");


let city = "Bhubaneswar";
input1.addEventListener("submit", (e) => {
    e.preventDefault();
    
    city = input.value;
    main1();
    input.value = "";
    
});

const main1 = async () => {
    const APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1dc452ca9903b638774cae182156d290`;

    const countryName = (code) => {
        return new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
    }

    const proper_date = (dt) => {

        let date = new Date(dt);
        let option = {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
        }
        console.log((new Intl.DateTimeFormat('en-US', option)).format(date));

        return (new Intl.DateTimeFormat('en-US', option)).format(date);
    }


    try {
        const apiFetch = fetch(APIurl);
        const data = await (await apiFetch).json();
        console.log(data);

        const { name, sys, dt, main, weather, wind } = data;
        console.log(name);

        address.textContent = `${name} , ${countryName(sys.country)}`;

        console.log(dt);
        curr_time.textContent = proper_date(dt * 1000);

        eventt.textContent = weather[0].main;
        console.log(weather[0].icon);
        
        icon.innerHTML = `<img src ="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png"/>`

        cur_temp.innerHTML = `${main.temp}&#176;`;
        min_temp.innerHTML = `Min: ${(main.temp_min).toFixed()}&#176`;
        max_temp.innerHTML = `Max: ${(main.temp_max).toFixed()}&#176;`;

        fellis_like.innerHTML = `${main.feels_like}&#176`;
        pressure.innerHTML = `${main.pressure} hPa`;
        humidity.innerHTML = `${main.humidity} %`;
        console.log(wind.deg);
        
        windd.innerHTML = `${wind.speed} m/s`;
    } catch (error) {
        console.log(error);
        // input.style.borderColor = "red";
        address.textContent = "please choose a correct city name";
        
        // input.value = ""; 
        
    }
}

main1();

// address.textContent = input.textContent;

