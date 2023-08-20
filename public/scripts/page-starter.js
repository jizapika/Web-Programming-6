stopwatch = (function() {
	let creationDate = Date.now()
	return function time() {
		let currentDate = Date.now()
		return currentDate - creationDate
	}
})()