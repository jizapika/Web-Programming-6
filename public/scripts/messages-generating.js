let randomUserAPI = 'https://randomuser.me/api/'
let randomMessageAPI = 'https://jsonplaceholder.typicode.com/comments/'

function generateDialogBlock(name, pictureURL, message) {
	document.getElementById("messages").innerHTML +=
		`
		<div class="messages__message message-block">
			<div class="message-block__avatar">
				<img src="${pictureURL}" alt="">
			</div>
			<div class="message-block__content message-content">
				<div class="message-content__name">
					${name}
				</div>
				<div class="message-content__message">
					${message}
				</div>
			 </div>
		</div>
		`
}

function randomGeneratorURL(maxValue) {
	return `https://www.randomnumberapi.com/api/v1.0/random?min=1&max=${length}&count=1`
}

document.getElementById("messages").innerHTML += `<link rel="stylesheet" href="../styles/messageDialogs.css">`
document.getElementById("default-picture").innerHTML = `
<img src="../images/laba6/default-picture.bmp">
`
for (let i = 0; i < 5; i++) {
	fetch(randomUserAPI)
		.then(response => response.json())
		.then(json => json.results[0])
		.then(result => {
			let firstName = result.name.first;
			let lastName = result.name.last;
			let pictureURL = result.picture.medium;
			fetch(randomGeneratorURL(100))
				.then(response => response.json())
				.then(array => array[0])
				.then(number => number + i * 100)
				.then(number => randomMessageAPI + number)
				.then(url => {
					fetch(url)
						.then(responseMessage => responseMessage.json())
						.then(json => json.body)
						.then(message => {
							generateDialogBlock(firstName + ' ' + lastName, pictureURL, message)
							if (i == 4) document.getElementById("default-picture").innerHTML = "";
						})
				})
		})
}