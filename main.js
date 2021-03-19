class Weather {
	constructor() {
		this.createRequest();
	}
	
	createRequest() {
		const $form = document.querySelector('form')
		const $cityName = document.querySelector('.form__cityName')
		const $button = document.querySelector('button')
	
		$button.addEventListener('click', (e) => {
			e.preventDefault()

			if ($cityName.value.trim()) {

				if ($form.children.length === 3) {
					$button.nextElementSibling.remove();
					$cityName.style.boxShadow = 'inset 0 0 7px 1px #009257';
				}
				
				const url = `https://api.openweathermap.org/data/2.5/weather?q=${$cityName.value}&appid=4de0326522afcc173524251c3d641fec`;
				$cityName.value = '';
				this.request(url)

			} else if (!$button.nextElementSibling) {

				$cityName.style.boxShadow = 'inset 0 0 7px 1px red';
				const p = document.createElement('P');
				p.textContent = '*Please enter city';
				p.classList.add('form__warning');
				$button.after(p);
			}
		})
	}

	renderWindowWeather(data) {
		console.log(data);
		const weatherWindow = document.querySelector('.weather')
		if (weatherWindow.firstChild) {
			weatherWindow.firstChild.remove();
		}

		weatherWindow.insertAdjacentHTML('afterbegin',
			
			`<div class = 'weather__contentWrapper'>
				<div class = 'weather__header'>
					<h2 class = 'weather__title'>${data.name}</h2>
					<div class = 'weather__tempWrapper'>
						<div class = 'weather__temp'>
							${Math.round(data.main.temp - 273)}&deg
						</div>
						<div class = 'weather__iconWrapper'>
							<img class = 'weather__icon'
								src = 'http://openweathermap.org/img/wn/${data.weather[0].icon ||
									'there is no data'}@2x.png'>
							</img>
							<p class = 'weather__description'>${data.weather[0].description}</p>
						</div>
					</div>
				</div>
				<div class = 'weather__main'>
					<p class = 'weather__info'>Pressure ${data.main.pressure * 0,750} mm Hg </p>
					<p class = 'weather__info'>Humidity ${data.main.humidity}% </p>
					<p class = 'weather__info'>Wind speed ${data.wind.speed} km/h </p>
					<p class = 'weather__info'>Visibility ${data.visibility / 1000} km </p>
				</div>
					
				<div class = 'weather__compassWrapper'>
					<div class ='weather__arrowWrapper'>
					<svg class = 'weather__arrow' viewBox="0 0 180 85">
						<polygon
							points="98.263,0.056 180,41.85 98.263,83.641 70.662,83.641 122.438,51.866 0,51.866 0,31.611 122.213,31.611 70.605,0 58.263,0.056" />
					</svg>
					</div>
					<ul class = 'weather__compassBackground'>
						<li class = 'weather__north'>N</li>
						<li class = 'weather__south'>S</li>
						<li class = 'weather__west'>W</li>
						<li class = 'weather__east'>E</li>
					</ul>
				</div>	
				
			</div>`
		)
	}
	
	request(url) {
		
		 fetch(url, {method:'POST'})
			.then(function (response){
				return response.json()
			})
			.then(response => {
				this.renderWindowWeather(response);
			})
			.catch(error => {
				console.log(error.message)
			});
	}
}

new Weather();