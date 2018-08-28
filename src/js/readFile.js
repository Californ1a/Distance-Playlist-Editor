const rq = require("electron-require");
const parseString = rq("xml2js").parseString;
const createLevelList = rq("./js/createLevelList.js");

const manageFile = (file) => {
	const reg = /^.+(\.xml)$/;
	if (file.type !== "text/xml" || !reg.test(file.name)) {
		return console.log("Wrong file type");
	}
	const drop = document.getElementById("drop");
	const dropClone = drop.cloneNode(true);
	drop.parentNode.replaceChild(dropClone, drop);
	dropClone.style.cursor = "default";
	const reader = new FileReader();
	reader.readAsText(file);
	reader.onloadend = () => {
		parseString(reader.result, (err, result) => {
			if (err) {
				return console.error(err);
			}
			window.jsonPlaylistData = result;
			console.log("json", window.jsonPlaylistData);
			const ln = window.jsonPlaylistData.GameObject.LevelPlaylist[0].LevelName;
			// const gm = result.GameObject.LevelPlaylist[0].GameMode;
			// const lp = result.GameObject.LevelPlaylist[0].LevelPath;
			createLevelList(ln);
		});
	};
};

module.exports = manageFile;
