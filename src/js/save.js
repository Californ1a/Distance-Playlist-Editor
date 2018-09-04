const xmlbuilder = require("xmlbuilder");
const path = require("path");
const fs = require("fs");
const rq = require("electron-require");
const dialog = rq.electron("dialog");

const saveXML = () => {
	const data = window.jsonPlaylistData;
	dialog.showSaveDialog({
		defaultPath: data.GameObject.LevelPlaylist[0].PlaylistName[0],
		filters: [{
			name: "Playlist",
			extensions: ["xml"]
		}]
	}, (filename) => {
		if (filename) {
			const root = xmlbuilder.create("GameObject");
			root.att("Name", "LevelPlaylist");
			root.att("GUID", data.GameObject["$"].GUID);
			const trans = data.GameObject.Transform[0]["$"];
			root.ele("Transform", {
				Version: trans.Version,
				GUID: trans.GUID
			});
			const reslp = data.GameObject.LevelPlaylist[0];
			const lp = root.ele("LevelPlaylist", {
				Version: reslp["$"].Version,
				GUID: reslp["$"].GUID
			});
			lp.ele("PlaylistName", path.basename(filename).slice(0, -4));
			lp.ele("NumberOfLevelsInPlaylist", reslp.LevelName.length);
			lp.ele("ModeAndLevelInfoVersion", reslp.ModeAndLevelInfoVersion[0]);
			for (let i = 0; i < reslp.LevelName.length; i++) {
				lp.ele("GameMode", reslp.GameMode[i]);
				lp.ele("LevelName", reslp.LevelName[i]);
				lp.ele("LevelPath", reslp.LevelPath[i]);
			}
			root.end({
				pretty: true
			});
			fs.writeFile(filename, root, (err) => {
				if (err) {
					return console.error(err);
				}
				console.log(`Saved ${filename}`);
			});
		}
		console.log("Cancelled Save");
	});
};

module.exports = saveXML;
