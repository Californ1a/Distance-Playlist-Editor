const rq = require("electron-require");
const handleLi = rq("./js/handleLi.js");
const saveXML = rq("./js/save.js");

const padd = (n, width, z) => {
	z = z || "0";
	n = n.toString();
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

const createLevelList = (ln) => {
	const pad = document.getElementById("pad");
	const drop = document.getElementById("drop");
	pad.innerHTML = "";
	const ul = document.createElement("ul");
	ul.classList.add("maplist");
	pad.appendChild(ul);
	drop.style.borderStyle = "none";
	drop.style.border = "1px solid white";
	drop.style.width = "300px";
	drop.style.listStyle = "none";
	drop.style.whiteSpace = "normal";
	for (let i = 0; i < ln.length; i++) {
		const li = document.createElement("li");
		li.classList.add("mapitem");
		li.draggable = true;
		li.id = `${window.jsonPlaylistData.GameObject.LevelPlaylist[0].LevelPath[i]}--${padd(i, 10)}`;
		li.innerText = ln[i];
		li.addEventListener("dragstart", handleLi.drag);
		ul.appendChild(li);
	}

	const trash = document.createElement("div");
	trash.classList.add("trash");
	trash.id = "trash";
	trash.innerText = "Delete";
	trash.addEventListener("drop", handleLi.drop);
	trash.addEventListener("dragover", handleLi.dragOver);
	document.body.appendChild(trash);

	const save = document.createElement("div");
	save.classList.add("save");

	const savebutton = document.createElement("button");
	savebutton.type = "button";
	savebutton.id = "savebutton";
	savebutton.innerText = "Save";
	savebutton.addEventListener("click", () => {
		saveXML();
	});

	save.appendChild(savebutton);
	document.body.appendChild(save);

};

module.exports = createLevelList;
