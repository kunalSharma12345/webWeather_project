const submitBtn = document.getElementById('submitBtn');
const cityName  = document.getElementById('cityName');

const city_name = document.getElementById('city_name');

const temp = document.getElementById('temp');
const tempstatus = document.getElementById('tempstatus');

const data_hide = document.querySelector('.middle_layer');

const day = document.getElementById("day");
const today_date =document.getElementById('today_date');


// function declaration..
const getInfo = async (event) => {
    // form wants to get back to default positon 
       event.preventDefault(); 

    // reads the input value from user and store it to cityVal..
       let cityVal = cityName.value; 

    if(cityVal === "") {

        city_name.innerText = `Plz write the name before search`;
        data_hide.classList.add('data_hide'); // add data_hide class to div..
    }
    else {
        
                try{

                    let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=a612978f2478edee3a4c8597ff1a119f`;
                    const response  = await fetch(url);
                    const data = await response.json();
                    console.log(data); //returns data in object form on console..

                    // now converting object form data to the array form..
                    const arrData = [data];

                    city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
                    temp.innerText = `${arrData[0].main.temp} °C`;
                    // tempstatus.innerText = arrData[0].weather[0].main;

                    // condition to check Sunny or Rainy,Cloudy etc..
                    const tempMood = `${arrData[0].weather[0].main}`;
                    console.log(tempMood);
                    if(tempMood=="Sunny"){
                        tempstatus.innerHTML ="<i class='fas fa-sun' style='color: #eccc68;'></i>";
                    }
                    else if(tempMood=="Clear"){
                        tempstatus.innerHTML  = "<i class='far fa-cloud-sun' style='color: #f1c40f;'></i>";
                    }
                    else if(tempMood=="Clouds"){
                        tempstatus.innerHTML  = "<i class='fas fa-cloud' style='color: #009ad8;'></i>";
                    }
                    else if(tempMood=="Rainy"){
                        tempstatus.innerHTML  =  "<i class='fas fa-cloud-rain' style='color: #009ad8;'></i>";
                    }
                    else{
                        tempstatus.innerHTML  = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
                    }

                    data_hide.classList.remove('data_hide'); // remove data_hide class to div..

                }catch{
                    city_name.innerText = `Plz enter the city name properly`;  
                    data_hide.classList.add('data_hide'); // add data_hide class to div..
                }
    }
}

// day name functions
const getCurrentDay =()=>{
    let currentTime = new Date();
    var weekday = ["Sun","Mon","Tues","Wed","Thu","Fri","Sat"];

    let days = weekday[currentTime.getDay()];
    day.innerText = days;
}
getCurrentDay();


// for date and months
const getCurrentTime = ()=>{

    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    var now = new Date();
    var month = now.getMonth()+1;
    var date = now.getDate();

    return ` ${date} | ${months[month-1]} `;
}
today_date.innerHTML= getCurrentTime();

submitBtn.addEventListener('click', getInfo);

