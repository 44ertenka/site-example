// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Amount input~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const slider = document.getElementById('slider')
const progressBar = document.getElementById('progressBar')
const sliderValue = document.getElementById('rangeValue')
const amountValue = document.querySelector('.amount-hidden')

const slider2 = document.getElementById('slider2')
const progressBar2 = document.getElementById('progressBar2')
const sliderValue2 = document.getElementById('rangeValue2')
const amountValue2 = document.querySelector('.amount-hidden2')

// slider.oninput = function() {
//    progressBar.style.width = this.value + '%'
// }
slider.addEventListener('input', ()=> {
   progressBar.style.width = slider.value + '%'
})

sliderValue.innerHTML = "below 5,000"
slider.addEventListener('input', ()=> {
   if(slider.value == 1){
      sliderValue.innerHTML = "below 5,000"
      amountValue.value = "below 5,000"
   }else if(slider.value == 34){
      sliderValue.innerHTML = "5,000 - 20,000"
      amountValue.value = "5,000 - 20,000"
   }else if(slider.value == 67){
      sliderValue.innerHTML = "20,000 - 50,000"
      amountValue.value = "20,000 - 50,000"
   }else if(slider.value == 100){
      sliderValue.innerHTML = "over 50,000"
      amountValue.value = "over 50,000"
   }
})

// slider2.oninput = function() {
//    progressBar2.style.width = this.value + '%'
// }
slider2.addEventListener('input', ()=> {
   progressBar2.style.width = slider2.value + '%'
})

