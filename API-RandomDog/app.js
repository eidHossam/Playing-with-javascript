//https://dog.ceo/api/breeds/image/random
let image = document.getElementById('dog');
let button = document.getElementById("new");
var bark = new Audio("bark.wav")
var snd = new Audio("hover.wav");
button.addEventListener("mouseover", () => {
    snd.play();
    snd.loop = true;
    
});
button.addEventListener("mouseout", () => {
    snd.loop = false;
});

button.addEventListener('click', () => {
    
    snd.pause();
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(json => image.setAttribute("src", json.message))
    bark.play();
    bark.currentTime =0;
    snd.currentTime = 0;
});
