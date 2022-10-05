const elList = document.querySelector('.js-list');
const elSelect = document.querySelector('.js-select');
const elSelec = document.querySelector('.js-selec');

function domWiew(array, node) {
	array.forEach((el) => {
		let elItem = document.createElement('li');
		let elTitle = document.createElement('h3');
		let elImg = document.createElement('img');
		let elDiv = document.createElement('div');
		let elText = document.createElement('p');
		let elTime = document.createElement('time');
		let elGender = document.createElement('p');

		elTitle.textContent = el.title;
		elDiv.classList.add('wrap');
		elText.textContent = el.overview;
		elImg.src = el.poster;
		elImg.setAttribute('width', '250');
		elImg.setAttribute('height', '350');
		elImg.setAttribute('alt', 'Films');
		elTime.textContent = year(el.release_date);
		elGender.textContent = el.genres;

		elItem.appendChild(elTitle);
		elItem.appendChild(elImg);
		elDiv.appendChild(elText);
		elItem.appendChild(elDiv);
		elItem.appendChild(elTime);
		elItem.appendChild(elGender);
		node.appendChild(elItem);
	});
}

domWiew(films, elList);

function year(format) {
	var date = new Date(format);
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

const optionList = new Set();

films.forEach((item) => {
	item.genres.forEach((gener) => {
		optionList.add(gener);
	});
});

optionList.forEach((item) => {
	var newOption = document.createElement('option');
	newOption.value = item;
	newOption.textContent = item;

	elSelect.appendChild(newOption);
});

elSelect.addEventListener('change', function (evt) {
	const filtredArr = [];
	elList.innerHTML = '';
	const elVal = elSelect.value;
	films.forEach((ev) => {
		if (ev.genres.includes(elVal)) {
			filtredArr.push(ev);
		}
	});
	domWiew(filtredArr, elList);
});

elSelec.addEventListener('change', function () {
	let newArr = [];
	elList.innerHTML = '';

	if (elSelec.value == 'Aa-Zz') {
		let Aa = films.sort((a, b) => {
			let titleA = a.title.toUpperCase().charCodeAt(0);
			let titleB = b.title.toUpperCase().charCodeAt(0);

			if (titleA < titleB) {
				return -1;
			} else if (titleA > titleB) {
				return 1;
			} else {
				return 0;
			}
		});
		newArr = Aa;
	}

	if (elSelec.value == 'Zz-Aa') {
		let Aa = films.sort((a, b) => {
			let titleA = a.title.toUpperCase().charCodeAt(0);
			let titleB = b.title.toUpperCase().charCodeAt(0);

			if (titleA > titleB) {
				return -1;
			} else if (titleA < titleB) {
				return 1;
			} else {
				return 0;
			}
		});
		newArr = Aa;
	}

	domWiew(newArr, elList);
});
