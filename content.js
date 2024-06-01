chrome.storage.sync.get("currentLanguage", ({ currentLanguage }) => {
	document.body.dataset.currentLanguage = currentLanguage || "english";
});

document.addEventListener("keydown", (e) => {
	if ((e.ctrlKey && e.code === "Space") || (e.altKey && e.code === "Space")) {
		e.preventDefault(); // Prevent default action
		chrome.runtime.sendMessage({ action: "toggleLanguage" });
	}
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "toggleLanguage") {
		chrome.storage.sync.get("currentLanguage", ({ currentLanguage }) => {
			document.body.dataset.currentLanguage = currentLanguage;
			showPopup(currentLanguage);
		});
	}
});

document.addEventListener("input", (e) => {
	const text = e.target.value;
	if (document.body.dataset.currentLanguage === "hindi") {
		e.target.value = convertToHindi(text);
	} else if (document.body.dataset.currentLanguage === "hinglish") {
		e.target.value = convertToHinglish(text);
	}
});

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

function convertToHindi(text) {
	const transliterations = {
		a: "अ",
		b: "ब",
		c: "क",
		d: "द",
		e: "ए",
		f: "फ",
		g: "ग",
		h: "ह",
		i: "इ",
		j: "ज",
		k: "क",
		l: "ल",
		m: "म",
		n: "न",
		o: "ओ",
		p: "प",
		q: "क",
		r: "र",
		s: "स",
		t: "त",
		u: "उ",
		v: "व",
		w: "व",
		x: "क्स",
		y: "य",
		z: "ज",
		A: "आ",
		B: "भ",
		C: "च",
		D: "ड",
		E: "ए",
		F: "फ",
		G: "ग",
		H: "ह",
		I: "ई",
		J: "ज",
		K: "क",
		L: "ल",
		M: "म",
		N: "ण",
		O: "ओ",
		P: "प",
		Q: "क",
		R: "र",
		S: "श",
		T: "ट",
		U: "ऊ",
		V: "व",
		W: "व",
		X: "क्ष",
		Y: "य",
		Z: "ज़",
	};

	return text
		.split("")
		.map((char) => transliterations[char] || char)
		.join("");
}

function convertToHinglish(text) {
	const hinglishToHindi = {
		ka: "का",
		kha: "खा",
		ga: "गा",
		gha: "घा",
		cha: "चा",
		chha: "छा",
		ja: "जा",
		jha: "झा",
		ta: "टा",
		tha: "ठा",
		da: "डा",
		dha: "ढा",
		na: "ना",
		pa: "पा",
		pha: "फा",
		ba: "बा",
		bha: "भा",
		ma: "मा",
		ya: "या",
		ra: "रा",
		la: "ला",
		va: "वा",
		sha: "शा",
		sa: "सा",
		ha: "हा",
		ri: "री",
		ki: "की",
		ku: "कु",
		kri: "कृ",
		dri: "दृ",
		tri: "त्रि",
		pri: "पृ",
	};

	const patterns = Object.keys(hinglishToHindi);
	patterns.sort((a, b) => b.length - a.length);

	for (const pattern of patterns) {
		const regex = new RegExp(pattern, "g");
		text = text.replace(regex, hinglishToHindi[pattern]);
	}

	return text;
}
