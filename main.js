//jquery like syntax
// const document.querySelector = document.querySelector.bind(document);
// const document.querySelectordocument.querySelector = document.querySelectorAll.bind(document);
fetch('dataset/code.txt').then((res) => res.text()).then((data) => {
	main(data);
});

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
//DOM manipulation
//Adding data into html
const main = (code) => {
	const display = async (output, url, tech, idx) => {
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

		document.querySelector('#data').innerHTML = content;
		document.querySelector('.link').innerText = `Source : ${url}`;
		document.querySelector('#up').classList.remove('invisible');
		document.querySelector('#method').innerText = tech;
		text = code.split('---')[idx];
		out = '';
		for (const ch of text) {
			out += ch;
			await sleep(5);
			document.querySelector('#code').innerText = out;
		}
	};

	//text with xhr
	const displayText = () => {
		tech = 'xhr';
		url = 'dataset/sample.txt';
		var req = new XMLHttpRequest();
		req.open('GET', url, false);
		req.send(null);
		data = req.responseText;
		display(data, url, tech, 0);
		// fetch(url).then((response) => response.text()).then((data) => display(data, url, tech));
	};

	//json with ajax
	const displayJson = () => {
		tech = 'jQuery ajax';
		url = 'dataset/sample.json';
		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'json', // added data type
			success: function(data) {
				display(data, url, tech, 1);
			}
		});
		// fetch(url).then((response) => response.json()).then((json) => display(json, url, tech));
	};

	//url call with fetch API
	const displayUrl = () => {
		tech = 'fetch API';
		url = 'https://jsonplaceholder.typicode.com/todos/1';
		fetch(url).then((response) => response.json()).then((json) => display(json, url, tech, 2));
	};

	//UX
	function fade(btn) {
		btns = document.querySelectorAll('.btns');

		for (const butn of Array.from(btns)) {
			butn.classList.remove('fadein');
			butn.classList.add('fadeout');
		}
		btn.classList.add('fadein');
		btn.classList.remove('fadeout');
	}

	textBtn = document.querySelector('#textBtn');
	jsonBtn = document.querySelector('#jsonBtn');
	urlBtn = document.querySelector('#urlBtn');

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
};