sliderValue2.innerHTML = "below 5,000"
slider2.addEventListener('input', ()=> {
   if(slider2.value == 1){
      sliderValue2.innerHTML = "below 5,000"
      amountValue2.value = "below 5,000"
   }else if(slider2.value == 34){
      sliderValue2.innerHTML = "5,000 - 20,000"
      amountValue2.value = "5,000 - 20,000"
   }else if(slider2.value == 67){
      sliderValue2.innerHTML = "20,000 - 50,000"
      amountValue2.value = "20,000 - 50,000"
   }else if(slider2.value == 100){
      sliderValue2.innerHTML = "over 50,000"
      amountValue2.value = "over 50,000"
   }
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Side menu~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const sideBtn = document.querySelector('.header-side-btn')
const sideMenu = document.querySelector('.header')

sideBtn.addEventListener('click', ()=> {
   sideBtn.classList.toggle('close')
   sideMenu.classList.toggle('open')
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Side menu animation~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const sideMenuBg = document.querySelector('.header-bg-img-bg')
const btnAction = document.querySelectorAll('.anim-action')
for(let i = 0; i < btnAction.length; i++){
   btnAction[i].addEventListener('click', ()=> {
      sideMenuBg.classList.add('side-anim')
      setTimeout(function() {
         sideMenuBg.classList.remove('side-anim')
      }, 2000);
      sideBtn.classList.toggle('close')
      sideMenu.classList.toggle('open')
   })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Block animation~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


function onEntry(entry) {
entry.forEach(change => {
   if (change.isIntersecting) {
      change.target.classList.add('block-show');
   }
});
}
let options = { threshold: [0.1] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.block-animation');
for (let elm of elements) {
observer.observe(elm);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Form validator ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

window.onload = function () {
   function getParameterByName(name) {
      let name1 = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      let results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
   }
   let source = getParameterByName('utm_source');
   let medium = getParameterByName('utm_medium');
   let campaign = getParameterByName('utm_campaign');
   let term = getParameterByName('utm_term');
   let content = getParameterByName('utm_content');
   let url = window.location.href.toString()


   let utmSource = document.getElementById("utm_source").value = source;
   let utmMedium = document.getElementById("utm_medium").value = medium;
   let utmCampaign = document.getElementById("utm_campaign").value = campaign;
   let utmTerm = document.getElementById("utm_term").value = term;
   let utmContent = document.getElementById("utm_content").value = content;
   let url1 = document.getElementById("url").value = url;
   let utmSource2 = document.getElementById("utm_source2").value = source;
   let utmMedium2 = document.getElementById("utm_medium2").value = medium;
   let utmCampaign2 = document.getElementById("utm_campaign2").value = campaign;
   let utmTerm2 = document.getElementById("utm_term2").value = term;
   let utmContent2 = document.getElementById("utm_content2").value = content;
   let url12 = document.getElementById("url2").value = url;
}


const formWrapper = document.querySelector('.header-form-wrapper')
// ~~~~~~~~~~~~~~~~~~~~~ Phone field  ~~~~~~~~~~~~~~~~~~~~~~~~~~

var countryData = window.intlTelInputGlobals.getCountryData(),
  inputPhone = formWrapper.querySelector("#phone"),
  addressDropdown = formWrapper.querySelector("#address-country");
  ip = formWrapper.querySelector(".ip");

// intlTelInput(inputPhone, {
// });

// init plugin
var iti = window.intlTelInput(inputPhone, {
  initialCountry: "auto",
  separateDialCode: true,
  autoPlaceholder: "aggressive",
  nationalMode:false,
  geoIpLookup: function(success, failure) {
    $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
      var countryCode = (resp && resp.country) ? resp.country : "auto";
		addressDropdown.value = countryCode
      success(countryCode);
    });
  },
  preferredCountries: ['au','be', 'ca', 'dk', 'fi', 'hk', 'ie', 'nl', 'nz', 'no', 'sg', 'se', 'ae', 'us'],
  utilsScript: "https://intl-tel-input.com/node_modules/intl-tel-input/build/js/utils.js?1549804213570" // just for formatting/placeholders etc
});
$.getJSON('https://api.ipify.org?format=json', function(data){
   ip.value = data.ip;
});
// populate the country dropdown
for (var i = 0; i < countryData.length; i++) {
  var country = countryData[i];
  var optionNode = document.createElement("option");
  optionNode.value = country.iso2;
  var textNode = document.createTextNode(country.name);
  optionNode.appendChild(textNode);
  addressDropdown.appendChild(optionNode);
}
// set it's initial value
addressDropdown.value = iti.getSelectedCountryData().iso2;

// listen to the telephone input for changes
inputPhone.addEventListener('countrychange', function(e) {
  addressDropdown.value = iti.getSelectedCountryData().iso2;
});
// listen to the address dropdown for changes
addressDropdown.addEventListener('change', function() {
  iti.setCountry(this.value);
});
	
	
inputPhone.addEventListener('input', ()=> {
	var number = iti.getNumber(intlTelInputUtils.numberFormat.E164);
	hidden= formWrapper.querySelector("#hidden");
	hidden.value = iti.getNumber()
	
	var validInput = iti.isValidNumber();
	let fullPhoneValue = hidden.value
	if(validInput === false){
		addInputError(inputPhone)
	}else if(validInput === true){
		removeInputError(inputPhone)
	}
});




const form = document.querySelector('.custom-form')
// const url = form.querySelector('input[name="url"]')
const formBtn = document.querySelector('.form__btn')

function addInputError(input) {
	input.classList.add('error-input')
}
function removeInputError(input) {
	input.classList.remove('error-input')
}
function checkEmailPattern(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
}
function formValidaty(form) {
	let error = 0
	const inputsReq = document.querySelectorAll('.req-input')
	inputsReq.forEach(input => {
		removeInputError(input)
		if (input.classList.contains('input-pattern')) {
			if (checkEmailPattern(input)) {
				addInputError(input)
				error++
			}
         else if (inputPhone) {
            
            var valid = iti.isValidNumber();

            if(!valid){
               addInputError(inputPhone)
               error++
            }else{}
         } 
		} else {
			if (input.value === '') {
				addInputError(input)
				error++
			}
		}
	})

	return error
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Form data sending ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function formSubmit() {
	let error = formValidaty(form)
	if (error === 0) {
		const formData = new FormData(form)
		const thanksUrl = "./thanks.html"
		fetch("#", {
			method: 'POST',
			body: formData,
		})
			.then(response => {
				window.location.href = thanksUrl
				// form.classList.add('hideForm')
				// formWrapper.innerHTML = '<span class="thanks-message">Thank you!</span>'
			})
	} else {
		console.log('error')
	}
}
// formBtn.addEventListener('click', formSubmit)

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Form antispam ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const stopSpam = document.querySelector('input[name="stop-spam"]')
formBtn.addEventListener('click', (event) => {
   event.preventDefault()
   stopSpam.value = 'NoSpam'
   formSubmit()
})


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Form validator 2 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const formWrapper2 = document.querySelector('.footer-form-wrapper')
	
// ~~~~~~~~~~~~~~~~~~~~~ Phone field  ~~~~~~~~~~~~~~~~~~~~~~~~~~

var countryData2 = window.intlTelInputGlobals.getCountryData(),
  inputPhone2 = formWrapper2.querySelector("#phone2"),
  addressDropdown2 = formWrapper2.querySelector("#address-country2");
  ip2 = formWrapper2.querySelector(".ip2");

// intlTelInput(inputPhone2, {
// });

// init plugin
var iti2 = window.intlTelInput(inputPhone2, {
  initialCountry: "auto",
		  nationalMode:false,
		  separateDialCode: true,
  initialCountry: "auto",
  autoPlaceholder: "aggressive",
  nationalMode:false,
  geoIpLookup: function(success, failure) {
    $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
      var countryCode2 = (resp && resp.country) ? resp.country : "us";
		addressDropdown2.value = countryCode2
      success(countryCode2);
    });
  },
  preferredCountries: ['au','be', 'ca', 'dk', 'fi', 'hk', 'ie', 'nl', 'nz', 'no', 'sg', 'se', 'ae', 'us'],
  utilsScript: "https://intl-tel-input.com/node_modules/intl-tel-input/build/js/utils.js?1549804213570" // just for formatting/placeholders etc
});
$.getJSON('https://api.ipify.org?format=json', function(data){
   ip2.value = data.ip;
});
// populate the country dropdown
for (var i = 0; i < countryData2.length; i++) {
  var country2 = countryData2[i];
  var optionNode2 = document.createElement("option");
  optionNode2.value = country2.iso2;
  var textNode2 = document.createTextNode(country2.name);
  optionNode2.appendChild(textNode2);
  addressDropdown2.appendChild(optionNode2);
}
// set it's initial value
addressDropdown2.value = iti2.getSelectedCountryData().iso2;

// listen to the telephone input for changes
inputPhone2.addEventListener('countrychange', function(e) {
  addressDropdown2.value = iti2.getSelectedCountryData().iso2;
});
// listen to the address dropdown for changes
addressDropdown2.addEventListener('change', function() {
  iti2.setCountry(this.value);
});
	
	inputPhone2.addEventListener('input', ()=> {
	var number2 = iti2.getNumber(intlTelInputUtils.numberFormat.E164);
	hidden2 = formWrapper2.querySelector("#hidden2");
	hidden2.value = iti2.getNumber()
	
	var validInput2 = iti2.isValidNumber();
	let fullPhoneValue2 = hidden2.value
	if(validInput2 === false){
		addInputError(inputPhone2)
	}else if(validInput2 === true){
		removeInputError(inputPhone2)
	}
});
	


const form2 = document.querySelector('.custom-form2')
// const url = form.querySelector('input[name="url"]')
const formBtn2 = document.querySelector('.form__btn2')

function addInputError(input2) {
	input2.classList.add('error-input')
}
function removeInputError(input2) {
	input2.classList.remove('error-input')
}
function checkEmailPattern(input2) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input2.value)
}
function formValidaty2(form2) {
	let error = 0
	const inputsReq2 = document.querySelectorAll('.req-input2')
	inputsReq2.forEach(input2 => {
		removeInputError(input2)
		if (input2.classList.contains('input-pattern2')) {
			if (checkEmailPattern(input2)) {
				addInputError(input2)
				error++
			}
         else if (inputPhone2) {
         
            var valid2 = iti2.isValidNumber();

            if(!valid2){
               addInputError(inputPhone2)
               error++
            }else{}
         } 
		} else {
			if (input2.value === '') {
				addInputError(input2)
				error++
			}
		}
	})

	return error
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Form data sending 2 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function formSubmit2(event) {
	let error = formValidaty2(form2)
	if (error === 0) {
		const formData2 = new FormData(form2)
		const thanksUrl2 = "./thanks.html"
		fetch("#", {
			method: 'POST',
			body: formData2,
		})
			.then(response => {
				window.location.href = thanksUrl2
				// form.classList.add('hideForm')
				// formWrapper.innerHTML = '<span class="thanks-message">Thank you!</span>'
			})
	} else {
		console.log('error')
	}
}
formBtn2.addEventListener('click', formSubmit)

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Form antispam 2 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// const stopSpam2 = document.querySelector('input[name="stop-spam2"]')
// formBtn2.addEventListener('click', (event) => {
//    event.preventDefault()
//    stopSpam2.value = 'NoSpam'
//    formSubmit2()
// })