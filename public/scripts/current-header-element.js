const url = new URL(document.location)
let path = url.pathname
let filename = path.split('/').pop()
let headername = filename.split('.')[0]
document.getElementsByClassName('user-' + headername + '__text')[0].style =
	'text-shadow: 2px 2px 3px rgba(0,0,0,0.5); text-decoration-line: underline; font-style: italic;'


document.addEventListener("DOMContentLoaded", () => {
	const navigationLinks = document.querySelectorAll('.left-header__elem');
})

/*
.left-header_current-elem {
	text-shadow: 2px 2px 3px rgba(0,0,0,0.5);
	text-decoration-line: underline;
	font-style: italic;
}
*/