//jquery like syntax
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//DOM manipulation
//Adding data into html
const display = (output, url, tech) => {
	output = JSON.parse(JSON.stringify(output));
	content = '';
	if (typeof output == 'object') {
		for (const key in output) {
			content += `
	        <div class='stack'><span class="key">${key}</span>:<span class="value">${output[key]}</span>
	        </div>`;
		}
	} else {
		content = `<div class="stack">${output}</div>`;
	}

	$('#data').innerHTML = content;
	$('.link').innerText = `Source : ${url}`;
	$('.link').classList.remove('invisble');
	$('#method').innerText = tech;
};

//text with xhr
const displayText = () => {
	tech = 'xhr';
	url = 'dataset/sample.txt';
	fetch(url).then((response) => response.text()).then((data) => display(data, url, tech));
};

//json with ajax
const displayJson = () => {
	tech = 'jQuery ajax';
	url = 'dataset/sample.json';
	fetch(url).then((response) => response.json()).then((json) => display(json, url, tech));
};

//url call with fetch API
const displayUrl = () => {
	tech = 'fetch API';
	url = 'https://jsonplaceholder.typicode.com/todos/1';
	fetch(url).then((response) => response.json()).then((json) => display(json, url, tech));
};

//UX
function fade(btn) {
	btns = $$('.btns');

	for (const butn of Array.from(btns)) {
		butn.classList.remove('fadein');
		butn.classList.add('fadeout');
	}
	btn.classList.add('fadein');
	btn.classList.remove('fadeout');
}

textBtn = $('#textBtn');
jsonBtn = $('#jsonBtn');
urlBtn = $('#urlBtn');

textBtn.addEventListener('click', (e) => {
	displayText();
	fade(e.target);
});
jsonBtn.addEventListener('click', (e) => {
	displayJson();
	fade(e.target);
});
urlBtn.addEventListener('click', (e) => {
	displayUrl();
	fade(e.target);
});
