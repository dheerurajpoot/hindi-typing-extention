let currentLanguage = "english";

chrome.commands.onCommand.addListener((command) => {
	if (command === "toggle-language-ctrl") {
		toggleLanguage();
	}
});

function toggleLanguage() {
	if (currentLanguage === "english") {
		currentLanguage = "hindi";
	} else if (currentLanguage === "hindi") {
		currentLanguage = "hinglish";
	} else {
		currentLanguage = "english";
	}

	chrome.storage.sync.set({ currentLanguage });

	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.scripting.executeScript({
			target: { tabId: tabs[0].id },
			func: setLanguage,
			args: [currentLanguage],
		});
	});

	chrome.action.setPopup({ popup: "popup.html" });
}

function setLanguage(language) {
	document.body.dataset.currentLanguage = language;
	showPopup(language);
}

function showPopup(language) {
	const popup = document.createElement("div");
	popup.id = "language-popup";
	popup.innerText = `Current Language: ${language}`;
	popup.style.position = "fixed";
	popup.style.bottom = "10px";
	popup.style.right = "10px";
	popup.style.backgroundColor = "white";
	popup.style.border = "1px solid black";
	popup.style.padding = "10px";
	popup.style.zIndex = 1000;
	document.body.appendChild(popup);

	setTimeout(() => {
		popup.remove();
	}, 2000);
}
