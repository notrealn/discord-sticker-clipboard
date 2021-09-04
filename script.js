const byId = id => document.getElementById(id);
const stickers = new Map();
stickers.set("xdxdxd", "https://media.discordapp.net/stickers/861052158991925269.png?size=128");
stickers.set("stop talking", "https://images-ext-2.discordapp.net/external/J-GAllf6no6RiG4rccAzx3sbdr8bOGcilpfvbYZefs0/%3Fsize%3D128/https/media.discordapp.net/stickers/871788601875267725.png?size=128");

for(let i = 0; i < localStorage.length; i++) {
	const name = localStorage.key(i);
	stickers.set(name, localStorage.getItem(name));
}

const table = byId("table");
const stickerButton = byId("addSticker");
stickerButton.onclick = (e) => {
	inputName = byId("inputName").value;
	inputLink = byId("inputLink").value;

	if (!inputName || !inputLink) return alert("please fill in empty values");
	if (stickers.has(inputName)) return alert("please choose different name");

	stickers.set(inputName, inputLink);
	updateTable();
	saveStickers();
};

const importButton = byId("import");
const exportButton = byId("export");
importButton.onclick = async () => {
	const text = await navigator.clipboard.readText();
	try {
		stickers = new Map(JSON.parse(clipboard));
		updateTable();
		saveStickers();
	} catch {
		alert("invalid json");
	}
};

exportButton.onclick = () => {
	const json = JSON.stringify([...stickers.entries()]);
	navigator.clipboard.writeText(json);
};

function updateTable() {
	while (table.rows.length) table.deleteRow(0);
	for (let [name, link] of stickers.entries()) {
		const row = table.insertRow(-1);
		const btn = document.createElement("button");
		
		btn.textContent = link;
		btn.className = "btn btn-sm classless";
		btn.onclick = (e) => {
			console.log(e, link);
			navigator.clipboard.writeText(link);
		};

		row.insertCell(0).textContent = name;
		row.insertCell(1).appendChild(btn);
	}
}

function saveStickers() {
	localStorage.clear();
	for (let [name, link] of stickers.entries()) {
		localStorage.setItem(name, link);
	}
}

updateTable();
