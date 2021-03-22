class Weather {
	$form = document.querySelector('form')
	$cityName = document.querySelector('.form__cityName')
	$button = document.querySelector('button')
	constructor() {
		this.createRequest();
	}
	
	createRequest() {
		this.$button.addEventListener('click', (e) => {
			e.preventDefault()

			if (this.$cityName.value.trim()) {
		
				if (this.$form.children.length === 3) {
					this.$form.children[0].remove();
				}
				
				const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.$cityName.value}&appid=4de0326522afcc173524251c3d641fec`;
				this.request(url, this.$cityName.value)
				this.$cityName.value = '';

			} else {
				this.createWarningText()
			}
		})
	}

	createWarningText() {
		if (this.$form.children[0].id) {
			this.$form.children[0].remove()
		}
		if (!this.$cityName.previousElementSibling) {
			const warningText = document.createElement('P');
			warningText.textContent = '*Please enter city name';
			warningText.classList.add('form__warning');
			this.$cityName.before(warningText);
		}
	}

	renderWindowWeather(data) {
		
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
					<div class = 'weather__infoWrapper'
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
					
				</div>
			</div>`
		)
		this.renderArrow(data.wind.deg)
	}

	renderArrow(data) {
		const arrow = document.querySelector(".weather__arrow")
		arrow.animate([
			{ transform: 'rotateZ(0)' },
			{ transform: `rotateZ(${data}deg)`}
		  ],{
			delay:1000,
			duration:2000,
			iterations: 1,
			fill:'forwards',
		  })
	}
	
	request(url, $cityName) {
		
		 fetch(url, {method:'POST'})
			.then(function (response){
				return response.json()
			})
			.then(response => {
				this.renderWindowWeather(response);
			})
			 .catch(error => {
				 console.log(error);
				this.renderErrorMessage($cityName)
			});
	}

	renderErrorMessage($cityName) {
		this.$cityName.insertAdjacentHTML('beforebegin',
			`<p id = 'form__warning' class = 'form__warning'>
				The desired city <span id = 'errorCity' class = 'form__errorCity'>${$cityName}</span> was not found
			</p>`
		)
	}
}

new Weather();