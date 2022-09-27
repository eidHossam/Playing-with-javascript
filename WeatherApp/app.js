const search  = document.getElementById("search");
const searchbtn = document.getElementById("submit");
const cityText = document.getElementById("city");
const stat = document.getElementById("status");
const temp = document.getElementById("temp");
const minTemp = document.getElementById("min-temp");
const maxTemp = document.getElementById("max-temp");
let city;

searchbtn.addEventListener("click" , () => {
    city = search.value || "cairo";
   
    let promise = getData(); 
    changeDOM(promise);
});

const getData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8109965e7254a469d08a746e8b210e1e&units=metric`
    const response = await fetch(url);
    if(response.ok)
    {
        const data = response.json();
        return data;
    }else{
        alert("City not found!.");
    }
};

function changeDOM(promise){
    cityText.textContent = city.toLowerCase();
    promise.then(data => {
        stat.textContent = data.weather[0].main;
        temp.textContent = `Temp: ${data.main.feels_like} ℃`;
        minTemp.textContent = `Min-Temp: ${data.main.temp_min} ℃`;
        maxTemp.textContent = `Max-Temp: ${data.main.temp_max} ℃`;
});
}