const TypeWriter = function (txtElement, words, wait = 3000) {
	this.txtElement = txtElement;
	this.words = words;
	this.txt = "";
	this.workIndex = 0;
	this.wait = parseInt(wait, 10);
	this.type();
	this.isDeleting = false;
};

// Type Method

TypeWriter.prototype.type = function () {
	// Current index of word

	const current = this.workIndex % this.words.length;
	// Get full text of current word

	const fullTxt = this.words[current];
	//Check if deleting
	if (this.isDeleting) {
		// Remove Char
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		// Add Char
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	//Insert txxt into element
	this.txtElement.innerHTML = `<span class="txt">${this.txt}<span/>`;

	//Initial Type Speed
	let typeSpeed = 100;

	if (this.isDeleting) {
		typeSpeed /= 2;
	}

	// if word is complete

	if (!this.isDeleting && this.txt === fullTxt) {
		// Make pause at end
		typeSpeed = this.wait;
		// Set delete to true
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === "") {
		this.isDeleting = false;
		// Move to the next word
		this.workIndex++;
		// Pause before start typing
		typeSpeed = 500;
	}

	setTimeout(() => this.type(), typeSpeed);
};

// Init on DOM Load

document.addEventListener("DOMContentLoaded", init);

//Init App
function init() {
	const txtElement = document.querySelector(".txt-type");
	const words = JSON.parse(txtElement.getAttribute("data-words"));
	const wait = txtElement.getAttribute("data-wait");

	//init TypeWriter

	new TypeWriter(txtElement, words, wait);
}

//Select DOM Items
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");

const navItems = document.querySelectorAll(".nav-item");

// Set Initial State of Menu
let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
	if (!showMenu) {
		menuBtn.classList.add("close");
		menu.classList.add("show");
		menuNav.classList.add("show");
		menuBranding.classList.add("show");
		navItems.forEach((item) => {
			item.classList.add("show");
		});
		// Set Menu State
		showMenu = true;
	} else {
		menuBtn.classList.remove("close");
		menu.classList.remove("show");
		menuNav.classList.remove("show");
		menuBranding.classList.remove("show");
		navItems.forEach((item) => {
			item.classList.remove("show");
		});
		// Set Menu State
		showMenu = false;
	}
}
