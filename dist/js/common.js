;(function() {

	//With this I can use all arrays methods with DOM collections
	NodeList.prototype.__proto__ = Object.create(Array.prototype);

	//Closest method polyfill
	(function(ELEMENT) {
			ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
			ELEMENT.closest = ELEMENT.closest || function closest(selector) {
					if (!this) return null;
					if (this.matches(selector)) return this;
					if (!this.parentElement) {return null}
					else return this.parentElement.closest(selector)
				};
	}(Element.prototype));

	/*----
		Modals Code
	------*/
	var defaultModal = document.body.querySelector(".modal-overlay");
	var modalCloseButtons = document.body.querySelectorAll(".modal__button--close");
	var modalShowButtons = document.body.querySelectorAll(".show-default-modal");

	modalShowButtons.forEach(function(btn) {
		btn.addEventListener("click", function() {
			document.body.style.overflow = "hidden";
			defaultModal.classList.toggle("hide");
		});
	});

	modalCloseButtons.forEach(function(btn) {
		btn.addEventListener("click", function() {
			document.body.style.overflow = "";
			this.closest(".modal-overlay").classList.toggle("hide");
		});
	});
	/*----
		Modals Code END
	------*/

})();
