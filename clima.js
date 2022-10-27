//variaveis e seleções de elementos
const apiKey = 'f7a7b88d89328e738a66e60dca78a1ac';
const apiCountryFlag = 'https://countryflagsapi.com/png/';

const cityInput = document.querySelector('#city-input') //recebe o input
const searchBtn = document.querySelector('#search') //recebe o botão de pesquisa

const cityElement = document.querySelector('#city') // recebe cidade
const tempElement = document.querySelector('#temperature span') // recebe temperatura
const descElement = document.querySelector('#description') // recebe descrição
const iconElement = document.querySelector('#weather-icon') // recebe icone do clima
const countryElement = document.querySelector('#country') // recebe país
const umidityElement = document.querySelector('#umidity span') // recebe umidade
const windElement = document.querySelector('#wind span') // recebe vento

const weatherContainer = document.querySelector('#weather-data')

//funções
const getWeatherData = async(city) =>{ //faz uma requisição na api através de uma função assincrona passando cidade e chave da api
	
	const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

	const res = await fetch(apiWeatherUrl)
	const data = await res.json()

	return data
}

const showWeatherData = async(city) => {
	const data = await getWeatherData(city)
	console.log(data)
	cityElement.innerHTML = data.name
	tempElement.innerHTML = parseInt(data.main.temp) 
 	descElement.innerHTML = data.weather[0].description
 	iconElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
 	countryElement.setAttribute('src', `https://countryflagsapi.com/png/${data.sys.country}`)
 	umidityElement.innerHTML = `${data.main.humidity}%`
 	windElement.innerHTML = `${data.wind.speed}km/h`

 	weatherContainer.classList.remove('hide')

}

//eventos
searchBtn.addEventListener('click', (e) => {
	e.preventDefault()

	const city = cityInput.value //city recebe o valor digitado no input da cidade
	showWeatherData(city)
} )

cityInput.addEventListener("keyup", (e)=>{
	if(e.code === "Enter"){
		const city = e.target.value

		showWeatherData(city)
	}
})