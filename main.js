class Weather {

	// name = '';
	// temp = 0;
	// pressure = 0;
	// humidity = 0;
	// description = '';
	// icon = '';
	// windDeg = 0;
	// windSpeed = 0;

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
				
				const url = `http://api.openweathermap.org/data/2.5/weather?q=${$cityName.value}&appid=4de0326522afcc173524251c3d641fec`;
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

	 createWindowWeather(data) {
		// console.log(data);
	}
	
	request(url) {
		
		 fetch(url)
			.then(function (response){
				return response.json()
			})
			.then(response => {
				this.createWindowWeather(response);
			})
			.catch(error => {
				console.log(error.message)
			});
	
	}

	
}

new Weather();