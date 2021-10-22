class Weather {
  $form = document.querySelector("form");
  $cityName = document.querySelector(".form__input");
  $button = document.querySelector("button");

  constructor() {
    this.createRequest();
  }

  createRequest() {
    this.$button.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.$cityName.value.trim()) {
        if (this.$form.firstElementChild.className === "form__warning") {
          this.$form.firstElementChild.remove();
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.$cityName.value}&appid=4de0326522afcc173524251c3d641fec`;
        this.request(url, this.$cityName.value);
        this.$cityName.value = "";
      } else {
        this.createWarningText();
      }
    });
  }

  request(url, $cityName) {
    // 
    fetch(url, { method: "POST" })
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        if (response.message === "city not found") {
          this.renderErrorMessage($cityName);
        } else {
          this.renderWindowWeather(response);
        }
      })
      .catch((error) => {
        alert("Oops... Something went wrong. Try later");
      });
  }

  createWarningText() {
    if (this.$form.children[0].id) {
      this.$form.children[0].remove();
    }
    if (!this.$cityName.previousElementSibling) {
      const warningText = document.createElement("P");
      warningText.textContent = "*Please enter city name";
      warningText.classList.add("form__warning");
      this.$cityName.before(warningText);
    }
  }

  renderWindowWeather(data) {
    const weatherWindow = document.querySelector(".weather");
    if (weatherWindow.firstChild) {
      weatherWindow.firstChild.remove();
    }
    weatherWindow.insertAdjacentHTML(
      "afterbegin",

      `<div class = 'weather__contentWrapper'>
				<div class = 'weather__header'>
					<h1 class = 'weather__title'>${data.name}</h1>
					<div class = 'weather__tempWrapper'>
						<div class = 'weather__temp'>
							${Math.round(data.main.temp - 273)}&deg
						</div>
						<div class = 'weather__iconWrapper'>
							<img class = 'weather__icon'
								src = 'http://openweathermap.org/img/wn/${
                  data.weather[0].icon || "there is no data"
                }@2x.png'>
							</img>
							<p class = 'weather__description'>${data.weather[0].description}</p>
						</div>
					</div>
				</div>

				<div class = 'weather__main'>
					<ul class = 'weather__infoWrapper'>
						<li class = 'weather__info'>Pressure<span class = 'weather__InfoItem'>
							${(data.main.pressure * 0, 750)}mm Hg</span>
						</li>
						<li class = 'weather__info'>
							Humidity
							<span class = 'weather__infoItem'> ${data.main.humidity}%</span>
						</li>
						<li class = 'weather__info'>
							Wind speed
							<span class = 'weather__infoItem'> ${data.wind.speed}km/h</span>
						</li>
						<li class = 'weather__info'>
							Visibility
							<span class = 'weather__infoItem'> ${data.visibility / 1000}km</span>
						</li>
					</ul>
					
					<div class = 'compass'>

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
    );
    this.renderArrow(data.wind.deg);
  }

  renderArrow(data) {
    anime({
      targets: ".compass__arrow",
      rotate: data,
      duration: 7000,
      delay: 2000,
      direction: "backwards",
      loop: false,
    });
  }

  renderErrorMessage($cityName) {
    this.$cityName.insertAdjacentHTML(
      "beforebegin",
      `<p id = 'form__warning' class = 'form__warning'>
				The desired city <span id = 'errorCity' class = 'form__errorCity'>${$cityName}</span> was not found
			</p>`
    );
  }
}

new Weather();
