const elList = document.querySelector('.js-list');
const elSaveList = document.querySelector('.save-list');
const elSelect = document.querySelector('.js-select');
const elSelec = document.querySelector('.js-selec');
const elBtn = document.querySelector('.js-btn');
const elModal = document.querySelector('.modal');

const itemFragment = document.createDocumentFragment();

let localFilms = JSON.parse(localStorage.getItem('savedFilms'));

const saveList = localFilms || [];
var theme = false;

function domWiew(array, node) {
	array.forEach((el) => {
		let elItem = document.createElement('li');
		let elTitle = document.createElement('h3');
		let elImg = document.createElement('img');
		// let elDiv = document.createElement('div');
		// let elText = document.createElement('p');
		// let elTime = document.createElement('time');
		// let elGender = document.createElement('p');
		let elBtnsWrapper = document.createElement('div');
		let elBookmarkBtn = document.createElement('button');
		let elModalBtn = document.createElement('button');

		elTitle.textContent = el.title;
		// elDiv.classList.add('wrap');
		// elText.textContent = el.overview;
		elBtnsWrapper.setAttribute('class', 'btns-wrapper');
		elBookmarkBtn.textContent = 'Save';
		elBookmarkBtn.setAttribute('class', 'save-btn');
		elBookmarkBtn.dataset.filmId = el.id;
		elModalBtn.textContent = 'Info';
		elModalBtn.setAttribute('class', 'info-btn');
		elImg.src = el.poster;
		elImg.setAttribute('width', '250');
		elImg.setAttribute('height', '350');
		elImg.setAttribute('alt', 'Films');
		// elTime.textContent = year(el.release_date);
		// elGender.textContent = el.genres;

		elItem.appendChild(elTitle);
		elItem.appendChild(elBtnsWrapper);
		elBtnsWrapper.appendChild(elBookmarkBtn);
		elBtnsWrapper.appendChild(elModalBtn);
		elItem.appendChild(elImg);
		// elDiv.appendChild(elText);
		// elItem.appendChild(elDiv);
		// elItem.appendChild(elTime);
		// elItem.appendChild(elGender);
		itemFragment.appendChild(elItem);
	});
	node.appendChild(itemFragment)
}

domWiew(films, elList);

const renderSave = (array, node) => {
	localStorage.setItem('savedFilms', JSON.stringify(array));
	node.innerHTML = '';
	array.forEach((el) => {
		const newItem = document.createElement('li');
		const newBtn = document.createElement('button');

		newItem.textContent = el.title;
		newBtn.textContent = 'X';

		newBtn.setAttribute('class', 'btn-delete');
		newBtn.dataset.filmId = el.id;

		newItem.appendChild(newBtn);
		node.appendChild(newItem);
	});
};

renderSave(saveList, elSaveList);

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

elBtn.addEventListener('click', function () {
	theme = !theme;
	window.localStorage.setItem('theme', theme ? 'dark' : 'light');
	changeThem();
});

function changeThem() {
	if (window.localStorage.getItem('theme') == 'dark') {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
}
changeThem();

elList.addEventListener('click', (evt) => {
	if (evt.target.matches('.save-btn')) {
		const clickedId = evt.target.dataset.filmId;

		const findedItem = films.find((el) => el.id == clickedId);

		if (!saveList.includes(findedItem)) {
			saveList.push(findedItem);
		}
		renderSave(saveList, elSaveList);
	}
});

elSaveList.addEventListener('click', (evt) => {
	if (evt.target.matches('.btn-delete')) {
		const deletedItemId = evt.target.dataset.filmId;

		const deletedItem = saveList.findIndex((el) => el.id == deletedItemId);

		saveList.splice(deletedItem, 1);
		renderSave(saveList, elSaveList);
	}
	if (evt.target.matches('.info-btn')) {
	}
});
