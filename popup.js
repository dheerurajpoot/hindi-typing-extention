document.addEventListener("DOMContentLoaded", () => {
	const radios = document.querySelectorAll('input[name="language"]');

	chrome.storage.sync.get("currentLanguage", ({ currentLanguage }) => {
		radios.forEach((radio) => {
			if (radio.value === currentLanguage) {
				radio.checked = true;
			}
		});
	});

	radios.forEach((radio) => {
		radio.addEventListener("change", () => {
			chrome.storage.sync.set({ currentLanguage: radio.value });
		});
	});
});
