const key_weather = 'ff1787af82696604a3ed73b8da1a2490';
const weather_endpoint = 'https://api.openweathermap.org/data/2.5/weather';
const geoloc_endpoint = 'http://api.openweathermap.org/geo/1.0/direct';
let request;
let latitudine;
let longitudine;
const key_s = '6e7fe6993d4447b2ad2874759bd932c9';
const s_endpoint = 'https://api.opencagedata.com/geocode/v1/json';
const library  =document.querySelector('#album-view');

function search(event)
{
  
  event.preventDefault();
 
  const input = document.querySelector('#content');
  const text_value = encodeURIComponent(input.value);

  request = geoloc_endpoint + '?q=' +  text_value + '&limit=' + 1 + '&appid=' +  key_weather;
  fetch(request).then(onResponse_geoLoc).then(onJson_geoLoc);
}
function onResponse_geoLoc(response){
    return response.json();
  }
  function onJson_geoLoc(json){
    console.log('JSON ricevuto');
    console.log(json);
    longitudine = json[0].lon;
    latitudine = json[0].lat;
    console.log(latitudine);
    console.log(longitudine);
    request = weather_endpoint + '?lat=' + latitudine + '&lon=' + longitudine + '&appid=' + key_weather + '&units=metric';
    fetch(request).then(onResponse_w).then(onJson_w);
  }
function onResponse_w(response){
    return response.json();
}
function onJson_w(json){
    console.log('JSON ricevuto');
    console.log(json);
    
    library.innerHTML = '';
    let weather_icon = json.weather[0].icon; 
    const img = document.createElement('img');
    const book = document.createElement('div');
    const info = document.createElement('p');
    info.textContent = 'Temperatura: ' + json.main.temp;
    book.classList.add('container');
    img.src = 'https://openweathermap.org/img/wn/'+ weather_icon + '@2x.png'
    book.appendChild(img);
    book.appendChild(info);
    library.appendChild(book);
    const request_s = s_endpoint + '?q=' + latitudine +','+longitudine +'&key=' + key_s + '&pretty=1';
    fetch(request_s).then(onSResponse).then(onJson_s);
}
function onSResponse(response){
    return response.json();
}
function onJson_s(json){
  console.log('JSON ricevuto');
  console.log(json);
    const book = document.createElement('div');
    const info = document.createElement('button');
    info.classList.add("link");
    info.innerHTML = "Mappa 2D / 3D";
    addEventListener("click", function(){
      window.location.href = json.results[0].annotations.OSM.url;
      this.removeEventListener("click",function(){});
   });

    book.classList.add('container');
    book.appendChild(info);
    library.appendChild(book);
}

  const form = document.querySelector('form');
  form.addEventListener('submit', search);

(5/4 * (1+(3*s/2)))/(s*(1+s/2)*(1+s/8)*(1+(3*s/32)))