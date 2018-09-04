const rq = require("electron-require");
// const handleLi = rq("./js/handleLi.js");
const saveXML = rq("./js/save.js");
const remote = require("electron").remote;
const Sortable = require("sortablejs");
const arrayMove = require("array-move");

const padd = (n, width, z) => {
	z = z || "0";
	n = n.toString();
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

const createLevelList = (ln) => {
	console.log(window.jsonPlaylistData);
	const pad = document.getElementById("pad");
	const drop = document.getElementById("drop");
	pad.innerHTML = "";
	const ul = document.createElement("ul");
	ul.classList.add("maplist");
	pad.appendChild(ul);
	ul.id = "playlistmaps";
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
		// li.addEventListener("dragstart", handleLi.drag);
		ul.appendChild(li);
	}
	Sortable.create(ul, {
		group: {
			name: "maps"
		},
		sort: true,
		animation: 150,
		draggable: ".mapitem",
		onUpdate: (evt) => {
			console.log("onUpdate", evt.item.id);
			arrayMove.mut(window.jsonPlaylistData.GameObject.LevelPlaylist[0].LevelName, evt.oldIndex, evt.newIndex);
			arrayMove.mut(window.jsonPlaylistData.GameObject.LevelPlaylist[0].GameMode, evt.oldIndex, evt.newIndex);
			arrayMove.mut(window.jsonPlaylistData.GameObject.LevelPlaylist[0].LevelPath, evt.oldIndex, evt.newIndex);
		}
		// ghostClass: "trash-ghost",
		// setData: (dataTransfer, dragEl) => {
		// 	console.log("Grabbed item", dragEl.id);
		// 	dataTransfer.setData("text", dragEl.id);
		// }
	});

	const trash = document.createElement("div");
	trash.classList.add("sidebar");
	trash.classList.add("trash");
	trash.id = "trash";
	trash.innerText = "Delete";
	// trash.addEventListener("drop", handleLi.drop);
	// trash.addEventListener("dragover", handleLi.dragOver);
	document.body.appendChild(trash);

	Sortable.create(trash, {
		group: {
			name: "trash",
			put: "maps"
		},
		sort: false,
		animation: 0,
		draggable: "",
		// ghostClass: "trash-ghost",
		onAdd: (evt) => {
			console.log("Dropped item (onAdd)", evt.item.id);
			// const index = Array.from(document.getElementsByClassName("mapitem")).map(m => m.id).indexOf(evt.item.id);
			const index = evt.oldIndex;
			evt.item.remove();

			// const index = document.getElementById().indexOf(data);
			window.jsonPlaylistData.GameObject.LevelPlaylist[0].LevelName.splice(index, 1);
			window.jsonPlaylistData.GameObject.LevelPlaylist[0].GameMode.splice(index, 1);
			window.jsonPlaylistData.GameObject.LevelPlaylist[0].LevelPath.splice(index, 1);
		}
	});

	const buttons = document.createElement("div");
	buttons.classList.add("sidebar");
	buttons.classList.add("buttons");

	const savebutton = document.createElement("button");
	savebutton.type = "button";
	savebutton.id = "savebutton";
	savebutton.innerText = "Save";
	savebutton.addEventListener("click", () => {
		saveXML();
	});

	const clearbutton = document.createElement("button");
	clearbutton.type = "button";
	clearbutton.id = "clearbutton";
	clearbutton.innerText = "Clear";
	clearbutton.addEventListener("click", () => {
		remote.getCurrentWebContents().reload();
	});

	buttons.appendChild(savebutton);
	buttons.appendChild(document.createElement("br"));
	buttons.appendChild(clearbutton);
	document.body.appendChild(buttons);

};

module.exports = createLevelList;
