const hero = document.querySelector(".hero");
const slider = document.querySelector(".slider");
const logo = document.querySelector("#logo");
const burger = document.querySelector(".burger");
const headline = document.querySelector(".headline");


const tl = new TimelineMax();

tl.fromTo(hero, 1, {height: "0%"}, {height: "80%"})
	.fromTo(hero, 1.5, {width: "100%"}, {width: "80%"})
	.fromTo(slider, 1.5, {x: "-100%"}, {x: "0%"}, "-=1.5")
	.fromTo(logo, 0.5, {opacity: 0, x: 30}, {opacity: 1, x: 0}, "-=0.5")
	.fromTo(burger, 0.5, {opacity: 0, x: 30}, {opacity: 1, x: 0}, "-=0.5")
	.fromTo(headline, 0.5, {opacity: 0, transform: "translate(-10%, -70%)"}, {opacity: 1, transform: "translate(-20%, -70%)"}, "-=0.5");