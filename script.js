const byId = (id) => document.getElementById(id);
let stickers = new Map();

stickers.set(
  "xdxdxd",
  "https://media.discordapp.net/stickers/861052158991925269.png?size=128"
);
stickers.set(
  "stop talking",
  "https://images-ext-2.discordapp.net/external/J-GAllf6no6RiG4rccAzx3sbdr8bOGcilpfvbYZefs0/%3Fsize%3D128/https/media.discordapp.net/stickers/871788601875267725.png?size=128"
);

for (let i = 0; i < localStorage.length; i++) {
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
    stickers = new Map(JSON.parse(text));
    updateTable();
    saveStickers();
  } catch (err) {
    alert(err);
  }
};

exportButton.onclick = () => {
  const json = JSON.stringify([...stickers.entries()]);
  navigator.clipboard.writeText(json);
};

function updateTable() {
  // while (table.rows.length > 1) table.deleteRow(-1);

  for (let [name, link] of stickers.entries()) {
    if (checkNameCollision(name)) continue;

    const row = table.insertRow(-1);
    row.insertCell(0).textContent = name;

    const btn = document.createElement("button");
    btn.textContent = link;
    btn.className = "btn btn-sm classless";
    btn.onclick = (e) => {
      navigator.clipboard.writeText(link);

      console.log("copied " + link);
    };

    const foo = row.insertCell(1);
    foo.appendChild(btn);
  }
}

function checkNameCollision(name) {
  return !![...table.rows].filter((row) => row.cells[0].textContent == name)
    .length;
}
function saveStickers() {
  localStorage.clear();
  for (let [name, link] of stickers.entries()) {
    localStorage.setItem(name, link);
  }
}

updateTable();
