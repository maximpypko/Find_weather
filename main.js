class Weather {
	$form = document.querySelector('form');
	$cityName = document.querySelector('.form__cityName');
	$button = document.querySelector('button');
	constructor() {
		this.createRequest();
	}
	
	createRequest() {
		this.$button.addEventListener('click', (e) => {
			e.preventDefault();

			if (this.$cityName.value.trim()) {
		
				if (this.$form.children.length === 3) {
					this.$form.children[0].remove();
				}
				
				const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.$cityName.value}&appid=4de0326522afcc173524251c3d641fec`;
				this.request(url, this.$cityName.value)
				this.$cityName.value = '';

			} else {
				this.createWarningText();
			}
		})
	}

	request(url, $cityName) {
		fetch(url, {method:'POST'})
		   .then(function (response){
			   return response.json();
		   })
		   .then(response => {
			   this.renderWindowWeather(response);
		   })
			.catch(error => {
				console.log(error);
				// обработать ошибку
				this.renderErrorMessage($cityName);
		   });
   }

	createWarningText() {
		if (this.$form.children[0].id) {
			this.$form.children[0].remove();
		}
		if (!this.$cityName.previousElementSibling) {
			const warningText = document.createElement('P');
			warningText.textContent = '*Please enter city name';
			warningText.classList.add('form__warning');
			this.$cityName.before(warningText);
		}
	}

	renderWindowWeather(data) {
		const weatherWindow = document.querySelector('.weather__container');
		if (weatherWindow.firstChild) {
			weatherWindow.firstChild.remove();
		}
		weatherWindow.insertAdjacentHTML('afterbegin',
			
			`<div class = 'weather__contentWrapper'>
				<div class = 'weather__header'>
					<h1 class = 'weather__title'>${data.name}</h1>
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
						<p class = 'weather__info'>
							Pressure ${data.main.pressure * 0, 750} mm Hg
						</p>
						<p class = 'weather__info'>
							Humidity ${data.main.humidity}%
						</p>
						<p class = 'weather__info'>
							Wind speed ${data.wind.speed} km/h
						</p>
						<p class = 'weather__info'>
							Visibility ${data.visibility / 1000} km
						</p>
					</div>
					
					<div class = 'weather__compass'>

						<div class = 'compass__wrapper'>
							<h4 class = 'compass__title'>Direction of the wind</h4>
							<div class ='compass__arrowWrapper'>
								<svg class = 'compass__arrow' viewBox="0 0 180 85">
									<polygon
										points="98.263,0.056 180,41.85 98.263,83.641 70.662,83.641 122.438,51.866 0,51.866 0,31.611 122.213,31.611 70.605,0 58.263,0.056" />
								</svg>
							</div>
						</div>

						<ul class = 'compass__background'>
							<li class = 'compass__north'>N</li>
							<li class = 'compass__south'>S</li>
							<li class = 'compass__west'>W</li>
							<li class = 'compass__east'>E</li>
						</ul>

					</div>
					
				</div>
			</div>`
		)
		this.renderArrow(data.wind.deg);
	}

	renderArrow(data) {
		anime({
			targets: '.compass__arrow',
			rotate: data,
			duration: 10000,
			delay: 1500,
			direction: 'backwards',
			loop: false
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