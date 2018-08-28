const rq = require("electron-require");
const handleFile = rq("./js/handleFile.js");

window.onload = () => {
	window.jsonPlaylistData = null;
	const drop = document.getElementById("drop");
	drop.addEventListener("dragover", handleFile.dragOver);
	drop.addEventListener("drop", handleFile.drop);
	drop.addEventListener("click", handleFile.click);
};
