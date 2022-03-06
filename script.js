window.addEventListener('load',()=>{
    let long;
    let lat;    
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');
    let locationTimezone = document.querySelector('.location-timezone');
    let countryCode = document.getElementById("country");
    let searchBox = document.getElementById("search");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            // console.log(position)
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f21414f7c19ad41c944b081c8f19c015`;
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    // console.log(data) 
                    temperatureDegree.textContent = (data.main.temp - 273.15).toFixed(2) ;                    
                    temperatureDescription.textContent = data.weather[0].description;
                    locationTimezone.textContent = data.name;
                    countryCode.textContent=data.sys.country;
                                    
                })
        });
    }

    //using search 
    searchBox.addEventListener('keypress',(event)=>{
        if(event.keyCode == 13){
        console.log(searchBox.value)

        const apiSearch = `http://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&appid=f893fe7c43d3509eeaa099f53e4b3a9a&units=metric`;
        console.log(apiSearch)
        fetch(apiSearch)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data) 
                    temperatureDegree.textContent = data.main.temp;
                    temperatureDescription.textContent = data.weather[0].description;
                    locationTimezone.textContent = data.name;
                    countryCode.textContent=data.sys.country;
            })
        }

    })
    

})



