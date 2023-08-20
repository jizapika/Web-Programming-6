const formAC = document.getElementById('add column');
const formRC = document.getElementById('remove column');
const formAR = document.getElementById('add row');
const formRR = document.getElementById('remove row');
const result = document.querySelector('.result');

formAC.addEventListener('click', () => {
	m++;
	showTable(result, m, n)
})

formAR.addEventListener('click', () => {
	n++;
	showTable(result, m, n)
})

formRC.addEventListener('click', () => {
	if (m <= 2) alert('Ты не можешь этого сделать, подумай о детях.')
	else m--;
	showTable(result, m, n)
})

formRR.addEventListener('click', () => {
	if (n <= 2) alert('Ты не можешь этого сделать, подумай о детяхъ.')
	else n--;
	showTable(result, m, n);
})

let m = localStorage.getItem('m');
let n = localStorage.getItem('n');
if (m == undefined) m = 5;
if (n == undefined) n = 5;
showTable(result, m, n);


function showTable(result, m, n) {
	result.innerHTML = generateTable(m, n);
	localStorage.setItem('m', m);
	localStorage.setItem('n', n);
}

function generateTable (m, n) {
	let borderProperty = "border: 1px solid #000;";
	let cyanColorProperty = "background: cyan;";
	let whiteColorProperty = "background: white;";
	let paddingProperty = "padding: 2px;";
	let textProperty = "text-align: center;vertical-align: middle;";
	let code = `<table style="${borderProperty}${cyanColorProperty}">`
	code += '<tr>'
	code += `<th style="${whiteColorProperty}${paddingProperty}${textProperty}">X</th>`
	for (let j = 2; j <= m; j++) {
		code += `<th style="${whiteColorProperty}${paddingProperty}${textProperty}">${j}</th>`
	}
	code += '</tr>'
	for (let i = 2; i <= n; i++) {
		code += '<tr>'
		code += `<th style="${whiteColorProperty}${paddingProperty}${textProperty}">${i}</th>`
		for (let j = 2; j <= m; j++) {
			code += `<td style="${whiteColorProperty}${paddingProperty}${textProperty}">${i * j}</td>`
		}
		code += '</tr>'
	}
	code += '</table>'

	return code;
}