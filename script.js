let stickers = [
  {
    name: "xdxdxd",
    link: "https://media.discordapp.net/stickers/861052158991925269.png?size=128",
  },
  {
    name: "stop talking",
    link: "https://images-ext-2.discordapp.net/external/J-GAllf6no6RiG4rccAzx3sbdr8bOGcilpfvbYZefs0/%3Fsize%3D128/https/media.discordapp.net/stickers/871788601875267725.png?size=128",
  },
];

savedCookies = getCookies();
if (savedCookies) stickers = savedCookies;

const table = document.querySelector("#table");

const button = document.querySelector("#addSticker");
button.onclick = (e) => {
  inputName = document.querySelector("#inputName").value;
  inputLink = document.querySelector("#inputLink").value;

  console.log(inputName, inputLink);
  if (!inputName || !inputLink) return alert("please fill in empty values");
  if (stickers.filter((sticker) => sticker.name == inputName).length)
    return alert("please choose different name");

  stickers.push({
    name: inputName,
    link: inputLink,
  });

  updateTable();
  setCookies();
};

updateTable();

function updateTable() {
  // while (table.rows.length > 1) table.deleteRow(-1);

  for (const sticker of stickers) {
    if (checkTableNameCollision(sticker.name)) continue;

    const row = table.insertRow(-1);
    row.insertCell(0).textContent = sticker.name;

    const btn = document.createElement("button");
    const link = sticker.link;
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

function checkTableNameCollision(name) {
  return !![...table.rows].filter((row) => row.cells[0].textContent == name)
    .length;
}

function getCookies() {
  const cookies = document.cookie.split(";").map((item) => item.trim());

  for (const cookie of cookies) {
    if (cookie.startsWith("stickers=")) return JSON.parse(cookie.slice(9));
  }
}

function setCookies() {
  document.cookie = "stickers=" + JSON.stringify(stickers);
}
